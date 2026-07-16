import { site } from "@/content/site";

export function Header() {
  return (
    <header className="header">
      <a className="brand" href="#inicio" aria-label="Vita Lima Spa">
        <span className="brandMark">✦</span>
        <span><strong>Vita Lima Spa</strong><small>Bienestar que se siente</small></span>
      </a>
      <nav>
        <a href="#servicios">Servicios</a>
        <a href="#experiencias">Experiencias</a>
        <a href="#resenas">Reseñas</a>
        <a href="#sedes">Sedes</a>
        <a href="#preguntas">Preguntas</a>
      </nav>
      <a className="button small" href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20reservar`} target="_blank">Reservar</a>
    </header>
  );
}
