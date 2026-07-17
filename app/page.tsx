import Image from "next/image";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ReserveForm } from "@/components/ReserveForm";
import { site } from "@/content/site";

const serviceImages = [
  "/images/v4/ritual-buddha.webp",
  "/images/v4/electro.webp",
  "/images/v4/cupping-wide.webp",
  "/images/v4/facial.webp",
  "/images/v4/room-single.webp",
];

const gallery = [
  ["/images/v4/hero-reception.webp", "Recepción de Vita Lima Spa"],
  ["/images/v4/room-pair.webp", "Cabina doble de Vita Lima Spa"],
  ["/images/v4/buddha-front.webp", "Detalle de ambientación"],
  ["/images/v4/ambience.webp", "Cabina de masajes"],
  ["/images/v4/electro.webp", "Sesión de electroterapia"],
  ["/images/v4/facial-room.webp", "Ritual facial"],
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="heroV5">
          <div className="heroImageV5">
            <Image src="/images/v4/room-pair.webp" alt="Cabina doble de Vita Lima Spa" fill priority sizes="100vw" />
            <div className="heroOverlayV5" />
          </div>
          <div className="heroCopyV5">
            <p className="eyebrow gold">Bienestar · Relajación · Equilibrio</p>
            <h1>Tu momento de volver a ti.</h1>
            <p>Masajes personalizados, ambientes cálidos y una atención cercana para ayudarte a bajar el ritmo.</p>
            <div className="heroActionsV5">
              <a className="button goldButton" href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20reservar`} target="_blank">Reservar ahora</a>
              <a className="textLink lightLink" href="#servicios">Ver servicios →</a>
            </div>
          </div>
          <div className="heroTrustV5">
            <span>✓ Dos sedes en Lima</span><span>✓ Atención personalizada</span><span>✓ Opciones para uno o dos</span>
          </div>
        </section>

        <section className="signatureV5">
          <p>Vita Lima Spa</p>
          <h2>Bienestar que se siente.</h2>
          <div className="signatureGridV5">
            <article><strong>Ambientes cuidados</strong><span>Espacios reales, cálidos y preparados para desconectar.</span></article>
            <article><strong>Atención profesional</strong><span>Terapias orientadas a lo que tu cuerpo necesita.</span></article>
            <article><strong>Experiencias flexibles</strong><span>Opciones individuales, para parejas, regalos y empresas.</span></article>
          </div>
        </section>

        <section id="servicios" className="section servicesV5">
          <div className="sectionHeadV5">
            <div><p className="eyebrow">Nuestros servicios</p><h2>Rituales para cada necesidad</h2></div>
            <p>Precios visibles, atención cercana y una experiencia pensada para que elijas con claridad.</p>
          </div>
          <div className="servicesEditorialV5">
            {site.services.map((s, i) => (
              <article className="serviceEditorialCardV5" key={s.name}>
                <div className="serviceVisualV5"><Image src={serviceImages[i]} alt={s.name} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <div className="serviceInfoV5"><span className="number">0{i + 1}</span><h3>{s.name}</h3><p>{s.text}</p><div className="serviceMeta"><span>{s.duration}</span><strong>{s.price}</strong></div><a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hola Vita Lima, quiero reservar ${s.name}`)}`} target="_blank">Consultar disponibilidad →</a></div>
              </article>
            ))}
          </div>
        </section>

        <section className="immersiveV5">
          <div className="immersivePhotoV5"><Image src="/images/v4/room-dark.webp" alt="Ambiente cálido de Vita Lima Spa" fill sizes="55vw" /></div>
          <div className="immersiveCopyV5"><p className="eyebrow gold">La experiencia</p><h2>Un espacio pensado para bajar el ritmo</h2><p>Iluminación cálida, aromas suaves y ambientes preparados para que desconectes desde que llegas.</p><a className="button outlineLight" href="#galeria">Conocer los ambientes</a></div>
        </section>

        <section id="experiencias" className="section experiencesV5">
          <div className="sectionHeadV5"><div><p className="eyebrow">Más que un masaje</p><h2>Comparte, regala o lleva bienestar a tu equipo</h2></div></div>
          <div className="experienceMosaicV5">
            <article className="mosaicLargeV5"><Image src="/images/v4/room-pair.webp" alt="Masajes para parejas" fill sizes="65vw"/><div><small>Para compartir</small><h3>Masajes para parejas</h3><p>Una pausa coordinada para dos, según disponibilidad.</p></div></article>
            <article className="mosaicSmallV5 giftV5"><Image src="/images/v4/ritual-buddha.webp" alt="Gift Cards Vita Lima" fill sizes="35vw"/><div><small>Para regalar</small><h3>Gift Cards</h3></div></article>
            <article className="mosaicSmallV5 corporateV5"><Image src="/images/v4/hero-reception.webp" alt="Bienestar corporativo" fill sizes="35vw"/><div><small>Para equipos</small><h3>Bienestar corporativo</h3></div></article>
          </div>
        </section>

        <section id="sedes" className="section locationsV5">
          <div className="sectionHeadV5"><div><p className="eyebrow">Encuéntranos</p><h2>Dos sedes para estar más cerca de ti</h2></div></div>
          <div className="locationCardsV5">
            <article><div className="locationImageV5"><Image src="/images/v4/ambience.webp" alt="Sede San Borja" fill sizes="50vw"/></div><div><span className="number">01</span><h3>San Borja</h3><p>Av. Aviación 3358, oficina 204</p><small>Lunes a sábado, principalmente de 3:00 p. m. a 8:00 p. m.</small><a href="https://www.google.com/maps/search/?api=1&query=Av.%20Aviaci%C3%B3n%203358%20Lima" target="_blank">Abrir en Google Maps →</a></div></article>
            <article><div className="locationImageV5"><Image src="/images/v4/hero-reception.webp" alt="Sede Miraflores" fill sizes="50vw"/></div><div><span className="number">02</span><h3>Miraflores</h3><p>Av. Larco 812, oficina 306</p><small>Atención previa reserva.</small><a href="https://www.google.com/maps/search/?api=1&query=Av.%20Larco%20812%20Miraflores" target="_blank">Abrir en Google Maps →</a></div></article>
          </div>
        </section>

        <section id="galeria" className="section galleryV5">
          <div className="sectionHeadV5"><div><p className="eyebrow">Momentos Vita Lima</p><h2>Una mirada a nuestros ambientes y terapias</h2></div><p>Fotografías reales de nuestras instalaciones y atenciones.</p></div>
          <div className="galleryEditorialV5">{gallery.map(([src, alt], i) => <figure className={i === 1 || i === 4 ? "tall" : ""} key={src}><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></figure>)}</div>
        </section>

        <section id="resenas" className="reviewsV5">
          <div><p className="eyebrow gold">Confianza real</p><h2>Antes de reservar, conoce lo que dicen nuestros clientes</h2><p>Consulta nuestras fichas públicas y revisa opiniones verificables.</p></div>
          <div className="reviewCardsV5"><a href="https://www.google.com/search?q=Vita+Lima+Spa+rese%C3%B1as" target="_blank"><strong>Google</strong><span>Ver opiniones verificadas →</span></a><a href="https://www.tripadvisor.com/Search?q=Vita%20Lima%20Spa" target="_blank"><strong>Tripadvisor</strong><span>Ver opiniones de viajeros →</span></a></div>
        </section>

        <section id="reserva" className="reserveV5">
          <div className="reserveVisualV5"><Image src="/images/v4/buddha-front.webp" alt="Detalle de Vita Lima Spa" fill sizes="42vw"/></div>
          <div className="reserveContentV5"><p className="eyebrow">Reserva</p><h2>Cuéntanos qué necesitas</h2><p>Déjanos tus datos y continuamos la coordinación por WhatsApp.</p><ReserveForm /></div>
        </section>

        <section id="preguntas" className="section faqV5"><div><p className="eyebrow">Preguntas frecuentes</p><h2>Lo esencial antes de reservar</h2></div><div className="faqList"><details><summary>¿Cómo puedo reservar?</summary><p>Desde el formulario o escribiéndonos directamente por WhatsApp.</p></details><details><summary>¿Atienden a parejas?</summary><p>Sí, coordinamos la atención para dos personas según sede y disponibilidad.</p></details><details><summary>¿Tienen Gift Cards?</summary><p>Sí, puedes regalar una experiencia y añadir una dedicatoria.</p></details><details><summary>¿Realizan masajes a domicilio?</summary><p>Sí, sujeto a zona, horario y disponibilidad.</p></details><details><summary>¿Puedo reprogramar?</summary><p>Sí, según las condiciones comunicadas al confirmar la reserva.</p></details></div></section>
      </main>
      <footer><div className="brand footerBrand"><span className="brandMark">✦</span><span><strong>Vita Lima Spa</strong><small>Bienestar que se siente</small></span></div><div><strong>Contacto</strong><a href={`tel:${site.whatsappDisplay}`}>{site.whatsappDisplay}</a><a href={`mailto:${site.email}`}>{site.email}</a></div><div><strong>Información</strong><a href="/politica-de-privacidad">Política de privacidad</a><a href="/terminos-y-condiciones">Términos y condiciones</a></div></footer>
      <WhatsAppButton />
    </>
  );
}
