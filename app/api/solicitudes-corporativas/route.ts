import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const LIMIT = 5, WINDOW = 10 * 60 * 1000, MAX = 500;
const attempts = new Map<string, number[]>();
const fields = ["modalidad", "empresa", "ruc", "nombre", "cargo", "whatsapp", "correo", "colaboradores", "ubicacion", "fecha", "horario", "comentarios"] as const;
function clean(value: unknown) { return typeof value === "string" ? value.replace(/[<>]/g, "").trim().slice(0, MAX) : ""; }
function clientIp(request: Request) { return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"; }
function blocked(ip: string) { const now = Date.now(), recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW); recent.push(now); attempts.set(ip, recent); return recent.length > LIMIT; }
function escapeHtml(value: string) { return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
export async function POST(request: Request) {
  const origin = request.headers.get("origin"); const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vitalimaspa.com";
  if (origin && origin !== siteUrl && !origin.startsWith("http://localhost")) return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  if (blocked(clientIp(request))) return NextResponse.json({ error: "Demasiados envíos, intenta en unos minutos." }, { status: 429 });
  let body: Record<string, unknown>; try { body = await request.json(); } catch { return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 }); }
  if (clean(body.website)) return new NextResponse(null, { status: 204 });
  const lead = Object.fromEntries(fields.map((field) => [field, clean(body[field])])) as Record<(typeof fields)[number], string>;
  if (!lead.modalidad || !lead.empresa || !lead.nombre || !lead.cargo || !lead.whatsapp || !lead.correo || !lead.colaboradores || !lead.ubicacion || !lead.fecha || !lead.horario || clean(body.consentimiento) !== "si") return NextResponse.json({ error: "Completa los campos obligatorios y autoriza el contacto." }, { status: 400 });
  if (!/[0-9+ ()-]{7,25}/.test(lead.whatsapp) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.correo) || !["silla", "camilla", "ambas"].includes(lead.modalidad) || !/^\d+$/.test(lead.colaboradores)) return NextResponse.json({ error: "Revisa el correo, WhatsApp y cantidad de colaboradores." }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY, to = process.env.CORPORATE_LEADS_TO || "info@vitalimaspa.com", from = process.env.CORPORATE_LEADS_FROM;
  if (!apiKey || !from) { console.error("[corporate-leads] Resend no está configurado"); return NextResponse.json({ error: "No pudimos enviar tu solicitud. Inténtalo nuevamente más tarde." }, { status: 503 }); }
  const labels: Record<string, string> = { modalidad: "Modalidad", empresa: "Empresa", ruc: "RUC", nombre: "Contacto", cargo: "Cargo", whatsapp: "WhatsApp", correo: "Correo", colaboradores: "Colaboradores", ubicacion: "Distrito o dirección", fecha: "Fecha tentativa", horario: "Horario tentativo", comentarios: "Comentarios" };
  const html = `<h2>Nueva solicitud corporativa</h2><table>${fields.map((key) => `<tr><th align="left">${labels[key]}</th><td>${escapeHtml(lead[key] || "—")}</td></tr>`).join("")}</table>`;
  try { const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], subject: `Nueva solicitud corporativa — ${lead.empresa}`, html, reply_to: lead.correo }), signal: AbortSignal.timeout(8000) }); if (!response.ok) { console.error(`[corporate-leads] Resend respondió ${response.status}`); return NextResponse.json({ error: "No pudimos enviar tu solicitud. Inténtalo nuevamente." }, { status: 502 }); } return new NextResponse(null, { status: 204 }); } catch (error) { console.error("[corporate-leads] Error al enviar:", error); return NextResponse.json({ error: "No pudimos enviar tu solicitud. Inténtalo nuevamente." }, { status: 502 }); }
}
