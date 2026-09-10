/**
 * Tipos del contrato con caja — ver docs/encargo-web-ficha-cita.md.
 * Esta página nunca decide estos campos, solo los transporta.
 */

export type Idioma = "es" | "en";
export type Canal = "directo" | "cuponidad" | "bee";

export type FichaServicio = { nombre: string; duracionMin: number | null };
export type MotivoConfirmacion = "domicilio" | "convenio" | null;
export type DomicilioFicha = { distrito: string; direccion: string; referencia: string | null };

export type FichaBase = {
  contratoVersion: "ficha-cita-v1" | "ficha-cita-v2";
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
  | "rate_limited"
  | "identificacion_no_valida"
  | "error_interno";

export type CajaError = { error: CajaErrorCode | string; mensaje?: string };

export type FichaResult = { ok: true; data: FichaData } | { ok: false; status: number; error: CajaError };

/** Contrato privado: solo llega al navegador después de validar el WhatsApp. */
export type FichaRecurrenteData = {
  contratoVersion: "ficha-recurrente-v1";
  clienteRecurrente: boolean;
  cliente: {
    nombre: string | null;
    correo: string | null;
    cumple: { dia: number; mes: number } | null;
    promociones: { autorizoAnteriormente: boolean; requiereNuevaAceptacion: true };
  };
  saludAnterior: {
    disponible: true;
    sinCondicionesDeclaradas: boolean;
    embarazo: boolean;
    presion: boolean;
    cirugiaReciente: boolean;
    alergias: string | null;
    zonasEvitar: string | null;
    notas: string | null;
  } | null;
  comprobanteAnterior: {
    tipoComprobante: "BOLETA" | "FACTURA";
    tipoDocumento: "DNI" | "RUC";
    numeroDocumento: string;
    razonSocial: string | null;
    solicitarEnNuevaCita: false;
  } | null;
};
export type FichaDataV1 = FichaBase & { contratoVersion: "ficha-cita-v1"; cita: FichaBase["cita"] };
export type ComponentePersonalizadoPublico = { tipo: "catalogo" | "manual"; codigo?: string; nombre: string; precio: number; duracion_min: number };
export type FichaDataV2 = FichaBase & { contratoVersion: "ficha-cita-v2"; cita: FichaBase["cita"] & { personas: 1|2|3|4|5; modalidad: "simultanea"|"consecutiva"; componentesPorPersona: Array<{ persona:number; componentes: ComponentePersonalizadoPublico[] }>; nombreFinal: string; precioTotal: number } };
export type FichaData = FichaDataV1 | FichaDataV2;

export type IdentificarFichaResult =
  | { ok: true; data: FichaRecurrenteData }
  | { ok: false; status: number; error: CajaError };

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
