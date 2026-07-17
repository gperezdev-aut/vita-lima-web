import Image from "next/image";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="header">
      <a className="brand brandLogo" href="#inicio" aria-label="Ir al inicio de Vita Lima Spa">
        <Image
          src="/images/brand/logo-vita-lima-orange.png"
          alt="Vita Lima Spa Massage Center"
          width={665}
          height={300}
          priority
        />
      </a>
      <nav aria-label="Navegación principal">
        <a href="#servicios">Servicios</a>
        <a href="#experiencias">Experiencias</a>
        <a href="#resenas">Reseñas</a>
        <a href="#sedes">Sedes</a>
        <a href="#preguntas">Preguntas</a>
      </nav>
      <a
        className="button small"
        href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20reservar`}
        target="_blank"
        rel="noreferrer"
      >
        Reservar
      </a>
    </header>
  );
}
