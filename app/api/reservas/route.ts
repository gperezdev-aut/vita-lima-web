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

/** Límite por IP: 5 envíos cada 10 minutos, los mismos márgenes que fail2ban
 *  en el servidor. Amplios a propósito: una familia tras el mismo router o
 *  alguien que corrige un dato no deben quedar bloqueados. */
const LIMITE_ENVIOS = 5;
const VENTANA_MS = 10 * 60 * 1000;

/** Contador en memoria del proceso. Se pierde al reiniciar el contenedor, y
 *  con varias réplicas cada una llevaría el suyo — pero aquí corre una sola y
 *  el objetivo es frenar un script, no montar un antifraude. */
const envios = new Map<string, number[]>();

function demasiadosEnvios(ip: string) {
  const ahora = Date.now();
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  envios.set(ip, recientes);
  // Limpieza oportunista: sin esto el Map crece sin techo con el tiempo.
  if (envios.size > 5000) {
    for (const [clave, marcas] of envios) {
      if (marcas.every((t) => ahora - t >= VENTANA_MS)) envios.delete(clave);
    }
  }
  return recientes.length > LIMITE_ENVIOS;
}

/** La IP real llega en X-Forwarded-For porque el sitio vive detrás del nginx
 *  del servidor; el primer valor de la lista es el cliente. */
function ipDe(request: Request) {
  const reenviada = request.headers.get("x-forwarded-for");
  if (reenviada) return reenviada.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "desconocida";
}

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

  // Solo se aceptan envíos desde el propio sitio. No es una barrera fuerte
  // —una cabecera se falsifica— pero descarta de una vez el script que
  // encuentra la ruta y la aporrea desde fuera.
  const origen = request.headers.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vitalimaspa.com";
  if (origen && origen !== siteUrl && !origen.startsWith("http://localhost")) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  if (demasiadosEnvios(ipDe(request))) {
    return NextResponse.json({ error: "Demasiados envíos, intenta en unos minutos" }, { status: 429 });
  }

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

  // Campo trampa: está oculto en el formulario, así que una persona nunca lo
  // rellena y un robot que completa todo lo que encuentra, sí. Se responde 204
  // —como un envío correcto— para no enseñarle al robot qué lo delató.
  if (normalizar(datos?.["apellido2"])) {
    return new NextResponse(null, { status: 204 });
  }

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
