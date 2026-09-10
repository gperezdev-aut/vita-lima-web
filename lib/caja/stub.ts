import type {
  CajaErrorCode,
  EnviarFichaPayload,
  EnviarFichaResult,
  FichaData,
  FichaRecurrenteData,
  FichaResult,
  IdentificarFichaResult,
} from "./types";

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
    cliente: { conocido: false, nombre: null, emailEnmascarado: null },
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
    cliente: { conocido: true, nombre: null, emailEnmascarado: null },
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
    cliente: { conocido: false, nombre: null, emailEnmascarado: null },
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
    cliente: { conocido: false, nombre: null, emailEnmascarado: null },
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
    cliente: { conocido: false, nombre: null, emailEnmascarado: null },
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
    cliente: { conocido: false, nombre: null, emailEnmascarado: null },
    politicaCancelacionUrl: "https://vitalimaspa.com/politica-de-privacidad",
  },
};

const ERRORES: Record<string, CajaErrorCode> = {
  "stub-vencido": "token_vencido",
  "stub-completa": "ficha_ya_completa",
};

const RECURRENTES: Record<string, FichaRecurrenteData | FichaData> = {
  "stub-recurrente-salud": {
    contratoVersion: "ficha-recurrente-v1",
    clienteRecurrente: true,
    cliente: {
      nombre: "Rosa Quispe",
      correo: "rosa@example.com",
      cumple: { dia: 14, mes: 3 },
      promociones: { autorizoAnteriormente: true, requiereNuevaAceptacion: true },
    },
    saludAnterior: {
      disponible: true,
      sinCondicionesDeclaradas: false,
      embarazo: false,
      presion: true,
      cirugiaReciente: false,
      alergias: "Látex",
      zonasEvitar: "Rodilla izquierda",
      notas: "Control médico",
    },
    comprobanteAnterior: null,
  },
  "stub-personalizada": { contratoVersion:"ficha-cita-v2", token:"stub-personalizada", estado:"pendiente", idioma:"es", canal:"directo", cita:{fecha:"2026-09-18",hora:"16:00",sede:"Miraflores",sedeDireccion:"Av. Larco 812",sedeMapsUrl:"https://maps.google.com",personas:3,servicios:[{nombre:"Atención personalizada",duracionMin:90}],duracionTotalMin:90,tipoAtencion:"sede",domicilio:null,modalidad:"simultanea",nombreFinal:"Atención personalizada",precioTotal:300,componentesPorPersona:[{persona:1,componentes:[{tipo:"catalogo",codigo:"FACIAL",nombre:"Facial",precio:100,duracion_min:60},{tipo:"manual",nombre:"Lifting",precio:50,duracion_min:30}]},{persona:2,componentes:[{tipo:"manual",nombre:"Barras de Access",precio:75,duracion_min:90}]},{persona:3,componentes:[{tipo:"catalogo",codigo:"RELAX",nombre:"Relax",precio:75,duracion_min:60}]}]},pago:{moneda:"PEN",adelantoRecibido:150,saldo:150,leyenda:"Adelanto recibido"},requiere:{codigoCupon:false,correoObligatorio:false,documentoParaBoleta:"opcional",confirmacionManual:false,motivoConfirmacion:null},cliente:{conocido:true,nombre:null,emailEnmascarado:null},politicaCancelacionUrl:"https://vitalimaspa.com/politica-de-privacidad" },
  "stub-recurrente-sin-condiciones": {
    contratoVersion: "ficha-recurrente-v1",
    clienteRecurrente: true,
    cliente: {
      nombre: "Rosa Quispe",
      correo: null,
      cumple: null,
      promociones: { autorizoAnteriormente: false, requiereNuevaAceptacion: true },
    },
    saludAnterior: {
      disponible: true,
      sinCondicionesDeclaradas: true,
      embarazo: false,
      presion: false,
      cirugiaReciente: false,
      alergias: null,
      zonasEvitar: null,
      notas: null,
    },
    comprobanteAnterior: null,
  },
  "stub-recurrente-comprobante": {
    contratoVersion: "ficha-recurrente-v1",
    clienteRecurrente: true,
    cliente: {
      nombre: "Rosa Quispe",
      correo: "rosa@example.com",
      cumple: { dia: 14, mes: 3 },
      promociones: { autorizoAnteriormente: true, requiereNuevaAceptacion: true },
    },
    saludAnterior: null,
    comprobanteAnterior: {
      tipoComprobante: "FACTURA",
      tipoDocumento: "RUC",
      numeroDocumento: "20123456789",
      razonSocial: "Rosa Servicios SAC",
      solicitarEnNuevaCita: false,
    },
  },
  "stub-sin-historial": {
    contratoVersion: "ficha-recurrente-v1",
    clienteRecurrente: false,
    cliente: {
      nombre: "Rosa Quispe",
      correo: null,
      cumple: null,
      promociones: { autorizoAnteriormente: false, requiereNuevaAceptacion: true },
    },
    saludAnterior: null,
    comprobanteAnterior: null,
  },
};

function fichaParaToken(token: string): FichaData | undefined {
  const ficha = FICHAS[token];
  if (ficha) return ficha;
  const especial = RECURRENTES[token];
  if (especial && especial.contratoVersion === "ficha-cita-v2") return especial;
  if (RECURRENTES[token] || token === "stub-identificar-invalido" || token === "stub-identificar-rate") {
    return { ...FICHAS["stub-nuevo"], token };
  }
  return undefined;
}

export function getStubFicha(token: string): FichaResult {
  const ficha = fichaParaToken(token);
  if (ficha) return { ok: true, data: ficha };

  const errorCode = ERRORES[token];
  if (errorCode) return { ok: false, status: 410, error: { error: errorCode } };

  return { ok: false, status: 404, error: { error: "token_no_existe" } };
}

export function identificarStubFicha(
  token: string,
  telefono: { crudo: string; pais: string }
): IdentificarFichaResult {
  if (!fichaParaToken(token)) return { ok: false, status: 404, error: { error: "token_no_existe" } };
  if (token === "stub-identificar-rate") return { ok: false, status: 429, error: { error: "rate_limited" } };
  if (token === "stub-identificar-invalido" || !telefono.crudo.trim() || !telefono.pais.trim()) {
    return { ok: false, status: 403, error: { error: "identificacion_no_valida" } };
  }
  const data = RECURRENTES[token] ?? RECURRENTES["stub-sin-historial"];
  if (data.contratoVersion !== "ficha-recurrente-v1") return { ok: false, status: 403, error: { error: "identificacion_no_valida" } };
  return { ok: true, data };
}

export function postStubFicha(token: string, payload: EnviarFichaPayload): EnviarFichaResult {
  const ficha = fichaParaToken(token);
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
