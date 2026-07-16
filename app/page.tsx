import Image from "next/image";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ReserveForm } from "@/components/ReserveForm";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="hero">
          <Image src="/images/hero/hero-san-borja.webp" alt="Cabina Vita Lima Spa San Borja" fill priority sizes="100vw" />
          <div className="heroOverlay" />
          <div className="heroContent">
            <p className="eyebrow">Masajes y bienestar en Lima</p>
            <h1>Regálate una pausa.<br/>Tu cuerpo la necesita.</h1>
            <p>Experiencias de masaje pensadas para aliviar tensión, recuperar energía y volver a sentirte bien.</p>
            <div className="actions">
              <a className="button" href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20reservar`} target="_blank">Reservar por WhatsApp</a>
              <a className="button secondary" href="#servicios">Ver servicios</a>
            </div>
            <div className="trust"><span>✓ Dos sedes en Lima</span><span>✓ Atención personalizada</span><span>✓ Opciones para dos</span></div>
          </div>
        </section>

        <section id="servicios" className="section">
          <div className="sectionHead"><p className="eyebrow">Servicios principales</p><h2>Masajes que se adaptan a ti</h2><p>Precios claros, atención cercana y opciones para distintas necesidades.</p></div>
          <div className="serviceGrid">
            {site.services.map((s, i) => (
              <article className="serviceCard" key={s.name}>
                <span className="number">0{i+1}</span>
                <h3>{s.name}</h3><p>{s.text}</p>
                <div className="serviceMeta"><span>{s.duration}</span><strong>{s.price}</strong></div>
                <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hola Vita Lima, quiero reservar ${s.name}`)}`} target="_blank">Reservar este servicio →</a>
              </article>
            ))}
          </div>
        </section>

        <section id="experiencias" className="section experienceSection">
          <div className="sectionHead"><p className="eyebrow">Experiencias Vita Lima</p><h2>Bienestar para regalar, compartir o llevar contigo</h2></div>
          <div className="experienceGrid">
            <article className="experience large"><Image src="/images/sede-san-borja/san-borja-12.webp" alt="Cabina para parejas" fill sizes="70vw" /><div><small>Para compartir</small><h3>Masajes para parejas</h3><p>Una pausa para dos, coordinada según disponibilidad.</p></div></article>
            <article className="experience"><Image src="/images/detalles/detalle-02.webp" alt="Gift Cards Vita Lima" fill sizes="30vw" /><div><small>Para regalar</small><h3>Gift Cards</h3></div></article>
            <article className="experience"><Image src="/images/servicios/servicio-05.webp" alt="Bienestar corporativo" fill sizes="30vw" /><div><small>Para equipos</small><h3>Bienestar corporativo</h3></div></article>
          </div>
        </section>

        <section id="resenas" className="reviews">
          <div><p className="eyebrow light">Confianza que se construye experiencia a experiencia</p><h2>Descubre por qué nuestros clientes recomiendan Vita Lima</h2><p>Integraremos reseñas reales y verificables de Google y Tripadvisor con enlaces a las fichas oficiales.</p><div className="reviewLinks"><a href="#" aria-label="Google">Google — Ver opiniones verificadas</a><a href="#" aria-label="Tripadvisor">Tripadvisor — Ver opiniones de viajeros</a></div></div>
          <blockquote>“Un espacio pensado para que las reseñas reales hablen por nosotros.”<small>Próxima integración: comentarios verificados.</small></blockquote>
        </section>

        <section id="sedes" className="section">
          <div className="sectionHead"><p className="eyebrow">Encuéntranos</p><h2>Dos sedes para estar más cerca de ti</h2></div>
          <div className="locationGrid">
            {site.locations.map((l, i) => <article className="locationCard" key={l.name}><span className="number">0{i+1}</span><h3>{l.name}</h3><p>{l.address}</p><small>{l.schedule}</small><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address + ", Lima")}`} target="_blank">Abrir en Google Maps →</a></article>)}
          </div>
        </section>

        <section className="gallery section">
          <div className="sectionHead"><p className="eyebrow">San Borja</p><h2>Conoce nuestros espacios</h2></div>
          <div className="galleryGrid">
            {[1,2,3,4,5,6].map(n => <Image key={n} src={`/images/detalles/detalle-${String(n).padStart(2,"0")}.webp`} alt={`Ambiente Vita Lima ${n}`} width={900} height={900} />)}
          </div>
        </section>

        <section id="reserva" className="reserveSection">
          <div><p className="eyebrow">Reserva</p><h2>Cuéntanos qué necesitas. Nosotros te ayudamos a elegir.</h2><p>Completa tus datos y continuaremos la coordinación por WhatsApp.</p></div>
          <ReserveForm />
        </section>

        <section id="preguntas" className="section faq">
          <div className="sectionHead"><p className="eyebrow">Preguntas frecuentes</p><h2>Todo lo que necesitas saber antes de reservar</h2></div>
          <div className="faqList">
            {[
              ["¿Cómo puedo reservar?","Puedes enviarnos tu solicitud desde el formulario o escribirnos directamente por WhatsApp."],
              ["¿Atienden a parejas?","Sí. Coordinamos experiencias para dos personas según disponibilidad de sede y terapeutas."],
              ["¿Tienen Gift Cards?","Sí. Puedes regalar una experiencia y coordinar el servicio y la dedicatoria por WhatsApp."],
              ["¿Realizan masajes a domicilio?","Sí. La disponibilidad y el recargo dependen de la zona, horario y duración elegida."],
              ["¿Puedo reprogramar mi cita?","Sí, aplican las condiciones de reserva comunicadas al momento de confirmar."],
              ["¿Qué servicio me recomiendan?","Cuéntanos cómo te sientes y te orientaremos hacia la experiencia más adecuada."]
            ].map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </section>
      </main>

      <footer>
        <div className="brand footerBrand"><span className="brandMark">✦</span><span><strong>Vita Lima Spa</strong><small>Bienestar que se siente</small></span></div>
        <div><strong>Contacto</strong><a href={`https://wa.me/${site.whatsapp}`} target="_blank">{site.whatsappDisplay}</a><a href={`mailto:${site.email}`}>{site.email}</a></div>
        <div><strong>Información</strong><a href="/politica-de-privacidad">Política de privacidad</a><a href="/terminos-y-condiciones">Términos y condiciones</a></div>
      </footer>
      <WhatsAppButton />
    </>
  );
}
