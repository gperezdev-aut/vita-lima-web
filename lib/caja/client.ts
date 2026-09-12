import "server-only";

import { resolveCajaConfig } from "./config";
import { getStubFicha, identificarStubFicha, postStubFicha } from "./stub";
import type {
  CajaError,
  EnviarFichaPayload,
  EnviarFichaResult,
  FichaResult,
  IdentificarFichaResult,
} from "./types";
import { errorContratoIncompatible, validarFichaGet, validarFichaPost, validarFichaRecurrente } from "./validation";

/**
 * Único punto de contacto con caja. Se llama siempre desde el servidor
 * (route handler o server action) — el secreto en CAJA_API_SECRET no puede
 * llegar al navegador. El stub solo se habilita de forma explícita fuera de
 * producción con CAJA_API_STUB_ENABLED=true.
 */

const TIMEOUT_MS = 8000;

function cajaHeaders(secret: string, protectionBypass?: string): Record<string, string> {
  // El header se manda tal cual: caja lo lee en minúsculas (x-caja-secret),
  // que es como llegan las cabeceras HTTP de todos modos.
  return {
    "X-Caja-Secret": secret,
    // Vercel solo evalúa este secreto antes de alcanzar Caja. Es opcional para
    // que los entornos sin Deployment Protection conserven el flujo actual.
    ...(protectionBypass ? { "x-vercel-protection-bypass": protectionBypass } : {}),
  };
}

function protectionBypass(): string | undefined {
  return process.env.CAJA_VERCEL_PROTECTION_BYPASS?.trim() || undefined;
}

function configurationError(missing: string[]): Extract<FichaResult, { ok: false }> {
  return {
    ok: false,
    status: 500,
    error: {
      error: "configuracion",
      mensaje: `Falta configuración del servidor: ${missing.join(", ")}.`,
    },
  };
}

function configurationErrorIdentificar(missing: string[]): Extract<IdentificarFichaResult, { ok: false }> {
  return {
    ok: false,
    status: 500,
    error: {
      error: "configuracion",
      mensaje: `Falta configuración del servidor: ${missing.join(", ")}.`,
    },
  };
}

function contratoIncompatible(mensaje: string): Extract<FichaResult, { ok: false }> {
  return {
    ok: false,
    status: 502,
    error: errorContratoIncompatible(mensaje),
  };
}

function contratoIncompatibleIdentificar(mensaje: string): Extract<IdentificarFichaResult, { ok: false }> {
  return { ok: false, status: 502, error: errorContratoIncompatible(mensaje) };
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
  const config = resolveCajaConfig(process.env);
  if (config.mode === "stub") return getStubFicha(token);
  if (config.mode === "error") return configurationError(config.missing);

  try {
    const response = await fetch(`${config.apiUrl}/api/publico/ficha/${encodeURIComponent(token)}`, {
      headers: cajaHeaders(config.secret, protectionBypass()),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!response.ok) return { ok: false, status: response.status, error: await leerError(response) };
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      return contratoIncompatible("Caja respondió un GET 200 que no contiene JSON válido.");
    }
    const validado = validarFichaGet(body);
    if (validado.ok === false) return contratoIncompatible(validado.motivo);
    return { ok: true, data: validado.data };
  } catch {
    // No registrar el error de fetch: puede incluir la URL con el token.
    console.error("[ficha] fallo al pedir la ficha a caja");
    return { ok: false, status: 502, error: { error: "caja_no_disponible" } };
  }
}

/**
 * Identificación deliberadamente server-side: el secreto solo se lee en esta
 * capa y nunca se pasa a FichaWizard ni al bundle del navegador.
 */
export async function identificarFicha(
  token: string,
  telefono: { crudo: string; pais: string }
): Promise<IdentificarFichaResult> {
  const config = resolveCajaConfig(process.env);
  if (config.mode === "stub") return identificarStubFicha(token, telefono);
  if (config.mode === "error") return configurationErrorIdentificar(config.missing);

  try {
    const response = await fetch(`${config.apiUrl}/api/publico/ficha/${encodeURIComponent(token)}/identificar`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cajaHeaders(config.secret, protectionBypass()) },
      body: JSON.stringify({ telefono }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!response.ok) return { ok: false, status: response.status, error: await leerError(response) };
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      return contratoIncompatibleIdentificar("Caja respondió una identificación 200 sin JSON válido.");
    }
    const validado = validarFichaRecurrente(body);
    if (validado.ok === false) return contratoIncompatibleIdentificar(validado.motivo);
    return { ok: true, data: validado.data };
  } catch {
    return { ok: false, status: 502, error: { error: "caja_no_disponible" } };
  }
}

export async function enviarFicha(token: string, payload: EnviarFichaPayload): Promise<EnviarFichaResult> {
  const config = resolveCajaConfig(process.env);
  if (config.mode === "stub") return postStubFicha(token, payload);
  if (config.mode === "error") return configurationError(config.missing);

  try {
    const response = await fetch(`${config.apiUrl}/api/publico/ficha/${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cajaHeaders(config.secret, protectionBypass()) },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!response.ok) return { ok: false, status: response.status, error: await leerError(response) };
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      return contratoIncompatible("Caja respondió un POST 200 que no contiene JSON válido.");
    }
    const validado = validarFichaPost(body);
    if (validado.ok === false) return contratoIncompatible(validado.motivo);
    return { ok: true, data: validado.data };
  } catch {
    // No registrar el error de fetch: puede incluir la URL con el token.
    console.error("[ficha] fallo al mandar la ficha a caja");
    return { ok: false, status: 502, error: { error: "caja_no_disponible" } };
  }
}
