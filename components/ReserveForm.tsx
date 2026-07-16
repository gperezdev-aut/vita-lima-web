"use client";

import { FormEvent } from "react";
import { site } from "@/content/site";

export function ReserveForm() {
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <form className="reserveForm" onSubmit={submit}>
      <label>Nombre<input name="nombre" required placeholder="Tu nombre" /></label>
      <label>WhatsApp<input name="whatsapp" required placeholder="987 654 321" /></label>
      <label>Sede<select name="sede" required><option value="">Selecciona</option><option>San Borja</option><option>Miraflores</option></select></label>
      <label>Servicio<select name="servicio" required><option value="">Selecciona</option>{site.services.map(s => <option key={s.name}>{s.name}</option>)}</select></label>
      <label>Fecha preferida<input name="fecha" type="date" required /></label>
      <label>Horario preferido<input name="hora" type="time" required /></label>
      <label className="full">Cuéntanos qué necesitas<textarea name="comentario" rows={4} placeholder="Ej. tensión en espalda, regalo, atención para dos..." /></label>
      <label className="check full"><input type="checkbox" required /> Acepto la política de privacidad y el contacto por WhatsApp.</label>
      <button className="button full" type="submit">Solicitar reserva</button>
    </form>
  );
}
