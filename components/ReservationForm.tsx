"use client";

import { FormEvent, useState } from "react";
import { services, whatsappNumber } from "@/content/site";

type Status = "idle" | "sending" | "ok" | "error";

export default function ReservationForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("No se pudo enviar");
      setStatus("ok");
      const message = `Hola Vita Lima, soy ${data.nombre}. Deseo reservar ${data.servicio} en ${data.sede}. Fecha preferida: ${data.fecha || "por coordinar"}.`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="reservation-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Nombre<input name="nombre" required placeholder="Tu nombre" /></label>
        <label>WhatsApp<input name="whatsapp" required inputMode="tel" placeholder="987 654 321" /></label>
        <label>Sede<select name="sede" required defaultValue=""><option value="" disabled>Selecciona</option><option>San Borja</option><option>Miraflores</option><option>Domicilio</option></select></label>
        <label>Servicio<select name="servicio" required defaultValue=""><option value="" disabled>Selecciona</option>{services.map((s)=><option key={s.name}>{s.name}</option>)}<option>Gift Card</option><option>Atención para parejas</option><option>Servicio corporativo</option></select></label>
        <label>Fecha preferida<input type="date" name="fecha" /></label>
        <label>Horario preferido<input type="time" name="hora" /></label>
      </div>
      <label>Cuéntanos qué necesitas<textarea name="mensaje" rows={4} placeholder="Ej. tensión en espalda, regalo, atención para dos..." /></label>
      <input className="honeypot" name="empresa_web" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="consent"><input type="checkbox" required /> Acepto la política de privacidad y el contacto por WhatsApp.</label>
      <button className="button primary wide" disabled={status === "sending"}>{status === "sending" ? "Enviando..." : "Solicitar reserva"}</button>
      {status === "ok" && <p className="form-message success">Solicitud lista. Abrimos WhatsApp para terminar la coordinación.</p>}
      {status === "error" && <p className="form-message error">No pudimos enviarla. Escríbenos directamente por WhatsApp.</p>}
    </form>
  );
}
