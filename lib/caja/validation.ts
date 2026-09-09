import type {
  DomicilioFicha,
  EnviarFichaData,
  EnviarFichaResumen,
  FichaData,
  FichaServicio,
  FichaRecurrenteData,
  MotivoConfirmacion,
} from "./types";

type RecordJson = Record<string, unknown>;
export type ContratoValidado<T> = { ok: true; data: T } | { ok: false; motivo: string };

export function errorContratoIncompatible(mensaje: string) {
  return { error: "contrato_incompatible" as const, mensaje };
}

function record(value: unknown): value is RecordJson {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function string(value: unknown): value is string {
  return typeof value === "string";
}

function stringNoVacio(value: unknown): value is string {
  return string(value) && value.trim().length > 0;
}

function nullableString(value: unknown): value is string | null {
  return value === null || string(value);
}

function numero(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function enteroPositivo(value: unknown): value is number {
  return numero(value) && Number.isInteger(value) && value > 0;
}

function urlNullable(value: unknown): value is string | null {
  if (value === null) return true;
  if (!stringNoVacio(value)) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function fecha(value: unknown) {
  return string(value) && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function hora(value: unknown) {
  return string(value) && /^\d{2}:\d{2}(?::\d{2})?$/.test(value);
}

function servicios(value: unknown): value is FichaServicio[] {
  return Array.isArray(value) && value.length > 0 && value.every((servicio) =>
    record(servicio) && stringNoVacio(servicio.nombre) && (servicio.duracionMin === null || enteroPositivo(servicio.duracionMin))
  );
}

function domicilio(value: unknown): value is DomicilioFicha | null {
  return value === null || (
    record(value) && stringNoVacio(value.distrito) && stringNoVacio(value.direccion) && nullableString(value.referencia)
  );
}

function motivo(value: unknown): value is MotivoConfirmacion {
  return value === null || value === "domicilio" || value === "convenio";
}

function cita(value: unknown) {
  return record(value) && fecha(value.fecha) && hora(value.hora) && nullableString(value.sede) &&
    nullableString(value.sedeDireccion) && urlNullable(value.sedeMapsUrl) &&
    (value.personas === 1 || value.personas === 2) && servicios(value.servicios) &&
    enteroPositivo(value.duracionTotalMin) && (value.tipoAtencion === "sede" || value.tipoAtencion === "domicilio") &&
    domicilio(value.domicilio) &&
    (value.tipoAtencion === "domicilio" ? value.domicilio !== null && value.sedeMapsUrl === null : value.domicilio === null);
}

function pago(value: unknown) {
  return record(value) && stringNoVacio(value.moneda) && numero(value.adelantoRecibido) && value.adelantoRecibido >= 0 &&
    numero(value.saldo) && value.saldo >= 0 && stringNoVacio(value.leyenda);
}

function requiere(value: unknown) {
  return record(value) && typeof value.codigoCupon === "boolean" && typeof value.correoObligatorio === "boolean" &&
    (value.documentoParaBoleta === "no" || value.documentoParaBoleta === "opcional") &&
    typeof value.confirmacionManual === "boolean" && motivo(value.motivoConfirmacion) &&
    (!value.confirmacionManual || value.motivoConfirmacion === "domicilio" || value.motivoConfirmacion === "convenio" || value.motivoConfirmacion === null);
}

function cliente(value: unknown) {
  return record(value) && typeof value.conocido === "boolean" && nullableString(value.nombre) && nullableString(value.emailEnmascarado);
}

function resumen(value: unknown): value is EnviarFichaResumen {
  return cita(value) && record(value) && stringNoVacio(value.moneda) && numero(value.adelantoRecibido) && value.adelantoRecibido >= 0 &&
    numero(value.saldo) && value.saldo >= 0;
}

function incompatible(motivo: string): ContratoValidado<never> {
  return { ok: false, motivo };
}

/** Verifica el JSON real recibido de Caja; nunca usa una conversión `as`. */
export function validarFichaGet(value: unknown): ContratoValidado<FichaData> {
  if (!record(value)) return incompatible("La respuesta GET no es un objeto.");
  if (value.contratoVersion !== "ficha-cita-v1") return incompatible("La versión de contrato no es ficha-cita-v1.");
  if (!stringNoVacio(value.token) || (value.estado !== "pendiente" && value.estado !== "completa") ||
      (value.idioma !== "es" && value.idioma !== "en") ||
      (value.canal !== "directo" && value.canal !== "cuponidad" && value.canal !== "bee") ||
      !cita(value.cita) || !pago(value.pago) || !requiere(value.requiere) || !cliente(value.cliente) ||
      !urlNullable(value.politicaCancelacionUrl)) {
    return incompatible("La respuesta GET no cumple los campos críticos de ficha-cita-v1.");
  }
  if (value.cupon !== undefined && (!record(value.cupon) || !nullableString(value.cupon.vigenteHasta))) {
    return incompatible("El bloque de cupón no es válido.");
  }
  return { ok: true, data: value as FichaData };
}

/** El POST no trae contratoVersion, pero sí todo el resumen necesario para la pantalla final. */
export function validarFichaPost(value: unknown): ContratoValidado<EnviarFichaData> {
  if (!record(value) || value.ok !== true || !urlNullable(value.icsUrl) || !urlNullable(value.whatsappUrl) ||
      !stringNoVacio(value.icsUrl) || !stringNoVacio(value.whatsappUrl) || !resumen(value.resumen)) {
    return incompatible("La respuesta POST no contiene un resumen compatible.");
  }
  return { ok: true, data: value as EnviarFichaData };
}

function cumple(value: unknown) {
  return value === null || (
    record(value) && numero(value.dia) && Number.isInteger(value.dia) && value.dia >= 1 && value.dia <= 31 &&
    numero(value.mes) && Number.isInteger(value.mes) && value.mes >= 1 && value.mes <= 12
  );
}

function clienteRecurrente(value: unknown) {
  return record(value) && nullableString(value.nombre) && nullableString(value.correo) && cumple(value.cumple) &&
    record(value.promociones) && typeof value.promociones.autorizoAnteriormente === "boolean" &&
    value.promociones.requiereNuevaAceptacion === true;
}

function saludAnterior(value: unknown) {
  if (value === null) return true;
  if (!record(value) || value.disponible !== true || typeof value.sinCondicionesDeclaradas !== "boolean" ||
      typeof value.embarazo !== "boolean" || typeof value.presion !== "boolean" ||
      typeof value.cirugiaReciente !== "boolean" || !nullableString(value.alergias) ||
      !nullableString(value.zonasEvitar) || !nullableString(value.notas)) return false;
  return !value.sinCondicionesDeclaradas || (
    value.embarazo === false && value.presion === false && value.cirugiaReciente === false &&
    value.alergias === null && value.zonasEvitar === null && value.notas === null
  );
}

function comprobanteAnterior(value: unknown) {
  if (value === null) return true;
  if (!record(value) || !nullableString(value.razonSocial) || value.solicitarEnNuevaCita !== false) return false;
  if (value.tipoComprobante === "BOLETA" && value.tipoDocumento === "DNI") {
    return typeof value.numeroDocumento === "string" && /^\d{8}$/.test(value.numeroDocumento);
  }
  return value.tipoComprobante === "FACTURA" && value.tipoDocumento === "RUC" &&
    typeof value.numeroDocumento === "string" && /^\d{11}$/.test(value.numeroDocumento) &&
    stringNoVacio(value.razonSocial);
}

/** Verificación estricta del contrato privado ficha-recurrente-v1. */
export function validarFichaRecurrente(value: unknown): ContratoValidado<FichaRecurrenteData> {
  if (!record(value)) return incompatible("La respuesta de identificación no es un objeto.");
  if (value.contratoVersion !== "ficha-recurrente-v1") {
    return incompatible("La versión de identificación no es ficha-recurrente-v1.");
  }
  if (typeof value.clienteRecurrente !== "boolean" || !clienteRecurrente(value.cliente) ||
      !saludAnterior(value.saludAnterior) || !comprobanteAnterior(value.comprobanteAnterior)) {
    return incompatible("La respuesta de identificación no cumple ficha-recurrente-v1.");
  }
  return { ok: true, data: value as FichaRecurrenteData };
}
