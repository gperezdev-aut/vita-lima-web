import { getStubFicha, postStubFicha } from "./stub";
import type { CajaError, EnviarFichaPayload, EnviarFichaResult, FichaResult } from "./types";

/**
 * Único punto de contacto con caja. Se llama siempre desde el servidor
 * (route handler o server action) — el secreto en CAJA_API_SECRET no puede
 * llegar al navegador. Sin CAJA_API_URL definida, cae al stub local: así la
 * página se construye y se revisa entera antes de que caja exista.
 */

const TIMEOUT_MS = 8000;

function cajaHeaders(): Record<string, string> {
  const secret = process.env.CAJA_API_SECRET;
  // El header se manda tal cual: caja lo lee en minúsculas (x-caja-secret),
  // que es como llegan las cabeceras HTTP de todos modos.
  return secret ? { "X-Caja-Secret": secret } : {};
}

async function leerError(response: Response): Promise<CajaError> {
  try {
    const body = (await response.json()) as unknown;
    if (body && typeof body === "object" && typeof (body as Record<string, unknown>).error === "string") {
      return body as CajaError;
    }
  } catch {
    // Sin cuerpo o cuerpo no-JSON: se usa el código genérico de abajo.
  }
  return { error: "caja_no_disponible" };
}

export async function getFicha(token: string): Promise<FichaResult> {
  const apiUrl = process.env.CAJA_API_URL;
  if (!apiUrl) return getStubFicha(token);

  try {
    const response = await fetch(`${apiUrl}/api/publico/ficha/${encodeURIComponent(token)}`, {
      headers: cajaHeaders(),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!response.ok) return { ok: false, status: response.status, error: await leerError(response) };
    return { ok: true, data: await response.json() };
  } catch (error) {
    console.error("[ficha] fallo al pedir la ficha a caja:", error);
    return { ok: false, status: 502, error: { error: "caja_no_disponible" } };
  }
}

export async function enviarFicha(token: string, payload: EnviarFichaPayload): Promise<EnviarFichaResult> {
  const apiUrl = process.env.CAJA_API_URL;
  if (!apiUrl) return postStubFicha(token, payload);

  try {
    const response = await fetch(`${apiUrl}/api/publico/ficha/${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cajaHeaders() },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!response.ok) return { ok: false, status: response.status, error: await leerError(response) };
    return { ok: true, data: await response.json() };
  } catch (error) {
    console.error("[ficha] fallo al mandar la ficha a caja:", error);
    return { ok: false, status: 502, error: { error: "caja_no_disponible" } };
  }
}
