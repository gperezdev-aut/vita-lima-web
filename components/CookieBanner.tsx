"use client";

import Link from "next/link";
import { useConsent } from "@/components/ConsentContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

/**
 * Banner de consentimiento. Solo aparece cuando el visitante todavía no
 * eligió, y nunca antes de hidratar (así no aparece y desaparece en el
 * primer render). No bloquea la navegación: el sitio funciona igual si se
 * rechaza, solo que sin analítica ni mapas embebidos automáticos.
 */
export default function CookieBanner() {
  const { consent, hydrated, accept, reject } = useConsent();
  const { language } = useLanguage();
  const t = translations[language].consent;

  if (!hydrated || consent !== "unknown") return null;

  return (
    <div className="cookieBanner" role="dialog" aria-label={t.ariaLabel} aria-live="polite">
      <div className="cookieBannerCopy">
        <strong>{t.title}</strong>
        <p>{t.text}</p>
        <Link href="/politica-de-privacidad">{t.policyLink}</Link>
      </div>
      <div className="cookieBannerActions">
        <button type="button" className="cookieReject" onClick={reject}>
          {t.reject}
        </button>
        <button type="button" className="cookieAccept" onClick={accept}>
          {t.accept}
        </button>
      </div>
    </div>
  );
}
