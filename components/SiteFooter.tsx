import Image from "next/image";

type SiteFooterProps = {
  context?: "home" | "internal";
};

export default function SiteFooter({ context = "home" }: SiteFooterProps) {
  const sectionHref = (section: string) => `${context === "internal" ? "/" : ""}#${section}`;

  return (
    <footer className="footer">
      <div className="shell footerTop"><p className="eyebrow orangeText">Vita Lima Spa</p><h2>Tu próxima pausa puede comenzar hoy.</h2><a className="button orangeButton" href={sectionHref("reserva")}>Agendar mi momento →</a></div>
      <div className="shell footerGrid">
        <div className="footerBrand"><Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={190} height={84} /><p>Spa boutique de masajes y bienestar en San Borja y Miraflores.</p></div>
        <div><h4>Explorar</h4><a href={sectionHref("servicios")}>Experiencias</a><a href={sectionHref("opiniones")}>Opiniones</a><a href={sectionHref("sedes")}>Sedes</a><a href={sectionHref("reserva")}>Reservar</a></div>
        <div><h4>Contacto</h4><a href="https://wa.me/51907308415" target="_blank" rel="noreferrer">+51 907 308 415</a><a href="mailto:info@vitalimaspa.com">info@vitalimaspa.com</a></div>
        <div><h4>Información</h4><a href="/politica-de-privacidad">Privacidad</a><a href="/terminos-y-condiciones">Términos</a><a href={sectionHref("preguntas")}>Preguntas frecuentes</a></div>
        <div><h4>Síguenos</h4><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.tripadvisor.com/Search?q=Vita%20Lima%20Spa" target="_blank" rel="noreferrer">Tripadvisor</a></div>
      </div>
      <div className="shell footerBottom">© 2026 Vita Lima Spa. Todos los derechos reservados.</div>
    </footer>
  );
}
