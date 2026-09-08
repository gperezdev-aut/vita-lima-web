import type { CajaErrorCode, EnviarFichaPayload, EnviarFichaResult, FichaData, FichaResult } from "./types";

/**
 * Modo stub: sin CAJA_API_URL, la página entera se construye y revisa contra
 * estos casos. Tokens fijos para que las capturas y el QA sean reproducibles
 * — ver docs/encargo-web-ficha-cita.md. Cualquier token que no esté aquí
 * responde como token_no_existe.
 */

const FICHAS: Record<string, FichaData> = {
  "stub-nuevo": {
    token: "stub-nuevo",
    estado: "pendiente",
    idioma: "es",
    canal: "directo",
    cita: {
      fecha: "2026-09-13",
      hora: "16:00",
      sede: "San Borja",
      sedeDireccion: "Av. Aviación 3358, oficina 204",
      sedeMapsUrl: "https://maps.google.com/?q=Av.+Aviación+3358,+San+Borja",
      personas: 1,
      servicios: [{ nombre: "Espalda Libre", duracionMin: 60 }],
      duracionTotalMin: 60,
    },
    pago: { moneda: "PEN", adelantoRecibido: 10, saldo: 65, leyenda: "Adelanto recibido" },
    requiere: { codigoCupon: false, correoObligatorio: false, documentoParaBoleta: "opcional" },
    cliente: { conocido: false, nombre: "" },
    politicaCancelacionUrl: "/politica-de-privacidad",
  },
  "stub-conocido": {
    token: "stub-conocido",
    estado: "pendiente",
    idioma: "es",
    canal: "directo",
    cita: {
      fecha: "2026-09-14",
      hora: "17:30",
      sede: "Miraflores",
      sedeDireccion: "Av. Larco 812, oficina 306",
      sedeMapsUrl: "https://maps.google.com/?q=Av.+Larco+812,+Miraflores",
      personas: 1,
      servicios: [{ nombre: "Relax Vital", duracionMin: 60 }],
      duracionTotalMin: 60,
    },
    pago: { moneda: "PEN", adelantoRecibido: 15, saldo: 55, leyenda: "Adelanto recibido" },
    requiere: { codigoCupon: false, correoObligatorio: false, documentoParaBoleta: "opcional" },
    cliente: { conocido: true, nombre: "Rosa", emailEnmascarado: "r***@gmail.com" },
    politicaCancelacionUrl: "/politica-de-privacidad",
  },
  "stub-cupon": {
    token: "stub-cupon",
    estado: "pendiente",
    idioma: "es",
    canal: "cuponidad",
    cita: {
      fecha: "2026-09-15",
      hora: "12:00",
      sede: "San Borja",
      sedeDireccion: "Av. Aviación 3358, oficina 204",
      sedeMapsUrl: "https://maps.google.com/?q=Av.+Aviación+3358,+San+Borja",
      personas: 2,
      servicios: [{ nombre: "Alivio Integral", duracionMin: 60 }],
      duracionTotalMin: 60,
    },
    pago: { moneda: "PEN", adelantoRecibido: 0, saldo: 160, leyenda: "Pagado en Cuponidad" },
    requiere: { codigoCupon: true, correoObligatorio: false, documentoParaBoleta: "no" },
    cliente: { conocido: false, nombre: "" },
    politicaCancelacionUrl: "/politica-de-privacidad",
    cupon: { vigenteHasta: "2026-09-20" },
  },
  "stub-extranjero": {
    token: "stub-extranjero",
    estado: "pendiente",
    idioma: "en",
    canal: "directo",
    cita: {
      fecha: "2026-09-16",
      hora: "15:00",
      sede: "Miraflores",
      sedeDireccion: "Av. Larco 812, oficina 306",
      sedeMapsUrl: "https://maps.google.com/?q=Av.+Larco+812,+Miraflores",
      personas: 1,
      servicios: [{ nombre: "Terapia Vita", duracionMin: 60 }],
      duracionTotalMin: 60,
    },
    pago: { moneda: "PEN", adelantoRecibido: 20, saldo: 60, leyenda: "Deposit received" },
    requiere: { codigoCupon: false, correoObligatorio: true, documentoParaBoleta: "no" },
    cliente: { conocido: false, nombre: "" },
    politicaCancelacionUrl: "/politica-de-privacidad",
  },
};

const ERRORES: Record<string, CajaErrorCode> = {
  "stub-vencido": "token_vencido",
  "stub-completa": "ficha_ya_completa",
};

export function getStubFicha(token: string): FichaResult {
  const ficha = FICHAS[token];
  if (ficha) return { ok: true, data: ficha };

  const errorCode = ERRORES[token];
  if (errorCode) return { ok: false, status: 410, error: { error: errorCode } };

  return { ok: false, status: 404, error: { error: "token_no_existe" } };
}

export function postStubFicha(token: string, payload: EnviarFichaPayload): EnviarFichaResult {
  const ficha = FICHAS[token];
  if (!ficha) return { ok: false, status: 404, error: { error: "token_no_existe" } };

  if (!payload.telefono.crudo.trim() || !payload.nombre.trim()) {
    return { ok: false, status: 422, error: { error: "validacion", mensaje: "Faltan datos obligatorios." } };
  }

  // Cupón reservado para probar el 409 sin necesitar un token aparte.
  if (ficha.requiere.codigoCupon && payload.codigoCupon?.trim().toUpperCase() === "USADO") {
    return {
      ok: false,
      status: 409,
      error: { error: "cupon_ya_usado", mensaje: "Este código ya fue canjeado." },
    };
  }

  return {
    ok: true,
    data: {
      ok: true,
      icsUrl: "https://example.com/stub/cita.ics",
      whatsappUrl: `https://wa.me/51907308415?text=${encodeURIComponent("Hola, ya llené mi ficha de cita.")}`,
      resumen: {
        fecha: ficha.cita.fecha,
        hora: ficha.cita.hora,
        sede: ficha.cita.sede,
        sedeDireccion: ficha.cita.sedeDireccion,
        sedeMapsUrl: ficha.cita.sedeMapsUrl,
        servicios: ficha.cita.servicios,
        moneda: ficha.pago.moneda,
        adelantoRecibido: ficha.pago.adelantoRecibido,
        saldo: ficha.pago.saldo,
      },
    },
  };
}
