"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="header">
      <a className="brandLogo" href="#inicio" aria-label="Ir al inicio de Vita Lima Spa" onClick={close}>
        <Image src="/images/brand/logo-vita-lima-orange.png" alt="Vita Lima Spa Massage Center" width={665} height={300} priority />
      </a>

      <button className="menuToggle" type="button" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
      </button>

      <nav className={open ? "nav navOpen" : "nav"} aria-label="Navegación principal">
        <a href="#servicios" onClick={close}>Servicios</a>
        <a href="#resenas" onClick={close}>Opiniones</a>
        <a href="#experiencias" onClick={close}>Experiencias</a>
        <a href="#sedes" onClick={close}>Sedes</a>
        <a href="#preguntas" onClick={close}>Preguntas</a>
      </nav>

      <a className="button headerCta" href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20reservar`} target="_blank" rel="noreferrer">
        Reservar
      </a>
    </header>
  );
}
