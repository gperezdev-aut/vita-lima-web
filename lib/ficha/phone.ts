import { AsYouType, getCountries, isValidPhoneNumber, type CountryCode } from "libphonenumber-js";

export type { CountryCode };

/**
 * Perú primero (país por defecto), luego los orígenes turísticos más
 * comunes de Vita Lima, y el resto en orden alfabético según el idioma
 * activo. Un patrón peruano-solamente le impediría reservar a un turista.
 */
const DESTACADOS: CountryCode[] = ["PE", "US", "ES", "CL", "MX", "AR", "CO", "BR", "CA", "GB", "FR", "IT", "DE"];

export function paisesOrdenados(idioma: "es" | "en"): { code: CountryCode; name: string }[] {
  const nombres = new Intl.DisplayNames([idioma], { type: "region" });
  const nombrar = (code: CountryCode) => nombres.of(code) ?? code;

  const todos = getCountries();
  const destacados = DESTACADOS.filter((code) => todos.includes(code));
  const resto = todos.filter((code) => !DESTACADOS.includes(code)).sort((a, b) => nombrar(a).localeCompare(nombrar(b)));

  return [...destacados, ...resto].map((code) => ({ code, name: nombrar(code) }));
}

export function telefonoValido(crudo: string, pais: CountryCode): boolean {
  if (!crudo.trim()) return false;
  try {
    return isValidPhoneNumber(crudo, pais);
  } catch {
    return false;
  }
}

export function formatearMientrasEscribe(crudo: string, pais: CountryCode): string {
  try {
    return new AsYouType(pais).input(crudo);
  } catch {
    return crudo;
  }
}
