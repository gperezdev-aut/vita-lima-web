"use client";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="headerV8">
    <div className="shell headerInnerV8">
      <a className="brandV8" href="#inicio" onClick={close} aria-label="Vita Lima Spa, inicio"><Image src="/images/brand/logo-vita-lima-orange.png" alt="Vita Lima Spa" width={665} height={300} priority /></a>
      <button className="menuV8" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Abrir menú"><span/><span/></button>
      <nav className={open ? "navV8 navOpenV8" : "navV8"}>
        <a href="#inicio" onClick={close}>Inicio</a><a href="#servicios" onClick={close}>Servicios</a><a href="#experiencias" onClick={close}>Experiencias</a><a href="#resenas" onClick={close}>Reseñas</a><a href="#sedes" onClick={close}>Sedes</a><a href="#preguntas" onClick={close}>Preguntas</a>
      </nav>
      <a className="phoneV8" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">◉ {site.whatsappDisplay}</a>
      <a className="headerBtnV8" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Vita Lima, quiero reservar")}`} target="_blank" rel="noreferrer">Reservar</a>
    </div>
  </header>
}
