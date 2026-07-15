import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  whatsapp: z.string().trim().min(7).max(25),
  location: z.enum(["San Borja", "Miraflores", "Domicilio"]),
  service: z.string().trim().min(2).max(80),
  date: z.string().trim().min(8).max(20),
  time: z.string().trim().min(4).max(10),
  notes: z.string().trim().max(800).optional().default(""),
  privacy: z.literal("accepted"),
  website: z.string().max(0).optional().default(""),
});

export async function POST(request: Request) {
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ message: "Solicitud inválida." }, { status: 400 }); }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ message: "Revisa los datos obligatorios del formulario." }, { status: 400 });

  const webhookUrl = process.env.N8N_RESERVAS_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_RESERVAS_WEBHOOK_SECRET;

  // Modo inicial: el diseño funciona aunque n8n todavía no esté conectado.
  if (!webhookUrl) {
    return NextResponse.json({ message: "Solicitud validada. En la siguiente etapa conectaremos el envío automático; por ahora contáctanos por WhatsApp para confirmar." });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(webhookSecret ? { "x-vita-secret": webhookSecret } : {}) },
      body: JSON.stringify({ ...parsed.data, source: "VITA_LIMA_WEB", receivedAt: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Webhook error");
    return NextResponse.json({ message: "¡Listo! Recibimos tu solicitud y te contactaremos para confirmar disponibilidad." });
  } catch {
    return NextResponse.json({ message: "No pudimos procesar la solicitud ahora. Escríbenos por WhatsApp para ayudarte." }, { status: 502 });
  }
}
