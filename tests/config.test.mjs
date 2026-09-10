import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolveCajaConfig } from "../lib/caja/config.ts";

test("configuración ausente en producción devuelve error explícito", () => {
  assert.deepEqual(resolveCajaConfig({ NODE_ENV: "production" }), {
    mode: "error",
    missing: ["CAJA_API_URL", "CAJA_API_SECRET"],
  });
});

test("el stub está prohibido en producción aunque se active", () => {
  assert.equal(resolveCajaConfig({ NODE_ENV: "production", CAJA_API_STUB_ENABLED: "true" }).mode, "error");
});

test("el stub requiere activación explícita en desarrollo o pruebas", () => {
  assert.equal(resolveCajaConfig({ NODE_ENV: "development" }).mode, "error");
  assert.equal(resolveCajaConfig({ NODE_ENV: "development", CAJA_API_STUB_ENABLED: "true" }).mode, "stub");
  assert.equal(resolveCajaConfig({ NODE_ENV: "test", CAJA_API_STUB_ENABLED: "true" }).mode, "stub");
  assert.equal(resolveCajaConfig({ NODE_ENV: "staging", CAJA_API_STUB_ENABLED: "true" }).mode, "error");
});

test("la API real exige URL y secreto y normaliza la barra final", () => {
  assert.deepEqual(
    resolveCajaConfig({ NODE_ENV: "production", CAJA_API_URL: "https://caja.example/", CAJA_API_SECRET: "server-secret" }),
    { mode: "api", apiUrl: "https://caja.example", secret: "server-secret" },
  );
});

test("el bypass de Vercel es opcional y se lee solo desde el cliente server-side", async () => {
  assert.deepEqual(
    resolveCajaConfig({ NODE_ENV: "production", CAJA_API_URL: "https://caja.example", CAJA_API_SECRET: "caja-secret" }),
    { mode: "api", apiUrl: "https://caja.example", secret: "caja-secret" },
  );
  const client = await readFile(new URL("../lib/caja/client.ts", import.meta.url), "utf8");
  assert.match(client, /process\.env\.CAJA_VERCEL_PROTECTION_BYPASS\?\.trim\(\) \|\| undefined/);
  assert.match(client, /\.\.\.\(protectionBypass \? \{ "x-vercel-protection-bypass": protectionBypass \} : \{\}\)/);
});

test("los secretos de Caja, incluido el bypass, permanecen en el módulo server-side", async () => {
  const [client, wizard] = await Promise.all([
    readFile(new URL("../lib/caja/client.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/cita/[token]/FichaWizard.tsx", import.meta.url), "utf8"),
  ]);
  const sources = await Promise.all([
    readFile(new URL("../lib/caja/config.ts", import.meta.url), "utf8"),
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
  ]);
  assert.match(client, /import "server-only"/);
  assert.match(client, /"X-Caja-Secret"/);
  assert.match(client, /"x-vercel-protection-bypass"/);
  assert.match(client, /\.\.\.\(protectionBypass \? \{ "x-vercel-protection-bypass": protectionBypass \} : \{\}\)/);
  assert.match(client, /cajaHeaders\(config\.secret, protectionBypass\(\)\)/);
  assert.equal(client.match(/cajaHeaders\(config\.secret, protectionBypass\(\)\)/g)?.length, 3);
  assert.doesNotMatch([client, ...sources].join("\n"), /NEXT_PUBLIC_CAJA|NEXT_PUBLIC.*BYPASS/);
  assert.doesNotMatch([client, ...sources].join("\n"), /[?&]x-vercel-protection-bypass=/);
  assert.doesNotMatch(wizard, /CAJA_VERCEL_PROTECTION_BYPASS|x-vercel-protection-bypass/);
});

test("GET, POST e identificación fuerzan no-store y la página impide indexación", async () => {
  const [client, page, nextConfig] = await Promise.all([
    readFile(new URL("../lib/caja/client.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/cita/[token]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
  ]);
  assert.equal(client.match(/cache: "no-store"/g)?.length, 3);
  assert.match(page, /robots: \{ index: false, follow: false \}/);
  assert.match(page, /fetchCache = "force-no-store"/);
  assert.match(nextConfig, /source: "\/cita\/:path\*"/);
  assert.match(nextConfig, /noindex, nofollow, noarchive/);
});
