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
        <section id="inicio" className="heroV3">
          <div className="heroCopyV3">
            <p className="eyebrow">Masajes · bienestar · Lima</p>
            <h1>Tu momento de volver a ti.</h1>
            <p className="heroLead">Una experiencia de bienestar cálida, profesional y cercana, con atención en San Borja y Miraflores.</p>
            <div className="actions">
              <a className="button" href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20reservar`} target="_blank">Reservar ahora</a>
              <a className="textLink" href="#servicios">Explorar servicios →</a>
            </div>
            <div className="heroStats">
              <div><strong>2</strong><span>sedes en Lima</span></div>
              <div><strong>5</strong><span>experiencias principales</span></div>
              <div><strong>1:1</strong><span>orientación personalizada</span></div>
            </div>
          </div>
          <div className="heroVisualV3">
            <div className="heroMainPhoto"><Image src="/images/generated/reception.webp" alt="Recepción premium Vita Lima Spa" fill priority sizes="(max-width: 900px) 100vw, 54vw" /></div>
            <div className="heroFloatCard"><Image src="/images/generated/hot_stones.webp" alt="Masaje con piedras calientes" fill sizes="260px" /><span>Respira. Descansa. Renueva.</span></div>
          </div>
        </section>

        <section className="signatureStrip">
          <span>Ambientes cálidos</span><span>Atención personalizada</span><span>Experiencias para dos</span><span>Gift Cards</span>
        </section>

        <section id="servicios" className="section servicesV3">
          <div className="sectionHead splitHead">
            <div><p className="eyebrow">Nuestros servicios</p><h2>El bienestar que hoy necesita tu cuerpo</h2></div>
            <p>Opciones claras para relajar, aliviar tensión y recuperar energía. Te orientamos para elegir la más adecuada.</p>
          </div>
          <div className="serviceShowcase">
            {site.services.map((s, i) => (
              <article className={`serviceV3 ${i===0 ? "featured" : ""}`} key={s.name}>
                <div className="servicePhotoV3"><Image src={serviceImages[i]} alt={s.name} fill sizes="(max-width: 800px) 100vw, 33vw" /></div>
                <div className="serviceInfoV3">
                  <span className="number">0{i+1}</span>
                  <h3>{s.name}</h3>
                  <p>{s.text}</p>
                  <div className="serviceMeta"><span>{s.duration}</span><strong>{s.price}</strong></div>
                  <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hola Vita Lima, quiero reservar ${s.name}`)}`} target="_blank">Reservar →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experiencias" className="section experiencesV3">
          <div className="sectionHead"><p className="eyebrow">Experiencias Vita</p><h2>Más que un masaje: momentos para recordar</h2></div>
          <div className="editorialGrid">
            <article className="editorialCard tall"><Image src="/images/generated/couple.webp" alt="Masajes para parejas" fill sizes="50vw" /><div><small>Para compartir</small><h3>Masajes para parejas</h3><p>Una pausa coordinada para dos.</p></div></article>
            <article className="editorialCard"><Image src="/images/generated/gift.webp" alt="Gift Cards Vita Lima" fill sizes="50vw" /><div><small>Para regalar</small><h3>Gift Cards</h3></div></article>
            <article className="editorialCard"><Image src="/images/generated/corporate.webp" alt="Bienestar corporativo" fill sizes="50vw" /><div><small>Para equipos</small><h3>Bienestar corporativo</h3></div></article>
          </div>
        </section>

        <section className="storyV3">
          <div className="storyImage"><Image src="/images/generated/room_buddha.webp" alt="Cabina Vita Lima Spa" fill sizes="55vw" /></div>
          <div className="storyCopy"><p className="eyebrow light">La experiencia</p><h2>Un espacio pensado para bajar el ritmo</h2><p>Iluminación cálida, aromas suaves y ambientes preparados para que desconectes desde que llegas.</p><a className="button secondary lightButton" href="#galeria">Conocer los ambientes</a></div>
        </section>

        <section id="resenas" className="reviewsV3 section">
          <div className="reviewIntro"><p className="eyebrow">Confianza real</p><h2>Antes de reservar, conoce lo que dicen nuestros clientes</h2><p>Consulta nuestras fichas públicas y revisa opiniones verificables.</p></div>
          <div className="reviewPlatforms">
            <a href="https://www.google.com/search?q=Vita+Lima+Spa+rese%C3%B1as" target="_blank"><strong>Google</strong><span>Ver opiniones verificadas →</span></a>
            <a href="https://www.tripadvisor.com/Search?q=Vita%20Lima%20Spa" target="_blank"><strong>Tripadvisor</strong><span>Ver opiniones de viajeros →</span></a>
          </div>
        </section>

        <section id="sedes" className="section locationsV3">
          <div className="sectionHead"><p className="eyebrow">Nuestras sedes</p><h2>Dos espacios, una misma forma de cuidarte</h2></div>
          <div className="locationVisualGrid">
            <article className="locationVisual"><Image src="/images/generated/facade.webp" alt="Sede San Borja" fill sizes="50vw"/><div><span>01</span><h3>San Borja</h3><p>Av. Aviación 3358, oficina 204</p><a href="https://www.google.com/maps/search/?api=1&query=Av.%20Aviaci%C3%B3n%203358%20Lima" target="_blank">Abrir en Google Maps →</a></div></article>
            <article className="locationVisual"><Image src="/images/generated/reception.webp" alt="Sede Miraflores" fill sizes="50vw"/><div><span>02</span><h3>Miraflores</h3><p>Av. Larco 812, oficina 306</p><a href="https://www.google.com/maps/search/?api=1&query=Av.%20Larco%20812%20Lima" target="_blank">Abrir en Google Maps →</a></div></article>
          </div>
        </section>

        <section id="galeria" className="galleryV3 section">
          <div className="sectionHead splitHead"><div><p className="eyebrow">Galería</p><h2>Detalles que construyen la experiencia</h2></div><p>Una mirada a nuestros ambientes, terapias y momentos de relajación.</p></div>
          <div className="galleryRibbon">
            <Image src="/images/real/reception_real.webp" alt="Recepción Vita Lima" width={900} height={1100}/>
            <Image src="/images/generated/cupping.webp" alt="Tratamiento con ventosas" width={900} height={1100}/>
            <Image src="/images/real/room_pair.webp" alt="Cabina doble" width={900} height={1100}/>
            <Image src="/images/generated/oils.webp" alt="Aromaterapia" width={900} height={1100}/>
            <Image src="/images/real/facial_real.webp" alt="Tratamiento facial" width={900} height={1100}/>
          </div>
        </section>

        <section id="reserva" className="reserveV3">
          <div className="reserveImage"><Image src="/images/generated/buddha.webp" alt="Ambiente de calma Vita Lima" fill sizes="45vw" /></div>
          <div className="reserveContentV3"><p className="eyebrow">Reserva tu experiencia</p><h2>Cuéntanos qué necesitas</h2><p>Déjanos tus datos y continuamos la coordinación por WhatsApp.</p><ReserveForm /></div>
        </section>

        <section id="preguntas" className="section faqV3">
          <div className="sectionHead"><p className="eyebrow">Preguntas frecuentes</p><h2>Todo claro antes de reservar</h2></div>
          <div className="faqList">
            {[
              ["¿Cómo puedo reservar?","Puedes completar el formulario o escribirnos directamente por WhatsApp."],
              ["¿Atienden a parejas?","Sí. Coordinamos experiencias para dos según disponibilidad de sede y terapeutas."],
              ["¿Tienen Gift Cards?","Sí. Puedes regalar una experiencia y personalizar la dedicatoria."],
              ["¿Realizan masajes a domicilio?","Sí, sujeto a zona, horario y disponibilidad."],
              ["¿Puedo reprogramar mi cita?","Sí, aplican las condiciones comunicadas al momento de confirmar."],
              ["¿Qué servicio me recomiendan?","Cuéntanos cómo te sientes y te orientaremos hacia la mejor opción."]
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
