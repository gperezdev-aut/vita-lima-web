/**
 * Tipos del contrato con caja — ver docs/encargo-web-ficha-cita.md.
 * Esta página nunca decide estos campos, solo los transporta.
 */

export type Idioma = "es" | "en";
export type Canal = "directo" | "cuponidad" | "bee";

export type FichaServicio = { nombre: string; duracionMin: number | null };
export type MotivoConfirmacion = "domicilio" | "convenio" | null;
export type DomicilioFicha = { distrito: string; direccion: string; referencia: string | null };

export type FichaData = {
  contratoVersion: "ficha-cita-v1";
  token: string;
  estado: "pendiente" | "completa";
  idioma: Idioma;
  canal: Canal;
  cita: {
    fecha: string;
    hora: string;
    sede: string | null;
    sedeDireccion: string | null;
    sedeMapsUrl: string | null;
    personas: number;
    servicios: FichaServicio[];
    duracionTotalMin: number;
    tipoAtencion: "sede" | "domicilio";
    domicilio: DomicilioFicha | null;
  };
  pago: {
    moneda: string;
    adelantoRecibido: number;
    saldo: number;
    leyenda: string;
  };
  requiere: {
    codigoCupon: boolean;
    correoObligatorio: boolean;
    documentoParaBoleta: "no" | "opcional";
    confirmacionManual: boolean;
    motivoConfirmacion: MotivoConfirmacion;
  };
  cliente: {
    conocido: boolean;
    nombre: string | null;
    emailEnmascarado: string | null;
  };
  politicaCancelacionUrl: string | null;
  cupon?: { vigenteHasta: string | null };
};

/** Códigos legibles por máquina que manda caja. El texto que lee el cliente es de esta web. */
export type CajaErrorCode =
  | "token_no_existe"
  | "token_vencido"
  | "ficha_ya_completa"
  | "cupon_ya_usado"
  | "validacion"
  | "configuracion"
  | "contrato_incompatible"
  | "no_autorizado"
  | "rate_limited";

export type CajaError = { error: CajaErrorCode | string; mensaje?: string };

export type FichaResult = { ok: true; data: FichaData } | { ok: false; status: number; error: CajaError };

export type EnviarFichaPayload = {
  telefono: { crudo: string; pais: string };
  nombre: string;
  correo: string | null;
  cumple: { dia: number; mes: number } | null;
  boleta: { requiere: boolean; tipo: "DNI" | "RUC" | null; numero: string | null; razonSocial: string | null };
  salud: {
    embarazo: boolean;
    presion: boolean;
    cirugiaReciente: boolean;
    alergias: string;
    zonasEvitar: string;
    notas: string;
  };
  consentimientos: { datos: boolean; salud: boolean; promociones: boolean };
  codigoCupon: string | null;
  idioma: Idioma;
};

export type EnviarFichaResumen = {
  fecha: string;
  hora: string;
  sede: string | null;
  sedeDireccion: string | null;
  sedeMapsUrl: string | null;
  personas: number;
  servicios: FichaServicio[];
  duracionTotalMin: number;
  tipoAtencion: "sede" | "domicilio";
  domicilio: DomicilioFicha | null;
  moneda: string;
  adelantoRecibido: number;
  saldo: number;
};

export type EnviarFichaData = { ok: true; icsUrl: string; whatsappUrl: string; resumen: EnviarFichaResumen };

export type EnviarFichaResult =
  | { ok: true; data: EnviarFichaData }
  | { ok: false; status: number; error: CajaError };

/**
 * El tsconfig del repo tiene "strict": false (sin strictNullChecks), y sin
 * eso TypeScript no reduce uniones discriminadas con `if (!r.ok)` — el
 * predicado explícito evita depender de ese análisis de flujo.
 */
export function esExito<T extends { ok: boolean }>(resultado: T): resultado is Extract<T, { ok: true }> {
  return resultado.ok === true;
}
