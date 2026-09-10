export type CajaEnvironment = {
  NODE_ENV?: string;
  CAJA_API_URL?: string;
  CAJA_API_SECRET?: string;
  CAJA_API_STUB_ENABLED?: string;
};

export type CajaConfig =
  | { mode: "api"; apiUrl: string; secret: string }
  | { mode: "stub" }
  | { mode: "error"; missing: ("CAJA_API_URL" | "CAJA_API_SECRET")[] };

/**
 * El stub requiere una activación deliberada y nunca está disponible en
 * producción ni staging. Para la API real, URL y secreto forman una sola configuración:
 * no se intenta una llamada incompleta ni se degrada silenciosamente al stub.
 */
export function resolveCajaConfig(environment: CajaEnvironment): CajaConfig {
  const nodeEnv = environment.NODE_ENV ?? "development";
  const stubEnabled = environment.CAJA_API_STUB_ENABLED === "true";

  if (stubEnabled && (nodeEnv === "development" || nodeEnv === "test")) return { mode: "stub" };

  const apiUrl = environment.CAJA_API_URL?.trim();
  const secret = environment.CAJA_API_SECRET?.trim();
  const missing: ("CAJA_API_URL" | "CAJA_API_SECRET")[] = [];

  if (!apiUrl) missing.push("CAJA_API_URL");
  if (!secret) missing.push("CAJA_API_SECRET");
  if (missing.length) return { mode: "error", missing };

  return { mode: "api", apiUrl: apiUrl.replace(/\/$/, ""), secret };
}
