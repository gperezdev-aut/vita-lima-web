import { NextResponse } from "next/server";

/**
 * Recoge el lead del formulario de reserva y lo reenvía al webhook de n8n.
 *
 * Antes de esto, lo que el visitante escribía solo existía dentro del texto
 * de WhatsApp: si no llegaba a pulsar enviar allí, el lead se perdía entero
 * —nombre, teléfono, email, sede, servicio y fecha incluidos—.
 *
 * El endpoint vive en el servidor y no en el navegador porque el secreto del
 * webhook no puede acabar en el bundle: por eso las dos variables se leen sin
 * el prefijo NEXT_PUBLIC_. Al ser variables de ejecución (no de build), van en
 * `environment:` del docker-compose y no en `args:`, al revés que las
 * NEXT_PUBLIC_* que el Dockerfile necesita durante `npm run build`.
 */

// Se fuerza runtime nodejs (y no edge) porque el secreto se lee del entorno
// del servidor y la ruta no debe cachearse nunca.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Tope por campo. El endpoint es público: sin esto sería un túnel abierto hacia n8n. */
const MAX_LARGO_CAMPO = 500;
const TIMEOUT_MS = 5000;

const CAMPOS = ["nombre", "whatsapp", "email", "sede", "servicio", "fecha", "horario", "detalle", "idioma"] as const;

function normalizar(valor: unknown) {
  if (typeof valor !== "string") return "";
  return valor.trim().slice(0, MAX_LARGO_CAMPO);
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_RESERVAS_WEBHOOK_URL;
  const secret = process.env.N8N_RESERVAS_WEBHOOK_SECRET;

  // Sin webhook configurado el sitio funciona exactamente como antes: el
  // formulario sigue abriendo WhatsApp y aquí no pasa nada. Así ningún
  // entorno (local, staging) queda roto por no tener las variables.
  if (!webhookUrl) return new NextResponse(null, { status: 204 });

  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const datos = cuerpo as Record<string, unknown>;
  const lead = Object.fromEntries(CAMPOS.map((campo) => [campo, normalizar(datos?.[campo])])) as Record<
    (typeof CAMPOS)[number],
    string
  >;

  // Mínimos para que el lead sirva de algo: sin forma de contactar, no hay lead.
  if (!lead.nombre || !lead.whatsapp) {
    return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
  }

  try {
    const respuesta = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // El secreto viaja en cabecera, nunca en la URL ni en el cuerpo:
        // las URLs acaban en logs de proxies y de acceso.
        ...(secret ? { "X-Vita-Secret": secret } : {}),
      },
      body: JSON.stringify({
        origen: "web-formulario-reserva",
        recibidoEn: new Date().toISOString(),
        ...lead,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!respuesta.ok) {
      console.error(`[reservas] n8n respondió ${respuesta.status}`);
      // Genérico a propósito: el estado y la URL del webhook no son asunto
      // del navegador.
      return NextResponse.json({ error: "No se pudo registrar la reserva" }, { status: 502 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[reservas] fallo al contactar el webhook:", error);
    return NextResponse.json({ error: "No se pudo registrar la reserva" }, { status: 502 });
  }
}
