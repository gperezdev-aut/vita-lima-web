import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { identificarStubFicha } from "../lib/caja/stub.ts";
import { validarFichaRecurrente } from "../lib/caja/validation.ts";
import { consentimientoSaludParaPayload, consentimientoSaludValido, tieneDatosSalud } from "../lib/ficha/health.ts";

const telefono = { crudo: "987654321", pais: "PE" };
const saludVacia = {
  embarazo: false, presion: false, cirugiaReciente: false,
  alergias: "", zonasEvitar: "", notas: "",
};

test("valida estrictamente ficha-recurrente-v1 en runtime", () => {
  const resultado = identificarStubFicha("stub-recurrente-salud", telefono);
  assert.equal(resultado.ok, true);
  assert.equal(validarFichaRecurrente(resultado.data).ok, true);
  const invalido = structuredClone(resultado.data);
  invalido.contratoVersion = "ficha-recurrente-v2";
  assert.equal(validarFichaRecurrente(invalido).ok, false);
});

test("identificación válida devuelve perfil solo después del flujo privado", () => {
  const resultado = identificarStubFicha("stub-recurrente-salud", telefono);
  assert.equal(resultado.ok, true);
  assert.equal(resultado.data.clienteRecurrente, true);
  assert.equal(resultado.data.cliente.nombre, "Rosa Quispe");
  assert.equal(resultado.data.cliente.correo, "rosa@example.com");
});

test("identificación inválida y rate limit no filtran datos", () => {
  const invalida = identificarStubFicha("stub-identificar-invalido", telefono);
  const limitada = identificarStubFicha("stub-identificar-rate", telefono);
  assert.deepEqual(invalida, { ok: false, status: 403, error: { error: "identificacion_no_valida" } });
  assert.deepEqual(limitada, { ok: false, status: 429, error: { error: "rate_limited" } });
  assert.doesNotMatch(JSON.stringify(invalida), /Rosa|@|DNI|RUC|Látex/i);
});

test("recurrente conserva salud, correo y cumpleaños para revisión", () => {
  const resultado = identificarStubFicha("stub-recurrente-salud", telefono);
  assert.equal(resultado.ok, true);
  assert.deepEqual(resultado.data.cliente.cumple, { dia: 14, mes: 3 });
  assert.equal(resultado.data.saludAnterior.presion, true);
  assert.equal(resultado.data.saludAnterior.alergias, "Látex");
  assert.equal(resultado.data.cliente.promociones.requiereNuevaAceptacion, true);
});

test("recurrente sin condiciones no requiere consentimiento de salud", () => {
  const resultado = identificarStubFicha("stub-recurrente-sin-condiciones", telefono);
  assert.equal(resultado.ok, true);
  assert.equal(resultado.data.saludAnterior.sinCondicionesDeclaradas, true);
  assert.equal(tieneDatosSalud(saludVacia), false);
  assert.equal(consentimientoSaludParaPayload(saludVacia, true), false);
});

test("comprobante anterior se ofrece sin solicitarlo automáticamente", () => {
  const resultado = identificarStubFicha("stub-recurrente-comprobante", telefono);
  assert.equal(resultado.ok, true);
  assert.equal(resultado.data.comprobanteAnterior.solicitarEnNuevaCita, false);
  assert.equal(resultado.data.comprobanteAnterior.tipoDocumento, "RUC");
});

test("observación nueva conserva condiciones anteriores y exige consentimiento", () => {
  const resultado = identificarStubFicha("stub-recurrente-salud", telefono);
  assert.equal(resultado.ok, true);
  const saludNueva = {
    embarazo: resultado.data.saludAnterior.embarazo,
    presion: resultado.data.saludAnterior.presion,
    cirugiaReciente: resultado.data.saludAnterior.cirugiaReciente,
    alergias: resultado.data.saludAnterior.alergias ?? "",
    zonasEvitar: resultado.data.saludAnterior.zonasEvitar ?? "",
    notas: [resultado.data.saludAnterior.notas, "Evitar presión fuerte"].filter(Boolean).join("\n"),
  };
  assert.equal(saludNueva.presion, true);
  assert.match(saludNueva.notas, /Control médico.*Evitar presión fuerte/s);
  assert.equal(consentimientoSaludValido(saludNueva, false), false);
  assert.equal(consentimientoSaludValido(saludNueva, true), true);
});

test("cliente sin historial recibe el flujo completo sin pregunta rápida", () => {
  const resultado = identificarStubFicha("stub-sin-historial", telefono);
  assert.equal(resultado.ok, true);
  assert.equal(resultado.data.clienteRecurrente, false);
  assert.equal(resultado.data.saludAnterior, null);
});

test("wizard contiene las rutas rápida y de actualización sin saludo previo", async () => {
  const wizard = await readFile(new URL("../app/cita/[token]/FichaWizard.tsx", import.meta.url), "utf8");
  assert.match(wizard, /setFlujo\(respuesta\.data\.clienteRecurrente \? "decision" : "completa"\)/);
  assert.match(wizard, /setFlujo\("rapida"\)/);
  assert.match(wizard, /setFlujo\("completa"\); setPaso\(1\)/);
  assert.doesNotMatch(wizard, /holaConocido\(/);
  assert.match(wizard, /observacionNueva/);
});

test("datos sensibles y perfil recuperado no entran al borrador local", async () => {
  const [draft, wizard] = await Promise.all([
    readFile(new URL("../lib/ficha/draft.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/cita/[token]/FichaWizard.tsx", import.meta.url), "utf8"),
  ]);
  const tipo = /export type FichaDraft = \{([\s\S]*?)\n\};/.exec(draft)?.[1] ?? "";
  for (const campo of ["telefonoCrudo", "nombre", "correo", "cumpleDia", "boletaNumero", "boletaRazonSocial", "salud", "DNI", "RUC"]) {
    assert.doesNotMatch(tipo, new RegExp(`\\b${campo}\\b`));
  }
  assert.match(wizard, /useState<"identificar" \| "decision" \| "rapida" \| "completa">\("identificar"\)/);
  const guardado = /guardarBorrador\(token, \{([\s\S]*?)\n    \}\);/.exec(wizard)?.[1] ?? "";
  for (const campo of ["telefonoCrudo", "nombre", "correo", "cumpleDia", "boletaNumero", "boletaRazonSocial", "salud"]) {
    assert.doesNotMatch(guardado, new RegExp(`\\b${campo}\\b`));
  }
});

test("cliente Caja permanece solo server-side y usa endpoint identificar con no-store", async () => {
  const [client, action] = await Promise.all([
    readFile(new URL("../lib/caja/client.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/cita/[token]/actions.ts", import.meta.url), "utf8"),
  ]);
  assert.match(client, /import "server-only"/);
  assert.match(client, /\/api\/publico\/ficha\/\$\{encodeURIComponent\(token\)\}\/identificar/);
  assert.match(client, /"X-Caja-Secret"/);
  assert.match(client, /cache: "no-store"/);
  assert.match(action, /"use server"/);
  assert.doesNotMatch([client, action].join("\n"), /NEXT_PUBLIC_CAJA/);
});
