"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

type SiteFooterProps = {
  context?: "home" | "internal";
};

export default function SiteFooter({ context = "home" }: SiteFooterProps) {
  const sectionHref = (section: string) => `${context === "internal" ? "/" : ""}#${section}`;
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="footer">
      <div className="shell footerTop"><p className="eyebrow orangeText">{t.eyebrow}</p><h2>{t.title}</h2><a className="button orangeButton" href={sectionHref("reserva")}>{t.cta}</a></div>
      <div className="shell footerGrid">
        <div className="footerBrand"><Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={190} height={84} /><p>{t.tagline}</p></div>
        <div><h4>{t.exploreHeading}</h4><a href="/servicios">{t.exploreLinks.catalog}</a><a href="/empresas">{t.exploreLinks.empresas}</a><a href="/regalos">{t.exploreLinks.giftCards}</a><a href={sectionHref("sedes")}>{t.exploreLinks.sedes}</a><a href={sectionHref("reserva")}>{t.exploreLinks.reservar}</a></div>
        <div><h4>{t.contactHeading}</h4><a href="https://wa.me/51907308415" target="_blank" rel="noreferrer">+51 907 308 415</a><a href="mailto:info@vitalimaspa.com">info@vitalimaspa.com</a></div>
        <div><h4>{t.infoHeading}</h4><a href="/politica-de-privacidad">{t.infoLinks.privacidad}</a><a href="/terminos-y-condiciones">{t.infoLinks.terminos}</a><a href={sectionHref("preguntas")}>{t.infoLinks.faq}</a></div>
        <div><h4>{t.followHeading}</h4><a href="https://www.instagram.com/vitalima1/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/vitalimaperu/" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.tiktok.com/@vita.lima" target="_blank" rel="noreferrer">TikTok</a><a href="https://www.tripadvisor.com/Search?q=Vita%20Lima%20Spa" target="_blank" rel="noreferrer">Tripadvisor</a></div>
      </div>
      <div className="shell footerBottom">{t.rights}</div>
    </footer>
  );
}
