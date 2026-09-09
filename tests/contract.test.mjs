import test from "node:test";
import assert from "node:assert/strict";
import { getStubFicha, postStubFicha } from "../lib/caja/stub.ts";

const payload = {
  telefono: { crudo: "+51 987 654 321", pais: "PE" },
  nombre: "Rosa Quispe",
  correo: "rosa@example.com",
  cumple: { dia: 14, mes: 3 },
  boleta: { requiere: true, tipo: "DNI", numero: "12345678", razonSocial: null },
  salud: {
    embarazo: false,
    presion: true,
    cirugiaReciente: false,
    alergias: "",
    zonasEvitar: "",
    notas: "",
  },
  consentimientos: { datos: true, salud: true, promociones: false },
  codigoCupon: null,
  idioma: "es",
};

test("contrato GET compatible con caja PR #10", () => {
  const resultado = getStubFicha("stub-nuevo");
  assert.equal(resultado.ok, true);
  const data = resultado.data;
  assert.deepEqual(Object.keys(data).sort(), [
    "canal", "cita", "cliente", "contratoVersion", "estado", "idioma", "pago", "politicaCancelacionUrl", "requiere", "token",
  ]);
  assert.deepEqual(Object.keys(data.cita).sort(), [
    "domicilio", "duracionTotalMin", "fecha", "hora", "personas", "sede", "sedeDireccion", "sedeMapsUrl", "servicios", "tipoAtencion",
  ]);
  assert.deepEqual(Object.keys(data.requiere).sort(), [
    "codigoCupon", "confirmacionManual", "correoObligatorio", "documentoParaBoleta", "motivoConfirmacion",
  ]);
  assert.equal(data.contratoVersion, "ficha-cita-v1");
  assert.equal(data.requiere.confirmacionManual, false);
  assert.deepEqual(data.cliente, { conocido: false, nombre: null, emailEnmascarado: null });
});

test("contrato POST y respuesta compatible con caja PR #10", () => {
  assert.deepEqual(Object.keys(payload).sort(), [
    "boleta", "codigoCupon", "consentimientos", "correo", "cumple", "idioma", "nombre", "salud", "telefono",
  ]);
  assert.deepEqual(Object.keys(payload.salud).sort(), [
    "alergias", "cirugiaReciente", "embarazo", "notas", "presion", "zonasEvitar",
  ]);
  const resultado = postStubFicha("stub-nuevo", payload);
  assert.equal(resultado.ok, true);
  assert.deepEqual(Object.keys(resultado.data).sort(), ["icsUrl", "ok", "resumen", "whatsappUrl"]);
  assert.deepEqual(Object.keys(resultado.data.resumen).sort(), [
    "adelantoRecibido", "domicilio", "duracionTotalMin", "fecha", "hora", "moneda", "personas", "saldo", "sede", "sedeDireccion", "sedeMapsUrl", "servicios", "tipoAtencion",
  ]);
});

test("contrato del cupón mantiene el bloque opcional y exige código", () => {
  const resultado = getStubFicha("stub-cupon");
  assert.equal(resultado.ok, true);
  assert.equal(resultado.data.requiere.codigoCupon, true);
  assert.equal(typeof resultado.data.cupon.vigenteHasta, "string");
});

test("contrato GET de domicilio conserva confirmación manual requerida por caja PR #10 c5186de", () => {
  const resultado = getStubFicha("stub-domicilio");
  assert.equal(resultado.ok, true);
  assert.equal(resultado.data.requiere.confirmacionManual, true);
  assert.equal(resultado.data.requiere.motivoConfirmacion, "domicilio");
  assert.equal(resultado.data.cita.tipoAtencion, "domicilio");
  assert.equal(resultado.data.cita.sedeMapsUrl, null);
});
