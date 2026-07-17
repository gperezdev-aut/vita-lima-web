"use client";

import { FormEvent, useState } from "react";
import { site } from "@/content/site";

export function ReserveForm() {
  const [sending, setSending] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const data = new FormData(e.currentTarget);
    const message = [
      "Hola Vita Lima, quisiera solicitar una reserva.",
      `Nombre: ${data.get("nombre")}`,
      `WhatsApp: ${data.get("whatsapp")}`,
      `Sede: ${data.get("sede")}`,
      `Servicio: ${data.get("servicio")}`,
      `Fecha: ${data.get("fecha")}`,
      `Hora: ${data.get("hora")}`,
      `Comentario: ${data.get("comentario") || "-"}`
    ].join("\n");
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setTimeout(() => setSending(false), 800);
  }

  return (
    <form className="reserveForm" onSubmit={submit}>
      <label>Nombre<input name="nombre" required autoComplete="name" placeholder="Tu nombre" /></label>
      <label>WhatsApp<input name="whatsapp" required inputMode="tel" autoComplete="tel" placeholder="987 654 321" /></label>
      <label>Sede<select name="sede" required defaultValue=""><option value="" disabled>Selecciona una sede</option><option>San Borja</option><option>Miraflores</option></select></label>
      <label>Servicio<select name="servicio" required defaultValue=""><option value="" disabled>Selecciona un servicio</option>{site.services.map(s => <option key={s.name}>{s.name}</option>)}</select></label>
      <label>Fecha preferida<input name="fecha" type="date" required /></label>
      <label>Horario preferido<input name="hora" type="time" required /></label>
      <label className="full">Cuéntanos qué necesitas<textarea name="comentario" rows={4} placeholder="Ej. tensión en espalda, regalo o atención para dos..." /></label>
      <label className="check full"><input type="checkbox" required /><span>Acepto la <a href="/politica-de-privacidad">política de privacidad</a> y el contacto por WhatsApp.</span></label>
      <button className="button full formSubmit" type="submit" disabled={sending}>{sending ? "Abriendo WhatsApp..." : "Continuar por WhatsApp →"}</button>
      <p className="formHint full">No se realiza ningún cobro desde este formulario.</p>
    </form>
  );
}
