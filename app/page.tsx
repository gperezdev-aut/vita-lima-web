import Image from "next/image";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ReserveForm } from "@/components/ReserveForm";
import { site } from "@/content/site";

const services = [
  { ...site.services[0], image: "/images/signature/ambience.webp", note: "Relajación profunda" },
  { ...site.services[1], image: "/images/signature/electro.webp", note: "Espalda, cuello y hombros" },
  { ...site.services[2], image: "/images/signature/cupping.webp", note: "Descarga muscular" },
  { ...site.services[3], image: "/images/signature/buddha.webp", note: "Sesión personalizada" },
  { ...site.services[4], image: "/images/signature/facial.webp", note: "Tiempo extra para ti" },
];

const gallery = [
  ["/images/signature/reception.webp", "Recepción de Vita Lima Spa"],
  ["/images/signature/couple-room.webp", "Cabina doble de Vita Lima Spa"],
  ["/images/signature/buddha.webp", "Ambientación cálida"],
  ["/images/signature/electro.webp", "Sesión de electroterapia"],
  ["/images/signature/cupping.webp", "Terapia con ventosas"],
  ["/images/signature/facial-room.webp", "Momento de relajación facial"],
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="signatureHero">
          <div className="signatureHeroImage">
            <Image src="/images/signature/hero.webp" alt="Recepción de Vita Lima Spa" fill priority sizes="100vw" />
          </div>
          <div className="signatureShade" />
          <div className="signatureHeroCopy">
            <p className="eyebrow light">Vita Lima Spa · San Borja y Miraflores</p>
            <h1>Tu momento de volver a ti.</h1>
            <p>Masajes y experiencias de bienestar con atención cercana, precios claros y espacios reales.</p>
            <div className="actions">
              <a className="button sand" href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20reservar`} target="_blank">Reservar ahora</a>
              <a className="textLink lightLink" href="#servicios">Explorar experiencias ↓</a>
            </div>
          </div>
          <div className="signatureStats">
            <span><strong>02</strong>Sedes en Lima</span>
            <span><strong>05</strong>Experiencias principales</span>
            <span><strong>1:1</strong>Atención personalizada</span>
          </div>
        </section>

        <section id="servicios" className="section editorialServices">
          <div className="sectionIntro splitIntro">
            <div><p className="eyebrow">Experiencias</p><h2>El bienestar no se siente igual todos los días.</h2></div>
            <p>Por eso cada sesión comienza escuchando qué necesita tu cuerpo. Elige una opción y nosotros te orientamos.</p>
          </div>
          <div className="serviceEditorialGrid">
            {services.map((service, index) => (
              <article className={`editorialCard card-${index + 1}`} key={service.name}>
                <div className="editorialPhoto"><Image src={service.image} alt={service.name} fill sizes="(max-width: 760px) 100vw, 40vw" /></div>
                <div className="editorialBody">
                  <div className="serviceTop"><span>0{index + 1}</span><small>{service.note}</small></div>
                  <h3>{service.name}</h3>
                  <p>{service.text}</p>
                  <div className="serviceBottom"><span>{service.duration}</span><strong>{service.price}</strong></div>
                  <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hola Vita Lima, quiero reservar ${service.name}`)}`} target="_blank">Consultar disponibilidad ↗</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experiencias" className="signatureExperiences">
          <div className="experienceMain">
            <Image src="/images/signature/couple-room.webp" alt="Cabina doble para masajes en pareja" fill sizes="65vw" />
            <div className="experienceOverlay"><p className="eyebrow light">Para compartir</p><h2>Una pausa para dos.</h2><p>Masajes coordinados para parejas, amistades o una ocasión especial.</p><a href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20consultar%20por%20masajes%20para%20dos`} target="_blank">Consultar disponibilidad →</a></div>
          </div>
          <div className="experienceSide">
            <article className="giftPanel"><p className="eyebrow">Para regalar</p><h3>Gift Cards</h3><p>Una experiencia con dedicatoria, lista para sorprender.</p><a href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20una%20Gift%20Card`} target="_blank">Solicitar una Gift Card →</a></article>
            <article className="corporatePanel"><p className="eyebrow light">Para equipos</p><h3>Bienestar corporativo</h3><p>Pausas de relajación y propuestas para empresas.</p><a href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20información%20corporativa`} target="_blank">Pedir una propuesta →</a></article>
          </div>
        </section>

        <section className="signatureStory">
          <div className="storyWords"><p className="eyebrow light">La experiencia Vita Lima</p><h2>Bajar el ritmo también es cuidarte.</h2><p>Iluminación cálida, aromas suaves y ambientes preparados para que desconectes desde que llegas.</p><a className="button outlineLight" href="#galeria">Conocer los ambientes</a></div>
          <div className="storyVisual"><Image src="/images/signature/room-wide.webp" alt="Cabina de Vita Lima Spa" fill sizes="55vw" /></div>
        </section>

        <section id="sedes" className="section locationsSignature">
          <div className="sectionIntro"><p className="eyebrow">Dos sedes</p><h2>Más cerca de tu próxima pausa.</h2></div>
          <div className="locationSignatureGrid">
            {site.locations.map((location, index) => (
              <article key={location.name}>
                <div className="locationPhoto"><Image src={index === 0 ? "/images/signature/reception.webp" : "/images/signature/ambience.webp"} alt={`Sede ${location.name}`} fill sizes="50vw" /></div>
                <div className="locationInfo"><span>0{index + 1}</span><h3>{location.name}</h3><p>{location.address}</p><small>{location.schedule}</small><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address + ", Lima")}`} target="_blank">Abrir en Google Maps ↗</a></div>
              </article>
            ))}
          </div>
        </section>

        <section id="resenas" className="signatureReviews">
          <div><p className="eyebrow light">Confianza real</p><h2>Conoce lo que dicen nuestros clientes.</h2><p>Consulta directamente nuestras fichas públicas y opiniones verificables.</p></div>
          <div className="reviewButtons"><a href="https://www.google.com/search?q=Vita+Lima+Spa+rese%C3%B1as" target="_blank"><strong>Google</strong><span>Ver reseñas ↗</span></a><a href="https://www.tripadvisor.com/Search?q=Vita%20Lima%20Spa" target="_blank"><strong>Tripadvisor</strong><span>Ver opiniones ↗</span></a></div>
        </section>

        <section id="galeria" className="section signatureGallery">
          <div className="sectionIntro splitIntro"><div><p className="eyebrow">Vita Lima por dentro</p><h2>Espacios y momentos reales.</h2></div><p>Una mirada honesta a nuestros ambientes, terapias y detalles.</p></div>
          <div className="galleryMosaic">{gallery.map(([src, alt], index) => <figure className={`g${index + 1}`} key={src}><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></figure>)}</div>
        </section>

        <section id="reserva" className="signatureReserve">
          <div className="reserveImage"><Image src="/images/signature/buddha.webp" alt="Detalle de ambientación Vita Lima" fill sizes="42vw" /></div>
          <div className="reservePane"><p className="eyebrow">Reserva</p><h2>Cuéntanos qué necesitas.</h2><p>Déjanos tus datos y continuamos la coordinación por WhatsApp.</p><ReserveForm /></div>
        </section>

        <section id="preguntas" className="section signatureFaq"><div><p className="eyebrow">Antes de reservar</p><h2>Lo esencial, sin letra pequeña.</h2></div><div className="faqList"><details><summary>¿Cómo puedo reservar?</summary><p>Desde el formulario o escribiéndonos directamente por WhatsApp.</p></details><details><summary>¿Atienden a parejas?</summary><p>Sí, coordinamos la atención para dos personas según sede y disponibilidad.</p></details><details><summary>¿Tienen Gift Cards?</summary><p>Sí, puedes regalar una experiencia y añadir una dedicatoria personalizada.</p></details><details><summary>¿Realizan masajes a domicilio?</summary><p>Sí, sujeto a zona, horario y disponibilidad.</p></details><details><summary>¿Puedo reprogramar?</summary><p>Sí, según las condiciones comunicadas al confirmar la reserva.</p></details></div></section>
      </main>
      <footer className="premiumFooter">
        <div className="footerIdentity">
          <Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={665} height={300} />
          <p>Masajes y experiencias de bienestar en San Borja y Miraflores.</p>
        </div>
        <div>
          <strong>Contacto</strong>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">{site.whatsappDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href="#reserva">Solicitar una reserva</a>
        </div>
        <div>
          <strong>Sedes</strong>
          <a href="#sedes">San Borja</a>
          <a href="#sedes">Miraflores</a>
          <a href="#resenas">Reseñas verificables</a>
        </div>
        <div>
          <strong>Información</strong>
          <a href="/politica-de-privacidad">Política de privacidad</a>
          <a href="/terminos-y-condiciones">Términos y condiciones</a>
          <span className="footerNote">© 2026 Vita Lima Spa</span>
        </div>
      </footer>
      <WhatsAppButton />
    </>
  );
}
