"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function WhatsAppButton() {
  const { language } = useLanguage();
  const t = translations[language].whatsappButton;
  const href = `https://wa.me/51907308415?text=${encodeURIComponent(t.message)}`;

  return <a className="floatingWhatsapp" href={href} target="_blank" rel="noreferrer" aria-label={t.aria}><span>◉</span><strong>{t.label}</strong></a>;
}
