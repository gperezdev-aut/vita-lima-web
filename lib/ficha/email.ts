const CORREO_RE = /^\S+@\S+\.\S+$/;

/** La obligatoriedad viene exclusivamente del contrato de caja. */
export function correoValido(correo: string, obligatorio: boolean): boolean {
  const valor = correo.trim();
  return obligatorio ? CORREO_RE.test(valor) : valor === "" || CORREO_RE.test(valor);
}

/** Datos mínimos que Caja exige antes de permitir el envío por ruta rápida. */
export function perfilRapidoValido({
  nombre,
  correo,
  correoObligatorio,
}: {
  nombre: string | null | undefined;
  correo: string | null | undefined;
  correoObligatorio: boolean;
}) {
  return (nombre?.trim().length ?? 0) > 1 && correoValido(correo ?? "", correoObligatorio);
}
