"use server";

import { enviarFicha, identificarFicha } from "@/lib/caja/client";
import type { EnviarFichaPayload, EnviarFichaResult, IdentificarFichaResult } from "@/lib/caja/types";

/**
 * Único puente entre el wizard (cliente) y caja. Vive en el servidor porque
 * enviarFicha lee CAJA_API_SECRET del entorno, y ese secreto no puede llegar
 * al navegador.
 */
export async function enviarFichaAction(token: string, payload: EnviarFichaPayload): Promise<EnviarFichaResult> {
  return enviarFicha(token, payload);
}

export async function identificarFichaAction(
  token: string,
  telefono: { crudo: string; pais: string }
): Promise<IdentificarFichaResult> {
  return identificarFicha(token, telefono);
}
