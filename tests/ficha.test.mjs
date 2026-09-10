import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { correoValido } from "../lib/ficha/email.ts";
import { consentimientoSaludParaPayload, consentimientoSaludValido, tieneDatosSalud } from "../lib/ficha/health.ts";
import { telefonoValido } from "../lib/ficha/phone.ts";
import { fichaText } from "../lib/ficha/text.ts";
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

test("teléfono extranjero válido acepta correo vacío cuando el contrato no lo exige", () => {
  assert.equal(telefonoValido("+1 202 555 0123", "US"), true);
  assert.equal(correoValido("", false), true);
  assert.equal(correoValido("correo-invalido", false), false);
});

test("el correo solo se exige cuando correoObligatorio es true", () => {
  assert.equal(correoValido("", true), false);
  assert.equal(correoValido("cliente@example.com", true), true);
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

test("la cabecera normal conserva la reserva cuando caja no requiere confirmación manual", () => {
  const resultado = getStubFicha("stub-nuevo");
  assert.equal(resultado.ok, true);
  assert.equal(resultado.data.requiere.confirmacionManual, false);
  assert.equal(fichaText.es.cabecera.titulo, "Tu cita está reservada.");
  assert.equal(fichaText.en.cabecera.titulo, "Your appointment is booked.");
});

test("el estado manual usa textos pendientes en español e inglés sin afirmar una cita definitiva", () => {
  const resultado = getStubFicha("stub-domicilio");
  assert.equal(resultado.ok, true);
  assert.equal(resultado.data.requiere.confirmacionManual, true);

  for (const idioma of ["es", "en"]) {
    const texto = fichaText[idioma];
    const manual = ["domicilio", "convenio", "generico"].map((motivo) => {
      const cabecera = texto.cabeceraPendiente[motivo];
      const final = texto.final.pendiente[motivo];
      return `${cabecera.titulo} ${cabecera.subtitulo} ${final.titulo} ${final.subtitulo}`;
    }).join(" ");
    assert.doesNotMatch(manual.toLowerCase(), /reservada|confirmada|booked|confirmed/);
  }

  assert.match(fichaText.es.cabeceraPendiente.domicilio.subtitulo, /cobertura.*terapistas/);
  assert.match(fichaText.es.cabeceraPendiente.convenio.subtitulo, /código o beneficio/);
  assert.doesNotMatch(fichaText.es.cabeceraPendiente.convenio.subtitulo, /cobertura|terapistas/);
  assert.match(fichaText.en.final.pendiente.convenio.subtitulo, /code or benefit/);
});

test("el indicador manual procede exclusivamente del GET y llega a PantallaFinal", async () => {
  const [wizard, finalScreen] = await Promise.all([
    readFile(new URL("../app/cita/[token]/FichaWizard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/cita/[token]/PantallaFinal.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(wizard, /motivoConfirmacion=\{ficha\.requiere\.motivoConfirmacion\}/);
  assert.match(finalScreen, /textoFinalPendiente\(idioma, motivoConfirmacion\)/);
  assert.match(finalScreen, /confirmacionManual \? t\.cuandoPendiente/);
});
