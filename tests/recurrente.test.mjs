import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { identificarStubFicha } from "../lib/caja/stub.ts";
import { validarFichaRecurrente } from "../lib/caja/validation.ts";
import { consentimientoSaludParaPayload, consentimientoSaludValido, tieneDatosSalud } from "../lib/ficha/health.ts";
import { perfilRapidoValido } from "../lib/ficha/email.ts";

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

test("comprobante recurrente solo acepta las parejas y longitudes documentales válidas", () => {
  const resultado = identificarStubFicha("stub-recurrente-comprobante", telefono);
  assert.equal(resultado.ok, true);
  const boletaDni = structuredClone(resultado.data);
  boletaDni.comprobanteAnterior = {
    tipoComprobante: "BOLETA", tipoDocumento: "DNI", numeroDocumento: "12345678", razonSocial: null, solicitarEnNuevaCita: false,
  };
  assert.equal(validarFichaRecurrente(boletaDni).ok, true);

  const boletaRuc = structuredClone(boletaDni);
  boletaRuc.comprobanteAnterior.tipoDocumento = "RUC";
  boletaRuc.comprobanteAnterior.numeroDocumento = "20123456789";
  assert.equal(validarFichaRecurrente(boletaRuc).ok, false);

  const facturaRuc = structuredClone(resultado.data);
  assert.equal(validarFichaRecurrente(facturaRuc).ok, true);

  const facturaDni = structuredClone(facturaRuc);
  facturaDni.comprobanteAnterior.tipoDocumento = "DNI";
  facturaDni.comprobanteAnterior.numeroDocumento = "12345678";
  assert.equal(validarFichaRecurrente(facturaDni).ok, false);

  const dniCorto = structuredClone(boletaDni);
  dniCorto.comprobanteAnterior.numeroDocumento = "1234567";
  assert.equal(validarFichaRecurrente(dniCorto).ok, false);

  const rucCorto = structuredClone(facturaRuc);
  rucCorto.comprobanteAnterior.numeroDocumento = "2012345678";
  assert.equal(validarFichaRecurrente(rucCorto).ok, false);

  const facturaSinRazon = structuredClone(facturaRuc);
  facturaSinRazon.comprobanteAnterior.razonSocial = " ";
  assert.equal(validarFichaRecurrente(facturaSinRazon).ok, false);
});

test("salud recurrente sin condiciones debe ser internamente coherente", () => {
  const resultado = identificarStubFicha("stub-recurrente-sin-condiciones", telefono);
  assert.equal(resultado.ok, true);
  assert.equal(validarFichaRecurrente(resultado.data).ok, true);

  const contradictoria = structuredClone(resultado.data);
  contradictoria.saludAnterior.presion = true;
  assert.equal(validarFichaRecurrente(contradictoria).ok, false);

  const conNota = structuredClone(resultado.data);
  conNota.saludAnterior.notas = "No debe coexistir con sin condiciones.";
  assert.equal(validarFichaRecurrente(conNota).ok, false);
});

test("perfil incompleto obliga la ruta completa y conserva correo opcional vacío", () => {
  assert.equal(perfilRapidoValido({ nombre: "", correo: "rosa@example.com", correoObligatorio: false }), false);
  assert.equal(perfilRapidoValido({ nombre: "Rosa Quispe", correo: "", correoObligatorio: true }), false);
  assert.equal(perfilRapidoValido({ nombre: "Rosa Quispe", correo: "", correoObligatorio: false }), true);
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
  assert.match(wizard, /setFlujo\(respuesta\.data\.clienteRecurrente && perfilCompleto \? "decision" : "completa"\)/);
  assert.match(wizard, /perfilIncompleto/);
  assert.match(wizard, /setFlujo\("rapida"\)/);
  assert.match(wizard, /setFlujo\("completa"\); setPaso\(1\)/);
  assert.doesNotMatch(wizard, /holaConocido\(/);
  assert.match(wizard, /observacionNueva/);
});

test("la ficha pública no usa almacenamiento persistente y recargar exige identificar otra vez", async () => {
  const [wizard, docs] = await Promise.all([
    readFile(new URL("../app/cita/[token]/FichaWizard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../docs/encargo-web-ficha-cita.md", import.meta.url), "utf8"),
  ]);
  await assert.rejects(access(new URL("../lib/ficha/draft.ts", import.meta.url)));
  assert.match(wizard, /useState<"identificar" \| "decision" \| "rapida" \| "completa">\("identificar"\)/);
  assert.doesNotMatch(wizard, /localStorage|sessionStorage|guardarBorrador|leerBorrador|borrarBorrador|vita:ficha/);
  assert.match(docs, /0d335e9d142a6d4e12f7caec208a4c4d40dcd465/);
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

test("la ficha no registra tokens, PII ni errores de fetch que puedan contener la URL", async () => {
  const [client, wizard] = await Promise.all([
    readFile(new URL("../lib/caja/client.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/cita/[token]/FichaWizard.tsx", import.meta.url), "utf8"),
  ]);
  assert.doesNotMatch(client, /console\.(?:log|error|warn)\([^\n]*(?:token|payload|telefono|salud|error\))/i);
  assert.doesNotMatch(wizard, /localStorage|sessionStorage/);
  assert.doesNotMatch([client, wizard].join("\n"), /service_role|SUPABASE_SERVICE/i);
});

test("el wizard bloquea doble identificación y doble envío", async () => {
  const wizard = await readFile(new URL("../app/cita/[token]/FichaWizard.tsx", import.meta.url), "utf8");
  assert.match(wizard, /if \(identificandoRef\.current\) return/);
  assert.match(wizard, /if \(enviandoRef\.current \|\| !paso3Valido\) return/);
});

test("la ruta rechaza una respuesta de Caja vinculada a otro token", async () => {
  const page = await readFile(new URL("../app/cita/[token]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /resultado\.data\.token !== token/);
  assert.match(page, /ErrorScreen codigo="contrato_incompatible"/);
});
