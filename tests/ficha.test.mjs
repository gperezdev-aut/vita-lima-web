import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { consentimientoSaludParaPayload, consentimientoSaludValido, tieneDatosSalud } from "../lib/ficha/health.ts";
import { getStubFicha, postStubFicha } from "../lib/caja/stub.ts";

const saludVacia = {
  embarazo: false,
  presion: false,
  cirugiaReciente: false,
  alergias: "",
  zonasEvitar: "",
  notas: "",
};

const payloadBase = {
  telefono: { crudo: "987654321", pais: "PE" },
  nombre: "Rosa Quispe",
  correo: null,
  cumple: null,
  boleta: { requiere: false, tipo: null, numero: null, razonSocial: null },
  salud: saludVacia,
  consentimientos: { datos: true, salud: false, promociones: false },
  codigoCupon: null,
  idioma: "es",
};

test("token inexistente, vencido y completado conservan códigos y estados", () => {
  assert.deepEqual(getStubFicha("no-existe"), { ok: false, status: 404, error: { error: "token_no_existe" } });
  assert.deepEqual(getStubFicha("stub-vencido"), { ok: false, status: 410, error: { error: "token_vencido" } });
  assert.deepEqual(getStubFicha("stub-completa"), { ok: false, status: 410, error: { error: "ficha_ya_completa" } });
});

test("Ninguna de las anteriores envía consentimiento de salud false", () => {
  assert.equal(tieneDatosSalud(saludVacia), false);
  assert.equal(consentimientoSaludValido(saludVacia, false), true);
  assert.equal(consentimientoSaludParaPayload(saludVacia, true), false);
});

test("una condición de salud exige consentimiento", () => {
  const salud = { ...saludVacia, presion: true };
  assert.equal(tieneDatosSalud(salud), true);
  assert.equal(consentimientoSaludValido(salud, true), true);
  assert.equal(consentimientoSaludValido(salud, false), false);
  assert.equal(postStubFicha("stub-nuevo", { ...payloadBase, salud }).status, 422);
});

test("texto sensible también exige consentimiento y permite enviarlo al aceptarlo", () => {
  const salud = { ...saludVacia, notas: "Lesión reciente" };
  assert.equal(postStubFicha("stub-nuevo", { ...payloadBase, salud }).status, 422);
  const respuesta = postStubFicha("stub-nuevo", {
    ...payloadBase,
    salud,
    consentimientos: { ...payloadBase.consentimientos, salud: true },
  });
  assert.equal(respuesta.ok, true);
});

test("el enlace ICS de la respuesta se usa directamente sin adjuntar el secreto", async () => {
  const finalScreen = await readFile(new URL("../app/cita/[token]/PantallaFinal.tsx", import.meta.url), "utf8");
  assert.match(finalScreen, /href=\{resultado\.icsUrl\}/);
  assert.doesNotMatch(finalScreen, /X-Caja-Secret/);
});
