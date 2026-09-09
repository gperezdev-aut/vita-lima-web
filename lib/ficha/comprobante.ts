export type TipoDocumentoComprobante = "DNI" | "RUC";

export function comprobanteValido(input: {
  requiere: boolean;
  tipo: TipoDocumentoComprobante;
  numero: string;
  razonSocial: string;
}) {
  if (!input.requiere) return true;
  if (input.tipo === "DNI") return /^\d{8}$/.test(input.numero.trim());
  return /^\d{11}$/.test(input.numero.trim()) && input.razonSocial.trim().length > 1;
}

/** Una cita directa siempre manda null, aunque el navegador conserve texto previo. */
export function codigoCuponParaPayload(requiereCodigo: boolean, codigo: string) {
  return requiereCodigo ? codigo.trim() || null : null;
}
