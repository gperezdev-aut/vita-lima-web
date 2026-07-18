"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`siteHeader ${scrolled ? "siteHeaderScrolled" : ""}`}>
      <a className="brand" href="#inicio" aria-label="Vita Lima Spa - Inicio">
        <Image className="brandLight" src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={180} height={78} priority />
        <Image className="brandDark" src="/images/brand/logo-vita-lima-orange.png" alt="Vita Lima Spa" width={180} height={78} priority />
      </a>

      <button className="menuToggle" type="button" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
      </button>

      <nav className={open ? "navOpen" : ""} aria-label="Navegación principal">
        <a href="#servicios" onClick={close}>Servicios</a>
        <a href="#experiencias" onClick={close}>Experiencias</a>
        <a href="#opiniones" onClick={close}>Opiniones</a>
        <a href="#sedes" onClick={close}>Sedes</a>
        <a href="#preguntas" onClick={close}>Preguntas</a>
      </nav>

      <div className="headerActions">
        <a className="phoneLink" href="tel:+51907308415">+51 907 308 415</a>
        <a className="headerCta" href="#reserva">Reservar ahora</a>
      </div>
    </header>
  );
}
