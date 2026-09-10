import type { EnviarFichaPayload } from "../caja/types";

export type SaludFicha = EnviarFichaPayload["salud"];

export function tieneDatosSalud(salud: SaludFicha): boolean {
  return Boolean(
    salud.embarazo ||
      salud.presion ||
      salud.cirugiaReciente ||
      salud.alergias.trim() ||
      salud.zonasEvitar.trim() ||
      salud.notas.trim(),
  );
}

export function consentimientoSaludValido(salud: SaludFicha, consentimiento: boolean): boolean {
  return !tieneDatosSalud(salud) || consentimiento;
}

/** "Ninguna de las anteriores" siempre viaja como salud=false. */
export function consentimientoSaludParaPayload(salud: SaludFicha, consentimiento: boolean): boolean {
  return tieneDatosSalud(salud) && consentimiento;
}
