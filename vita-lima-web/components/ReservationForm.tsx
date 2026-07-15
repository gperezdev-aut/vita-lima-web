"use client";

import { FormEvent, useState } from "react";
import { site } from "@/content/site";

type State = "idle" | "sending" | "success" | "error";

export function ReservationForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "No se pudo enviar la solicitud.");
      setState("success");
      setMessage(data.message);
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Ocurrió un error.");
    }
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="field-grid">
        <label>Nombre<input name="name" required minLength={2} placeholder="Tu nombre" /></label>
        <label>WhatsApp<input name="whatsapp" required inputMode="tel" placeholder="987 654 321" /></label>
        <label>Sede<select name="location" required defaultValue=""><option value="" disabled>Selecciona</option><option>San Borja</option><option>Miraflores</option><option>Domicilio</option></select></label>
        <label>Experiencia<select name="service" required defaultValue=""><option value="" disabled>Selecciona</option><option>Relax Vital</option><option>Espalda Libre</option><option>Alivio Integral</option><option>Terapia Vita</option><option>Balance Plus</option><option>Parejas</option><option>Gift Card</option><option>Corporativo</option></select></label>
        <label>Fecha deseada<input name="date" type="date" required /></label>
        <label>Horario preferido<input name="time" type="time" required /></label>
      </div>
      <label>Cuéntanos qué necesitas<textarea name="notes" rows={4} placeholder="Ej. Somos dos personas, prefiero presión media…" /></label>
      <label className="honeypot" aria-hidden="true">Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="check"><input name="privacy" type="checkbox" value="accepted" required /> Acepto el tratamiento de mis datos para gestionar esta solicitud.</label>
      <button className="button primary wide" type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando…" : "Solicitar reserva"}</button>
      {message && <p className={`form-message ${state}`}>{message}</p>}
      <p className="form-help">También puedes escribir al <a href={`https://wa.me/${site.whatsappDigits}`} target="_blank" rel="noreferrer">WhatsApp {site.whatsappDisplay}</a>.</p>
    </form>
  );
}
