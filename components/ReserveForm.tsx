"use client";

import { FormEvent } from "react";

export default function ReserveForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hola Vita Lima, quisiera recibir orientación para reservar:",
      `Nombre: ${data.get("nombre") || ""}`,
      `WhatsApp: ${data.get("whatsapp") || ""}`,
      `Sede: ${data.get("sede") || ""}`,
      `Servicio: ${data.get("servicio") || ""}`,
      `Fecha: ${data.get("fecha") || ""}`,
      `Horario: ${data.get("horario") || ""}`,
      `Qué necesito: ${data.get("detalle") || ""}`,
    ].join("\n");
    window.open(`https://wa.me/51907308415?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="reserveForm" onSubmit={submit}>
      <div className="formHeader"><span>Solicitud privada</span><strong>Te responderemos personalmente</strong></div>
      <label>Nombre<input name="nombre" placeholder="Tu nombre" required /></label>
      <label>WhatsApp<input name="whatsapp" inputMode="tel" placeholder="987 654 321" required /></label>
      <label>Sede<select name="sede" defaultValue=""><option value="" disabled>Selecciona una sede</option><option>San Borja</option><option>Miraflores</option></select></label>
      <label>Experiencia<select name="servicio" defaultValue=""><option value="" disabled>Selecciona una experiencia</option><option>Necesito orientación</option><option>Relax Vital</option><option>Espalda Libre</option><option>Alivio Integral</option><option>Terapia Vita</option><option>Balance Plus</option><option>Experiencia para dos</option><option>Gift Card</option></select></label>
      <label>Fecha preferida<input name="fecha" type="date" /></label>
      <label>Horario preferido<input name="horario" type="time" /></label>
      <label className="fullField">¿Qué te gustaría aliviar o vivir?<textarea name="detalle" rows={3} placeholder="Ej. tensión en espalda, una experiencia para dos, un regalo especial..." /></label>
      <p className="formNote">El envío no confirma automáticamente la reserva. Te contactaremos por WhatsApp para validar disponibilidad.</p>
      <button type="submit">Hablar con concierge →</button>
    </form>
  );
}
