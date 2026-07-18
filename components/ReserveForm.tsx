"use client";

import { FormEvent } from "react";

export default function ReserveForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hola Vita Lima, quisiera reservar:",
      `Nombre: ${data.get("nombre") || ""}`,
      `WhatsApp: ${data.get("whatsapp") || ""}`,
      `Sede: ${data.get("sede") || ""}`,
      `Servicio: ${data.get("servicio") || ""}`,
      `Fecha: ${data.get("fecha") || ""}`,
      `Horario: ${data.get("horario") || ""}`,
      `Necesidad: ${data.get("detalle") || ""}`,
    ].join("\n");
    window.open(`https://wa.me/51907308415?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="reserveForm" onSubmit={submit}>
      <label>Nombre<input name="nombre" placeholder="Tu nombre" required /></label>
      <label>WhatsApp<input name="whatsapp" inputMode="tel" placeholder="987 654 321" required /></label>
      <label>Sede<select name="sede" defaultValue=""><option value="" disabled>Selecciona una sede</option><option>San Borja</option><option>Miraflores</option></select></label>
      <label>Servicio<select name="servicio" defaultValue=""><option value="" disabled>Selecciona un servicio</option><option>Relax Vital</option><option>Espalda Libre</option><option>Alivio Integral</option><option>Terapia Vita</option><option>Balance Plus</option></select></label>
      <label>Fecha preferida<input name="fecha" type="date" /></label>
      <label>Horario preferido<input name="horario" type="time" /></label>
      <label className="fullField">Cuéntanos qué necesitas<textarea name="detalle" rows={2} placeholder="Ej. tensión en espalda, regalo, pareja..." /></label>
      <p className="formNote">Tu información se usa solo para coordinar tu solicitud.</p>
      <button type="submit">Continuar por WhatsApp →</button>
    </form>
  );
}
