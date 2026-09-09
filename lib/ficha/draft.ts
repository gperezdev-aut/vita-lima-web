import type { Idioma } from "@/lib/caja/types";

/**
 * Borrador local de /cita/[token]. Clave por token (vita:ficha:<token>): una
 * pareja que reserva un paquete para dos puede abrir dos fichas en el mismo
 * celular y no deben mezclarse. Vence a las 24 horas y conserva únicamente
 * preferencias no sensibles: nunca teléfono, perfil, salud, consentimiento ni
 * datos de comprobante recuperados desde Caja.
 */

export type FichaDraft = {
  paso: number;
  idioma: Idioma;
  pais: string;
  codigoCupon: string;
};

const VIGENCIA_MS = 24 * 60 * 60 * 1000;

function clave(token: string) {
  return `vita:ficha:${token}`;
}

export function leerBorrador(token: string): FichaDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const crudo = window.localStorage.getItem(clave(token));
    if (!crudo) return null;

    const datos = JSON.parse(crudo) as FichaDraft & { guardadoEn: number };
    if (!datos.guardadoEn || Date.now() - datos.guardadoEn > VIGENCIA_MS) {
      window.localStorage.removeItem(clave(token));
      return null;
    }
    return datos;
  } catch {
    return null;
  }
}

export function guardarBorrador(token: string, datos: FichaDraft) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(clave(token), JSON.stringify({ ...datos, guardadoEn: Date.now() }));
  } catch {
    // Almacenamiento lleno o bloqueado (modo privado): perder el borrador no rompe el envío.
  }
}

export function borrarBorrador(token: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(clave(token));
  } catch {
    // idem
  }
}
