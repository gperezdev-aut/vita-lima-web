"use client";

import { FormEvent } from "react";
import { trackWhatsappClick } from "./WhatsAppTracking";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function ReserveForm() {
  const { language } = useLanguage();
  const t = translations[language].reserveForm;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const f = t.messageFields;
    const message = [
      t.messageIntro,
      `${f.nombre}: ${data.get("nombre") || ""}`,
      `${f.whatsapp}: ${data.get("whatsapp") || ""}`,
      `${f.sede}: ${data.get("sede") || ""}`,
      `${f.servicio}: ${data.get("servicio") || ""}`,
      `${f.fecha}: ${data.get("fecha") || ""}`,
      `${f.horario}: ${data.get("horario") || ""}`,
      `${f.detalle}: ${data.get("detalle") || ""}`,
    ].join("\n");
    const href = `https://wa.me/51907308415?text=${encodeURIComponent(message)}`;
    trackWhatsappClick(href);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="reserveForm" onSubmit={submit}>
      <div className="formHeader"><span>{t.eyebrow}</span><strong>{t.heading}</strong></div>
      <label>{t.nameLabel}<input name="nombre" placeholder={t.namePlaceholder} required /></label>
      <label>{t.whatsappLabel}<input name="whatsapp" inputMode="tel" placeholder={t.whatsappPlaceholder} required /></label>
      <label>{t.venueLabel}<select name="sede" defaultValue=""><option value="" disabled>{t.venuePlaceholder}</option><option>San Borja</option><option>Miraflores</option></select></label>
      <label>{t.serviceLabel}<select name="servicio" defaultValue=""><option value="" disabled>{t.servicePlaceholder}</option>{t.serviceOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
      <label>{t.dateLabel}<input name="fecha" type="date" /></label>
      <label>{t.timeLabel}<input name="horario" type="time" step={900} /></label>
      <label className="fullField">{t.detailLabel}<textarea name="detalle" rows={3} placeholder={t.detailPlaceholder} /></label>
      <p className="formNote">{t.note}</p>
      <button type="submit">{t.submit}</button>
    </form>
  );
}
