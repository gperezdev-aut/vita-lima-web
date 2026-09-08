const CORREO_RE = /^\S+@\S+\.\S+$/;

/** La obligatoriedad viene exclusivamente del contrato de caja. */
export function correoValido(correo: string, obligatorio: boolean): boolean {
  const valor = correo.trim();
  return obligatorio ? CORREO_RE.test(valor) : valor === "" || CORREO_RE.test(valor);
}
