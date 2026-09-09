import type { CajaErrorCode, EnviarFichaPayload, EnviarFichaResult, FichaData, FichaResult } from "./types";

/**
 * Modo stub: solo con CAJA_API_STUB_ENABLED=true fuera de producción, la
 * página entera se construye y revisa contra estos casos. Tokens fijos
 * — ver docs/encargo-web-ficha-cita.md. Cualquier token que no esté aquí
 * responde como token_no_existe.
 */

const FICHAS: Record<string, FichaData> = {
  "stub-nuevo": {
    contratoVersion: "ficha-cita-v1",
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
      tipoAtencion: "sede",
      domicilio: null,
    },
    pago: { moneda: "PEN", adelantoRecibido: 10, saldo: 65, leyenda: "Adelanto recibido" },
    requiere: { codigoCupon: false, correoObligatorio: false, documentoParaBoleta: "opcional", confirmacionManual: false, motivoConfirmacion: null },
    cliente: { conocido: false, nombre: "", emailEnmascarado: null },
    politicaCancelacionUrl: "https://vitalimaspa.com/politica-de-privacidad",
  },
  "stub-conocido": {
    contratoVersion: "ficha-cita-v1",
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
      tipoAtencion: "sede",
      domicilio: null,
    },
    pago: { moneda: "PEN", adelantoRecibido: 15, saldo: 55, leyenda: "Adelanto recibido" },
    requiere: { codigoCupon: false, correoObligatorio: false, documentoParaBoleta: "opcional", confirmacionManual: false, motivoConfirmacion: null },
    cliente: { conocido: true, nombre: "Rosa", emailEnmascarado: "r***@gmail.com" },
    politicaCancelacionUrl: "https://vitalimaspa.com/politica-de-privacidad",
  },
  "stub-cupon": {
    contratoVersion: "ficha-cita-v1",
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
      tipoAtencion: "sede",
      domicilio: null,
    },
    pago: { moneda: "PEN", adelantoRecibido: 0, saldo: 0, leyenda: "Pago gestionado por Cuponidad" },
    requiere: { codigoCupon: true, correoObligatorio: false, documentoParaBoleta: "no", confirmacionManual: true, motivoConfirmacion: "convenio" },
    cliente: { conocido: false, nombre: "", emailEnmascarado: null },
    politicaCancelacionUrl: "https://vitalimaspa.com/politica-de-privacidad",
    cupon: { vigenteHasta: "2026-09-20" },
  },
  "stub-bee": {
    contratoVersion: "ficha-cita-v1",
    token: "stub-bee",
    estado: "pendiente",
    idioma: "en",
    canal: "bee",
    cita: {
      fecha: "2026-09-15",
      hora: "14:00",
      sede: "Miraflores",
      sedeDireccion: "Av. Larco 812, oficina 306",
      sedeMapsUrl: "https://maps.google.com/?q=Av.+Larco+812,+Miraflores",
      personas: 1,
      servicios: [{ nombre: "Alivio Integral", duracionMin: 60 }],
      duracionTotalMin: 60,
      tipoAtencion: "sede",
      domicilio: null,
    },
    pago: { moneda: "PEN", adelantoRecibido: 0, saldo: 0, leyenda: "Pago gestionado por Bee Beneficios" },
    requiere: { codigoCupon: true, correoObligatorio: false, documentoParaBoleta: "no", confirmacionManual: true, motivoConfirmacion: "convenio" },
    cliente: { conocido: false, nombre: "", emailEnmascarado: null },
    politicaCancelacionUrl: "https://vitalimaspa.com/politica-de-privacidad",
    cupon: { vigenteHasta: "2026-09-20" },
  },
  "stub-extranjero": {
    contratoVersion: "ficha-cita-v1",
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
      tipoAtencion: "sede",
      domicilio: null,
    },
    pago: { moneda: "PEN", adelantoRecibido: 20, saldo: 60, leyenda: "Deposit received" },
    requiere: { codigoCupon: false, correoObligatorio: false, documentoParaBoleta: "opcional", confirmacionManual: false, motivoConfirmacion: null },
    cliente: { conocido: false, nombre: "", emailEnmascarado: null },
    politicaCancelacionUrl: "https://vitalimaspa.com/politica-de-privacidad",
  },
  "stub-domicilio": {
    contratoVersion: "ficha-cita-v1",
    token: "stub-domicilio",
    estado: "pendiente",
    idioma: "es",
    canal: "directo",
    cita: {
      fecha: "2026-09-17",
      hora: "16:00",
      sede: "Atención a domicilio",
      sedeDireccion: null,
      sedeMapsUrl: null,
      personas: 1,
      servicios: [{ nombre: "Masaje a domicilio 1 hora", duracionMin: 60 }],
      duracionTotalMin: 60,
      tipoAtencion: "domicilio",
      domicilio: { distrito: "Miraflores", direccion: "Av. Ejemplo 123", referencia: "portón negro" },
    },
    pago: { moneda: "PEN", adelantoRecibido: 67.5, saldo: 67.5, leyenda: "Adelanto recibido" },
    requiere: { codigoCupon: false, correoObligatorio: false, documentoParaBoleta: "opcional", confirmacionManual: true, motivoConfirmacion: "domicilio" },
    cliente: { conocido: false, nombre: "", emailEnmascarado: null },
    politicaCancelacionUrl: "https://vitalimaspa.com/politica-de-privacidad",
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
  if (!ficha) {
    const errorCode = ERRORES[token];
    if (errorCode) return { ok: false, status: 410, error: { error: errorCode } };
    return { ok: false, status: 404, error: { error: "token_no_existe" } };
  }

  if (!payload.telefono.crudo.trim() || !payload.nombre.trim()) {
    return { ok: false, status: 422, error: { error: "validacion", mensaje: "Faltan datos obligatorios." } };
  }

  const tieneSalud = Boolean(
    payload.salud.embarazo ||
      payload.salud.presion ||
      payload.salud.cirugiaReciente ||
      payload.salud.alergias.trim() ||
      payload.salud.zonasEvitar.trim() ||
      payload.salud.notas.trim(),
  );
  if (!payload.consentimientos.datos || (tieneSalud && !payload.consentimientos.salud)) {
    return { ok: false, status: 422, error: { error: "validacion", mensaje: "Falta consentimiento." } };
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
        personas: ficha.cita.personas,
        servicios: ficha.cita.servicios,
        duracionTotalMin: ficha.cita.duracionTotalMin,
        tipoAtencion: ficha.cita.tipoAtencion,
        domicilio: ficha.cita.domicilio,
        moneda: ficha.pago.moneda,
        adelantoRecibido: ficha.pago.adelantoRecibido,
        saldo: ficha.pago.saldo,
      },
    },
  };
}
