"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].header;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`siteHeader ${scrolled ? "siteHeaderScrolled" : ""}`}>
      <a className="brand" href="#inicio" aria-label={t.brandHome}>
        <Image className="brandLight" src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={180} height={78} priority />
        <Image className="brandDark" src="/images/brand/logo-vita-lima-orange.png" alt="Vita Lima Spa" width={180} height={78} priority />
      </a>

      <button className="menuToggle" type="button" aria-label={t.openMenu} aria-expanded={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
      </button>

      <nav className={open ? "navOpen" : ""} aria-label={t.nav}>
        <a href="#servicios" onClick={close}>{t.links.servicios}</a>
        <a href="#experiencias" onClick={close}>{t.links.experiencias}</a>
        <a href="#opiniones" onClick={close}>{t.links.opiniones}</a>
        <a href="#sedes" onClick={close}>{t.links.sedes}</a>
        <a href="#preguntas" onClick={close}>{t.links.preguntas}</a>
        <button type="button" className="langToggle" onClick={toggleLanguage} aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}>
          {language === "es" ? "EN" : "ES"}
        </button>
      </nav>

      <div className="headerActions">
        <a className="phoneLink" href="tel:+51907308415">+51 907 308 415</a>
        <a className="headerCta" href="#reserva">{t.bookNow}</a>
      </div>
    </header>
  );
}
