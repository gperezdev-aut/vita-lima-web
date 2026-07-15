import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().trim().min(2).max(80),
  whatsapp: z.string().trim().min(7).max(30),
  sede: z.string().trim().min(2).max(50),
  servicio: z.string().trim().min(2).max(100),
  fecha: z.string().max(20).optional().default(""),
  hora: z.string().max(20).optional().default(""),
  mensaje: z.string().trim().max(600).optional().default(""),
  empresa_web: z.string().max(0).optional().default(""),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  const webhook = process.env.N8N_RESERVAS_WEBHOOK_URL;
  const secret = process.env.N8N_RESERVAS_WEBHOOK_SECRET;

  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(secret ? { "x-vita-secret": secret } : {}) },
      body: JSON.stringify({ ...parsed.data, origen: "WEB_PUBLICA", recibido_en: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    }).catch(() => null);
    if (!response?.ok) return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
