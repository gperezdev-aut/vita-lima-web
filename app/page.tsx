import Image from "next/image";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ReserveForm } from "@/components/ReserveForm";
import { site } from "@/content/site";

const serviceImages = [
  "/images/v4/ritual-buddha.webp",
  "/images/v4/electro.webp",
  "/images/v4/cupping.webp",
  "/images/v4/facial.webp",
  "/images/v4/room-single.webp",
];

const gallery = [
  ["/images/v4/hero-reception.webp", "Recepción de Vita Lima Spa"],
  ["/images/v4/ambience.webp", "Cabina doble de masajes"],
  ["/images/v4/buddha-front.webp", "Detalle de ambientación"],
  ["/images/v4/electro.webp", "Sesión de electroterapia"],
  ["/images/v4/cupping-wide.webp", "Terapia con ventosas"],
  ["/images/v4/facial-room.webp", "Momento de relajación facial"],
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="heroV4">
          <div className="heroCopyV4">
            <p className="eyebrow">Masajes y bienestar en Lima</p>
            <h1>Una pausa real para volver a sentirte bien.</h1>
            <p className="heroLead">Masajes personalizados en ambientes cálidos, con atención cercana en San Borja y Miraflores.</p>
            <div className="actions">
              <a className="button" href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20reservar`} target="_blank">Reservar por WhatsApp</a>
              <a className="button secondary" href="#servicios">Ver servicios</a>
            </div>
            <ul className="trustList"><li>Precios visibles</li><li>Dos sedes en Lima</li><li>Atención personalizada</li></ul>
          </div>
          <div className="heroPhotoV4">
            <Image src="/images/v4/hero-reception.webp" alt="Recepción real de Vita Lima Spa" fill priority sizes="(max-width: 900px) 100vw, 52vw" />
            <div className="photoBadge"><strong>Vita Lima Spa</strong><span>Espacios reales, atención cercana.</span></div>
          </div>
        </section>

        <section className="proofBar"><span>San Borja</span><span>Miraflores</span><span>Masajes para uno o dos</span><span>Gift Cards</span></section>

        <section id="servicios" className="section servicesV4">
          <div className="sectionHead compact"><p className="eyebrow">Servicios principales</p><h2>Elige la experiencia que hoy necesita tu cuerpo</h2><p>Opciones sencillas, precios claros y orientación para elegir sin complicarte.</p></div>
          <div className="serviceGridV4">
            {site.services.map((s,i)=>(
              <article className="serviceCardV4" key={s.name}>
                <div className="serviceImageV4"><Image src={serviceImages[i]} alt={s.name} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <div className="serviceBodyV4"><span className="number">0{i+1}</span><h3>{s.name}</h3><p>{s.text}</p><div className="serviceMeta"><span>{s.duration}</span><strong>{s.price}</strong></div><a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hola Vita Lima, quiero reservar ${s.name}`)}`} target="_blank">Consultar disponibilidad →</a></div>
              </article>
            ))}
          </div>
        </section>

        <section id="experiencias" className="section experiencesV4">
          <div className="sectionHead compact"><p className="eyebrow">También en Vita Lima</p><h2>Experiencias para compartir, regalar o llevar a tu equipo</h2></div>
          <div className="experienceGridV4">
            <article className="experiencePhotoV4"><Image src="/images/v4/room-pair.webp" alt="Cabina real para dos personas" fill sizes="60vw"/><div><small>Para compartir</small><h3>Masajes para parejas</h3><p>Coordinamos una pausa para dos según disponibilidad.</p></div></article>
            <article className="experienceTextV4 gift"><small>Para regalar</small><h3>Gift Cards</h3><p>Regala bienestar con una dedicatoria personalizada.</p><a href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20una%20Gift%20Card`} target="_blank">Solicitar Gift Card →</a></article>
            <article className="experienceTextV4 corporate"><small>Para empresas</small><h3>Bienestar corporativo</h3><p>Propuestas de pausa y relajación para equipos.</p><a href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20información%20corporativa`} target="_blank">Consultar propuesta →</a></article>
          </div>
        </section>

        <section className="storyV4">
          <div className="storyPhotoV4"><Image src="/images/v4/room-dark.webp" alt="Ambiente real de Vita Lima Spa" fill sizes="55vw"/></div>
          <div className="storyCopyV4"><p className="eyebrow light">La experiencia</p><h2>Un ambiente sencillo, cálido y preparado para desconectar</h2><p>Usamos fotografías reales para que conozcas el espacio antes de llegar. Sin promesas infladas: atención cercana, ambientes cuidados y terapias pensadas para ti.</p><a className="button secondary lightButton" href="#galeria">Ver nuestros ambientes</a></div>
        </section>

        <section id="sedes" className="section locationsV4">
          <div className="sectionHead compact"><p className="eyebrow">Encuéntranos</p><h2>Dos sedes para estar más cerca de ti</h2></div>
          <div className="locationCardsV4">
            {site.locations.map((l,i)=><article key={l.name}><span className="number">0{i+1}</span><h3>{l.name}</h3><p>{l.address}</p><small>{l.schedule}</small><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address + ', Lima')}`} target="_blank">Abrir en Google Maps →</a></article>)}
          </div>
        </section>

        <section id="galeria" className="section galleryV4">
          <div className="sectionHead compact"><p className="eyebrow">Fotos reales</p><h2>Así se vive Vita Lima</h2><p>Ambientes y tratamientos fotografiados en nuestras instalaciones.</p></div>
          <div className="galleryGridV4">{gallery.map(([src,alt],i)=><figure className={i===0||i===3?"wide":""} key={src}><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 50vw"/></figure>)}</div>
        </section>

        <section id="resenas" className="section reviewsV4">
          <div><p className="eyebrow">Confianza real</p><h2>Revisa opiniones antes de reservar</h2><p>Consulta las fichas públicas y verificables de Vita Lima Spa.</p></div>
          <div className="reviewLinksV4"><a href="https://www.google.com/search?q=Vita+Lima+Spa+rese%C3%B1as" target="_blank"><strong>Google</strong><span>Ver opiniones verificadas →</span></a><a href="https://www.tripadvisor.com/Search?q=Vita%20Lima%20Spa" target="_blank"><strong>Tripadvisor</strong><span>Ver opiniones de viajeros →</span></a></div>
        </section>

        <section id="reserva" className="reserveV4">
          <div className="reservePhotoV4"><Image src="/images/v4/buddha-front.webp" alt="Detalle cálido de Vita Lima Spa" fill sizes="42vw"/></div>
          <div className="reserveContentV4"><p className="eyebrow">Reserva</p><h2>Cuéntanos qué necesitas</h2><p>Completa tus datos y continuamos la coordinación por WhatsApp.</p><ReserveForm /></div>
        </section>

        <section id="preguntas" className="section faqV4"><div><p className="eyebrow">Preguntas frecuentes</p><h2>Lo esencial antes de reservar</h2></div><div className="faqList"><details><summary>¿Cómo puedo reservar?</summary><p>Desde el formulario o escribiéndonos directamente por WhatsApp.</p></details><details><summary>¿Atienden a parejas?</summary><p>Sí, coordinamos la atención para dos personas según sede y disponibilidad.</p></details><details><summary>¿Tienen Gift Cards?</summary><p>Sí, puedes regalar una experiencia y añadir una dedicatoria.</p></details><details><summary>¿Realizan masajes a domicilio?</summary><p>Sí, sujeto a zona, horario y disponibilidad.</p></details><details><summary>¿Puedo reprogramar?</summary><p>Sí, según las condiciones comunicadas al confirmar la reserva.</p></details></div></section>
      </main>
      <footer><div className="brand footerBrand"><span className="brandMark">✦</span><span><strong>Vita Lima Spa</strong><small>Bienestar que se siente</small></span></div><div><strong>Contacto</strong><a href={`tel:${site.whatsappDisplay}`}>{site.whatsappDisplay}</a><a href={`mailto:${site.email}`}>{site.email}</a></div><div><strong>Información</strong><a href="/politica-de-privacidad">Política de privacidad</a><a href="/terminos-y-condiciones">Términos y condiciones</a></div></footer>
      <WhatsAppButton />
    </>
  );
}
