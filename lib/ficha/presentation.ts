/**
 * Corrige únicamente la copia visible cuando una cadena UTF-8 fue
 * interpretada accidentalmente como Windows-1252 (por ejemplo,
 * "ðŸŒŸ Deluxe" en lugar de "🌟 Deluxe"). La cadena recibida de Caja no se
 * modifica y los nombres que no presentan señales de mojibake se conservan.
 */

const WINDOWS_1252_BYTES = new Map<number, number>([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84],
  [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88],
  [0x2030, 0x89], [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c],
  [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93],
  [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b],
  [0x0153, 0x9c], [0x017e, 0x9e], [0x0178, 0x9f],
]);

const SENAL_MOJIBAKE = /(?:Ã.|Â.|â.|ð.|ï¿½|�)/gu;

function puntajeMojibake(texto: string): number {
  return texto.match(SENAL_MOJIBAKE)?.length ?? 0;
}

function bytesWindows1252(texto: string): Uint8Array | null {
  const bytes: number[] = [];
  for (const caracter of texto) {
    const codigo = caracter.codePointAt(0)!;
    if (codigo <= 0xff) {
      bytes.push(codigo);
      continue;
    }
    const byte = WINDOWS_1252_BYTES.get(codigo);
    if (byte === undefined) return null;
    bytes.push(byte);
  }
  return Uint8Array.from(bytes);
}

export function nombreServicioVisible(nombreCanonico: string): string {
  const puntajeOriginal = puntajeMojibake(nombreCanonico);
  if (puntajeOriginal === 0) return nombreCanonico;

  const bytes = bytesWindows1252(nombreCanonico);
  if (!bytes) return nombreCanonico;

  try {
    const reparado = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return puntajeMojibake(reparado) < puntajeOriginal ? reparado : nombreCanonico;
  } catch {
    return nombreCanonico;
  }
}

export function nombresServiciosVisibles(servicios: Array<{ nombre: string }>): string {
  return servicios.map((servicio) => nombreServicioVisible(servicio.nombre)).join(", ");
}
