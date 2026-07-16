import Image from "next/image";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ReserveForm } from "@/components/ReserveForm";
import { site } from "@/content/site";

const serviceImages = [
  "/images/generated/oils.webp",
  "/images/generated/hot_stones.webp",
  "/images/generated/cupping.webp",
  "/images/generated/electro.webp",
  "/images/generated/foot.webp",
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="hero">
          <Image src="/images/real/hero.webp" alt="Cabina de masaje Vita Lima Spa" fill priority sizes="100vw" />
          <div className="heroOverlay" />
          <div className="heroContent">
            <p className="eyebrow light">Masajes y bienestar en Lima</p>
            <h1>Una pausa que sí se siente.</h1>
            <p>Masajes terapéuticos, experiencias para dos y atención personalizada en San Borja y Miraflores.</p>
            <div className="actions">
              <a className="button" href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20reservar`} target="_blank">Reservar por WhatsApp</a>
              <a className="button secondary" href="#servicios">Ver experiencias</a>
            </div>
            <div className="trust"><span>✓ Dos sedes en Lima</span><span>✓ Precios visibles</span><span>✓ Atención para parejas</span></div>
          </div>
        </section>

        <section className="introStrip">
          <div><strong>Atención cercana</strong><span>Te orientamos según lo que tu cuerpo necesita.</span></div>
          <div><strong>Ambientes reales</strong><span>Espacios cálidos y preparados para desconectar.</span></div>
          <div><strong>Reserva simple</strong><span>Coordina fecha, sede y servicio por WhatsApp.</span></div>
        </section>

        <section id="servicios" className="section servicesSection">
          <div className="sectionHead splitHead">
            <div><p className="eyebrow">Servicios principales</p><h2>Elige cómo quieres sentirte hoy</h2></div>
            <p>Experiencias claras, precios visibles y una recomendación honesta para que elijas sin complicarte.</p>
          </div>
          <div className="serviceGrid photoCards">
            {site.services.map((s, i) => (
              <article className="serviceCard" key={s.name}>
                <div className="serviceImage"><Image src={serviceImages[i]} alt={s.name} fill sizes="(max-width: 680px) 100vw, 20vw" /></div>
                <div className="serviceBody">
                  <span className="number">0{i+1}</span>
                  <h3>{s.name}</h3><p>{s.text}</p>
                  <div className="serviceMeta"><span>{s.duration}</span><strong>{s.price}</strong></div>
                  <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hola Vita Lima, quiero reservar ${s.name}`)}`} target="_blank">Reservar este servicio →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experiencias" className="section experienceSection">
          <div className="sectionHead"><p className="eyebrow">Más formas de cuidarte</p><h2>Bienestar para compartir, regalar o llevar a tu equipo</h2></div>
          <div className="experienceGrid">
            <article className="experience large"><Image src="/images/generated/couple.webp" alt="Masaje para parejas" fill sizes="60vw" /><div><small>Para compartir</small><h3>Masajes para parejas</h3><p>Una experiencia coordinada para dos, en un ambiente tranquilo y privado.</p></div></article>
            <article className="experience"><Image src="/images/generated/gift.webp" alt="Gift Card Vita Lima" fill sizes="40vw" /><div><small>Para regalar</small><h3>Gift Cards</h3><p>Un detalle que se convierte en descanso.</p></div></article>
            <article className="experience"><Image src="/images/generated/corporate.webp" alt="Bienestar corporativo" fill sizes="40vw" /><div><small>Para equipos</small><h3>Bienestar corporativo</h3><p>Activaciones y pausas de bienestar para empresas.</p></div></article>
          </div>
        </section>

        <section className="realSpaces">
          <div className="realSpacesCopy"><p className="eyebrow light">Espacios reales</p><h2>Conoce Vita Lima antes de reservar</h2><p>Estas fotografías corresponden a nuestras instalaciones y muestran el ambiente que encontrarás al llegar.</p><a className="button secondary lightButton" href="#galeria">Ver galería</a></div>
          <div className="realSpacesImages"><Image src="/images/real/reception_real.webp" alt="Recepción Vita Lima" fill sizes="50vw" /></div>
        </section>

        <section id="resenas" className="reviews">
          <div><p className="eyebrow light">Confianza verificable</p><h2>Lo mejor de Vita Lima lo cuentan nuestros clientes</h2><p>Consulta directamente nuestras opiniones públicas y revisa experiencias reales antes de reservar.</p><div className="reviewLinks"><a href="https://www.google.com/search?q=Vita+Lima+Spa+rese%C3%B1as" target="_blank">Google — Ver reseñas</a><a href="https://www.tripadvisor.com/Search?q=Vita%20Lima%20Spa" target="_blank">Tripadvisor — Buscar Vita Lima</a></div></div>
          <blockquote>“Queremos que cada visita se sienta cercana, ordenada y realmente reparadora.”<small>Vita Lima Spa</small></blockquote>
        </section>

        <section id="sedes" className="section locationsSection">
          <div className="sectionHead splitHead"><div><p className="eyebrow">Encuéntranos</p><h2>Dos sedes para estar más cerca de ti</h2></div><p>Elige la sede que mejor se adapte a tu ubicación y horario.</p></div>
          <div className="locationGrid">
            {site.locations.map((l, i) => <article className="locationCard" key={l.name}><span className="number">0{i+1}</span><h3>{l.name}</h3><p>{l.address}</p><small>{l.schedule}</small><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address + ", Lima")}`} target="_blank">Abrir en Google Maps →</a></article>)}
          </div>
        </section>

        <section id="galeria" className="gallery section">
          <div className="sectionHead"><p className="eyebrow">Galería</p><h2>Ambientes, detalles y tratamientos</h2><p>Una selección más variada para que conozcas mejor la experiencia Vita Lima.</p></div>
          <div className="galleryGrid galleryMosaic">
            <Image src="/images/real/room_pair.webp" alt="Cabina doble" width={1200} height={900} />
            <Image src="/images/generated/cupping.webp" alt="Tratamiento con ventosas" width={900} height={900} />
            <Image src="/images/real/buddha_real.webp" alt="Detalle de ambiente" width={1200} height={900} />
            <Image src="/images/generated/hot_stones.webp" alt="Masaje con piedras calientes" width={900} height={900} />
            <Image src="/images/real/facial_real.webp" alt="Experiencia facial" width={1200} height={900} />
            <Image src="/images/generated/oils.webp" alt="Aceites y aromaterapia" width={900} height={900} />
            <Image src="/images/real/room_single.webp" alt="Cabina individual" width={1200} height={900} />
            <Image src="/images/generated/foot.webp" alt="Masaje de pies" width={900} height={900} />
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
              ["¿Realizan masajes a domicilio?","Sí. La disponibilidad y el recargo dependen de la zona, el horario y la duración elegida."],
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
