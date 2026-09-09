import test from "node:test";
import assert from "node:assert/strict";
import { getStubFicha, postStubFicha } from "../lib/caja/stub.ts";
import { errorContratoIncompatible, validarFichaGet, validarFichaPost } from "../lib/caja/validation.ts";
import { duracionVisible, puedeMostrarMapaSede, ubicacionVisible } from "../lib/ficha/resumen.ts";
import { textoCabeceraPendiente, textoFinalPendiente } from "../lib/ficha/text.ts";
import { codigoCuponParaPayload, comprobanteValido } from "../lib/ficha/comprobante.ts";

function fichaValida() {
  const resultado = getStubFicha("stub-nuevo");
  assert.equal(resultado.ok, true);
  return structuredClone(resultado.data);
}

function payloadValido() {
  return {
    telefono: { crudo: "987654321", pais: "PE" }, nombre: "Rosa", correo: null, cumple: null,
    boleta: { requiere: false, tipo: null, numero: null, razonSocial: null },
    salud: { embarazo: false, presion: false, cirugiaReciente: false, alergias: "", zonasEvitar: "", notas: "" },
    consentimientos: { datos: true, salud: false, promociones: false }, codigoCupon: null, idioma: "es",
  };
}

test("valida el contrato GET ficha-cita-v1 real", () => {
  const validado = validarFichaGet(fichaValida());
  assert.equal(validado.ok, true);
});

test("rechaza versión ausente o desconocida y JSON GET malformado", () => {
  const sinVersion = fichaValida();
  delete sinVersion.contratoVersion;
  assert.equal(validarFichaGet(sinVersion).ok, false);
  const versionDesconocida = fichaValida();
  versionDesconocida.contratoVersion = "ficha-cita-v2";
  assert.equal(validarFichaGet(versionDesconocida).ok, false);
  assert.equal(validarFichaGet({ contratoVersion: "ficha-cita-v1", cita: {} }).ok, false);
});

test("una respuesta incompatible produce el error controlado esperado", () => {
  assert.deepEqual(errorContratoIncompatible("campo crítico ausente"), {
    error: "contrato_incompatible",
    mensaje: "campo crítico ausente",
  });
});

test("valida el resumen POST y rechaza JSON POST malformado", () => {
  const respuesta = postStubFicha("stub-nuevo", payloadValido());
  assert.equal(respuesta.ok, true);
  assert.equal(validarFichaPost(respuesta.data).ok, true);
  assert.equal(validarFichaPost({ ok: true, icsUrl: "https://example.com/cita.ics", resumen: {} }).ok, false);
});

test("la duración final es la duración total de Caja, no la suma de servicios", () => {
  const sesenta = fichaValida().cita;
  sesenta.personas = 2;
  sesenta.servicios = [{ nombre: "A", duracionMin: 60 }, { nombre: "B", duracionMin: 60 }];
  sesenta.duracionTotalMin = 60;
  assert.equal(duracionVisible(sesenta), 60);
  const cientoVeinte = structuredClone(sesenta);
  cientoVeinte.servicios = [{ nombre: "A", duracionMin: 60 }, { nombre: "B", duracionMin: 120 }];
  cientoVeinte.duracionTotalMin = 120;
  assert.equal(duracionVisible(cientoVeinte), 120);
});

test("domicilio muestra su dirección y nunca un Maps de sede", () => {
  const resultado = getStubFicha("stub-domicilio");
  assert.equal(resultado.ok, true);
  assert.match(ubicacionVisible(resultado.data.cita), /Miraflores.*Av\. Ejemplo 123/);
  assert.equal(puedeMostrarMapaSede(resultado.data.cita), false);
});

test("Cuponidad y Bee no muestran saldo del cliente", () => {
  for (const token of ["stub-cupon", "stub-bee"]) {
    const resultado = getStubFicha(token);
    assert.equal(resultado.ok, true);
    assert.equal(resultado.data.pago.saldo, 0);
    assert.match(resultado.data.pago.leyenda, /^Pago gestionado por (Cuponidad|Bee Beneficios)$/);
  }
});

test("los mensajes manuales distinguen domicilio, convenio y motivo nulo en ambos idiomas", () => {
  for (const idioma of ["es", "en"]) {
    const domicilio = `${textoCabeceraPendiente(idioma, "domicilio").subtitulo} ${textoFinalPendiente(idioma, "domicilio").subtitulo}`;
    const convenio = `${textoCabeceraPendiente(idioma, "convenio").subtitulo} ${textoFinalPendiente(idioma, "convenio").subtitulo}`;
    const generico = `${textoCabeceraPendiente(idioma, null).subtitulo} ${textoFinalPendiente(idioma, null).subtitulo}`;
    assert.match(domicilio.toLowerCase(), /coverage|cobertura/);
    assert.doesNotMatch(convenio.toLowerCase(), /coverage|cobertura|therapist|terapistas/);
    assert.doesNotMatch(generico.toLowerCase(), /reserved|reservada|confirmed|confirmada|booked/);
  }
});

test("DNI genera boleta y RUC exige factura con razón social", () => {
  assert.equal(comprobanteValido({ requiere: true, tipo: "DNI", numero: "12345678", razonSocial: "" }), true);
  assert.equal(comprobanteValido({ requiere: true, tipo: "DNI", numero: "123", razonSocial: "" }), false);
  assert.equal(comprobanteValido({ requiere: true, tipo: "RUC", numero: "20123456789", razonSocial: "Vita SAC" }), true);
  assert.equal(comprobanteValido({ requiere: true, tipo: "RUC", numero: "20123456789", razonSocial: "" }), false);
});

test("el código se envía únicamente cuando Caja lo requiere", () => {
  assert.equal(codigoCuponParaPayload(false, "NO-DEBE-SALIR"), null);
  assert.equal(codigoCuponParaPayload(true, "  CUP-123  "), "CUP-123");
  assert.equal(codigoCuponParaPayload(true, ""), null);
});
