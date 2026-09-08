import type { Idioma } from "@/lib/caja/types";

function localeDe(idioma: Idioma) {
  return idioma === "es" ? "es-PE" : "en-US";
}

/** El ICU de Node (SSR) y el del navegador (hidratación) no siempre eligen
 *  el mismo espacio invisible alrededor de "p. m." (normal vs. angosto de
 *  no separación,  ); sin normalizar, React ve dos textos distintos y
 *  falla la hidratación. Se colapsa cualquier espacio en blanco a uno solo
 *  normal, igual en los dos lados. */
function normalizarEspacios(texto: string): string {
  return texto.replace(/\s+/g, " ");
}

/** "2026-09-13" → "sábado 13 de setiembre" / "Saturday, September 13". Se
 *  fuerza UTC porque la fecha es un día calendario sin hora, no un instante. */
export function formatearFecha(fecha: string, idioma: Idioma): string {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  const valor = new Date(Date.UTC(anio, mes - 1, dia));
  return normalizarEspacios(
    new Intl.DateTimeFormat(localeDe(idioma), {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(valor),
  );
}

/** "16:00" → "4:00 p. m." / "4:00 PM". */
export function formatearHora(hora: string, idioma: Idioma): string {
  const [horas, minutos] = hora.split(":").map(Number);
  const valor = new Date(Date.UTC(2000, 0, 1, horas, minutos));
  return normalizarEspacios(
    new Intl.DateTimeFormat(localeDe(idioma), {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    }).format(valor),
  );
}

export function formatearMoneda(monto: number, moneda: string): string {
  const simbolo = moneda === "PEN" ? "S/" : `${moneda} `;
  const valor = Number.isInteger(monto) ? String(monto) : monto.toFixed(2);
  return `${simbolo}${valor}`;
}
