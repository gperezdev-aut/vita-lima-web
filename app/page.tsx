import Image from "next/image";
import ReservationForm from "@/components/ReservationForm";
import { contactEmail, faq, services, whatsappDisplay, whatsappNumber } from "@/content/site";

const wa = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola Vita Lima, deseo información para reservar una experiencia.")}`;

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio"><Image src="/images/logo.svg" alt="Vita Lima Spa" width={52} height={52}/><span><strong>Vita Lima Spa</strong><small>Bienestar que se siente</small></span></a>
        <nav><a href="#servicios">Servicios</a><a href="#experiencias">Experiencias</a><a href="#resenas">Reseñas</a><a href="#sedes">Sedes</a><a href="#faq">Preguntas</a></nav>
        <a className="button primary compact" href={wa} target="_blank" rel="noreferrer">Reservar</a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy"><p className="eyebrow">Masajes y bienestar en Lima</p><h1>Regálate una pausa.<br/><em>Tu cuerpo la necesita.</em></h1><p className="lead">Experiencias de masaje pensadas para aliviar tensión, recuperar energía y volver a sentirte bien.</p><div className="actions"><a className="button primary" href={wa} target="_blank" rel="noreferrer">Reservar por WhatsApp</a><a className="button secondary" href="#servicios">Ver servicios</a></div><div className="trust-row"><span>✓ Dos sedes en Lima</span><span>✓ Atención personalizada</span><span>✓ Opciones para dos</span></div></div>
        <div className="hero-visual"><Image src="/images/hero-spa.svg" alt="Experiencia de bienestar Vita Lima Spa" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
      </section>

      <section className="section intro"><p className="eyebrow">Tu bienestar, a tu manera</p><h2>Elige la experiencia que hoy necesita tu cuerpo</h2><p>Sesiones claras, precios visibles y acompañamiento para encontrar la opción adecuada.</p></section>

      <section className="services section" id="servicios"><div className="section-heading"><div><p className="eyebrow">Servicios principales</p><h2>Masajes que se adaptan a ti</h2></div><a href={wa} target="_blank" rel="noreferrer">Consultar disponibilidad →</a></div><div className="service-grid">{services.map((service, index)=><article className="service-card" key={service.name}><span className="service-number">0{index+1}</span><h3>{service.name}</h3><p>{service.description}</p><div><span>{service.duration}</span><strong>{service.price}</strong></div><a href={wa} target="_blank" rel="noreferrer">Reservar este servicio</a></article>)}</div></section>

      <section className="section experiences" id="experiencias"><div className="section-heading"><div><p className="eyebrow">Experiencias especiales</p><h2>Bienestar para regalar, compartir o llevar contigo</h2></div></div><div className="experience-grid"><article className="experience-card large"><Image src="/images/couple.svg" alt="Masajes para parejas" fill sizes="(max-width: 800px) 100vw, 50vw"/><div><span>Para compartir</span><h3>Masajes para parejas</h3><p>Una pausa para dos, coordinada según disponibilidad.</p></div></article><article className="experience-card"><Image src="/images/gift.svg" alt="Gift Cards Vita Lima" fill sizes="(max-width: 800px) 100vw, 25vw"/><div><span>Para regalar</span><h3>Gift Cards</h3></div></article><article className="experience-card"><Image src="/images/corporate.svg" alt="Servicios corporativos" fill sizes="(max-width: 800px) 100vw, 25vw"/><div><span>Para equipos</span><h3>Bienestar corporativo</h3></div></article></div></section>

      <section className="reputation section" id="resenas"><div><p className="eyebrow">Confianza que se construye experiencia a experiencia</p><h2>Descubre por qué nuestros clientes recomiendan Vita Lima</h2><p>Integraremos aquí reseñas reales y verificables de Google y Tripadvisor, con enlaces directos a las fichas oficiales. Nada inventado, nada inflado.</p><div className="review-buttons"><a className="review-link" href="https://www.google.com/search?q=Vita+Lima+Spa+rese%C3%B1as" target="_blank" rel="noreferrer"><strong>Google</strong><span>Ver opiniones verificadas →</span></a><a className="review-link" href="https://www.tripadvisor.com/Search?q=Vita%20Lima" target="_blank" rel="noreferrer"><strong>Tripadvisor</strong><span>Ver opiniones de viajeros →</span></a></div></div><aside className="review-preview"><span className="quote">“</span><p>Un espacio pensado para que las reseñas reales hablen por nosotros.</p><small>Próxima integración: selección de comentarios verificados.</small></aside></section>

      <section className="locations section" id="sedes"><div className="section-heading"><div><p className="eyebrow">Encuéntranos</p><h2>Dos sedes para estar más cerca de ti</h2></div></div><div className="location-grid"><article><span>01</span><h3>San Borja</h3><p>Av. Aviación 3358, oficina 204.</p><small>Lunes a sábado · Principalmente de 3:00 p. m. a 8:00 p. m.</small><a href="https://www.google.com/maps/search/?api=1&query=Av.+Aviaci%C3%B3n+3358+Lima" target="_blank" rel="noreferrer">Abrir en Google Maps →</a></article><article><span>02</span><h3>Miraflores</h3><p>Av. Larco 812, oficina 306.</p><small>Atención previa reserva.</small><a href="https://www.google.com/maps/search/?api=1&query=Av.+Larco+812+Lima" target="_blank" rel="noreferrer">Abrir en Google Maps →</a></article></div></section>

      <section className="booking section" id="reservar"><div className="booking-copy"><p className="eyebrow">Reserva</p><h2>Cuéntanos qué necesitas. Nosotros te ayudamos a elegir.</h2><p>Completa tus datos y continuaremos la coordinación por WhatsApp.</p></div><ReservationForm/></section>

      <section className="faq section" id="faq"><div><p className="eyebrow">Preguntas frecuentes</p><h2>Todo lo que necesitas saber antes de reservar</h2></div><div className="faq-list">{faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>

      <footer><div className="footer-brand"><Image src="/images/logo-light.svg" alt="Vita Lima Spa" width={56} height={56}/><div><strong>Vita Lima Spa</strong><p>Bienestar que se siente.</p></div></div><div><h4>Contacto</h4><a href={`https://wa.me/${whatsappNumber}`}>{whatsappDisplay}</a><a href={`mailto:${contactEmail}`}>{contactEmail}</a></div><div><h4>Información</h4><a href="/politica-de-privacidad">Política de privacidad</a><a href="/terminos-y-condiciones">Términos y condiciones</a></div><p className="copyright">© {new Date().getFullYear()} Vita Lima Spa</p></footer>
      <a className="whatsapp-float" href={wa} target="_blank" rel="noreferrer" aria-label="Reservar por WhatsApp">WhatsApp</a>
    </main>
  );
}
