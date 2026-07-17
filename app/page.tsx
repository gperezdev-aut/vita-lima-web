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

const benefits = [
  ["01", "Atención personalizada", "Te orientamos según lo que necesita tu cuerpo."],
  ["02", "Dos sedes en Lima", "San Borja y Miraflores, con atención previa reserva."],
  ["03", "Precios claros", "Conoce la duración y el precio antes de coordinar."],
  ["04", "Reserva sencilla", "Déjanos tus datos y continuamos por WhatsApp."],
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
  const reserveUrl = `https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20reservar`;

  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="signatureHero">
          <div className="signatureHeroImage"><Image src="/images/signature/hero.webp" alt="Recepción de Vita Lima Spa" fill priority sizes="100vw" /></div>
          <div className="signatureShade" />
          <div className="signatureHeroCopy">
            <p className="eyebrow light">Vita Lima Spa · San Borja y Miraflores</p>
            <h1>Tu momento de volver a ti.</h1>
            <p>Masajes terapéuticos y experiencias de bienestar con atención cercana, precios claros y reserva sencilla.</p>
            <div className="actions">
              <a className="button sand" href={reserveUrl} target="_blank" rel="noreferrer">Reservar ahora</a>
              <a className="textLink lightLink" href="#servicios">Ver servicios <span>↓</span></a>
            </div>
            <div className="heroTrust" aria-label="Información de confianza">
              <span>Dos sedes en Lima</span><i />
              <span>Atención personalizada</span><i />
              <span>Coordinación por WhatsApp</span>
            </div>
          </div>
        </section>

        <section className="trustStrip" aria-label="Ventajas de Vita Lima">
          {benefits.map(([number, title, text]) => (
            <article key={number}><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></article>
          ))}
        </section>

        <section id="servicios" className="section editorialServices">
          <div className="sectionIntro splitIntro">
            <div><p className="eyebrow">Experiencias</p><h2>Elige la pausa que necesitas hoy.</h2></div>
            <p>Cada sesión comienza escuchando qué necesita tu cuerpo. Revisa las opciones y nosotros te ayudamos a elegir.</p>
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
                  <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hola Vita Lima, quiero reservar ${service.name}`)}`} target="_blank" rel="noreferrer">Consultar disponibilidad <span>↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="resenas" className="reviewsSection">
          <div className="reviewsIntro">
            <p className="eyebrow light">Confianza real</p>
            <h2>Opiniones verificadas, sin inventar comentarios.</h2>
            <p>La sección está preparada para mostrar comentarios reales. Mientras seleccionamos las reseñas exactas, puedes consultar directamente nuestras fichas públicas.</p>
            <div className="reviewScore"><strong>★</strong><span><b>Reseñas reales</b><small>Google y Tripadvisor</small></span></div>
          </div>
          <div className="reviewCards">
            <a className="reviewCard" href="https://www.google.com/search?q=Vita+Lima+Spa+rese%C3%B1as" target="_blank" rel="noreferrer">
              <span className="reviewSource">Google</span><h3>Consulta las opiniones de nuestros clientes</h3><p>Abre la ficha pública y revisa calificaciones y comentarios verificables.</p><b>Ver reseñas en Google ↗</b>
            </a>
            <a className="reviewCard" href="https://www.tripadvisor.com/Search?q=Vita%20Lima%20Spa" target="_blank" rel="noreferrer">
              <span className="reviewSource">Tripadvisor</span><h3>Conoce experiencias compartidas por viajeros</h3><p>Revisa opiniones públicas antes de elegir tu próxima experiencia.</p><b>Ver opiniones en Tripadvisor ↗</b>
            </a>
            <div className="reviewCard reviewPending">
              <span className="reviewSource">Próximamente</span><h3>Comentarios destacados dentro de la web</h3><p>Aquí cargaremos reseñas reales seleccionadas, con su fuente visible.</p><b>Sin comentarios inventados</b>
            </div>
          </div>
        </section>

        <section id="experiencias" className="signatureExperiences">
          <div className="experienceMain">
            <Image src="/images/signature/couple-room.webp" alt="Cabina doble para masajes en pareja" fill sizes="65vw" />
            <div className="experienceOverlay"><p className="eyebrow light">Para compartir</p><h2>Una pausa para dos.</h2><p>Masajes coordinados para parejas, amistades o una ocasión especial.</p><a href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20consultar%20por%20masajes%20para%20dos`} target="_blank" rel="noreferrer">Consultar disponibilidad →</a></div>
          </div>
          <div className="experienceSide">
            <article className="giftPanel"><p className="eyebrow">Para regalar</p><h3>Gift Cards</h3><p>Una experiencia con dedicatoria, lista para sorprender.</p><a href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20una%20Gift%20Card`} target="_blank" rel="noreferrer">Solicitar una Gift Card →</a></article>
            <article className="corporatePanel"><p className="eyebrow light">Para equipos</p><h3>Bienestar corporativo</h3><p>Pausas de relajación y propuestas para empresas.</p><a href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quiero%20información%20corporativa`} target="_blank" rel="noreferrer">Pedir una propuesta →</a></article>
          </div>
        </section>

        <section className="bookingJourney section">
          <div className="sectionIntro centeredIntro"><p className="eyebrow">Reservar es simple</p><h2>De tu consulta a tu sesión, en cuatro pasos.</h2></div>
          <div className="journeyGrid">
            {[['01','Cuéntanos qué necesitas','Completa el formulario o escríbenos por WhatsApp.'],['02','Te orientamos','Revisamos sede, servicio y disponibilidad.'],['03','Confirmamos','Coordinamos horario y condiciones de la reserva.'],['04','Disfrutas tu pausa','Llegas a Vita Lima y nosotros nos ocupamos del resto.']].map(([n,t,p]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}
          </div>
        </section>

        <section className="signatureStory">
          <div className="storyWords"><p className="eyebrow light">La experiencia Vita Lima</p><h2>Bajar el ritmo también es cuidarte.</h2><p>Iluminación cálida, aromas suaves y ambientes preparados para que desconectes desde que llegas.</p><a className="button outlineLight" href="#galeria">Conocer los ambientes</a></div>
          <div className="storyVisual"><Image src="/images/signature/room-wide.webp" alt="Cabina de Vita Lima Spa" fill sizes="55vw" /></div>
        </section>

        <section id="sedes" className="section locationsSignature">
          <div className="sectionIntro splitIntro"><div><p className="eyebrow">Dos sedes</p><h2>Más cerca de tu próxima pausa.</h2></div><p>Elige la sede que te resulte más cómoda y coordinamos contigo la disponibilidad.</p></div>
          <div className="locationSignatureGrid">
            {site.locations.map((location, index) => (
              <article key={location.name}>
                <div className="locationPhoto"><Image src={index === 0 ? "/images/signature/reception.webp" : "/images/signature/ambience.webp"} alt={`Sede ${location.name}`} fill sizes="50vw" /></div>
                <div className="locationInfo"><span>0{index + 1}</span><h3>{location.name}</h3><p>{location.address}</p><small>{location.schedule}</small><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address + ", Lima")}`} target="_blank" rel="noreferrer">Abrir en Google Maps ↗</a></div>
              </article>
            ))}
          </div>
        </section>

        <section id="galeria" className="section signatureGallery">
          <div className="sectionIntro splitIntro"><div><p className="eyebrow">Vita Lima por dentro</p><h2>Espacios y momentos reales.</h2></div><p>Una mirada honesta a nuestros ambientes, terapias y detalles.</p></div>
          <div className="galleryMosaic">{gallery.map(([src, alt], index) => <figure className={`g${index + 1}`} key={src}><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></figure>)}</div>
        </section>

        <section id="reserva" className="signatureReserve">
          <div className="reserveImage"><Image src="/images/signature/buddha.webp" alt="Detalle de ambientación Vita Lima" fill sizes="38vw" /></div>
          <div className="reservePane"><p className="eyebrow">Reserva</p><h2>Cuéntanos qué necesitas.</h2><p>Déjanos tus datos. Al enviar, abriremos WhatsApp con tu solicitud lista para coordinar.</p><ReserveForm /></div>
        </section>

        <section id="preguntas" className="section signatureFaq"><div><p className="eyebrow">Antes de reservar</p><h2>Lo esencial, sin letra pequeña.</h2><p className="faqLead">Resolvemos las dudas más frecuentes antes de coordinar.</p></div><div className="faqList"><details><summary>¿Cómo puedo reservar?</summary><p>Desde el formulario o escribiéndonos directamente por WhatsApp.</p></details><details><summary>¿Atienden a parejas?</summary><p>Sí, coordinamos la atención para dos personas según sede y disponibilidad.</p></details><details><summary>¿Tienen Gift Cards?</summary><p>Sí, puedes regalar una experiencia y añadir una dedicatoria personalizada.</p></details><details><summary>¿Realizan masajes a domicilio?</summary><p>Sí, sujeto a zona, horario y disponibilidad.</p></details><details><summary>¿Puedo reprogramar?</summary><p>Sí, según las condiciones comunicadas al confirmar la reserva.</p></details></div></section>
      </main>

      <footer className="premiumFooter">
        <div className="footerIdentity"><Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={665} height={300} /><p>Masajes y experiencias de bienestar en San Borja y Miraflores.</p></div>
        <div><strong>Contacto</strong><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">{site.whatsappDisplay}</a><a href={`mailto:${site.email}`}>{site.email}</a><a href="#reserva">Solicitar una reserva</a></div>
        <div><strong>Sedes</strong><a href="#sedes">San Borja</a><a href="#sedes">Miraflores</a><a href="#resenas">Opiniones verificables</a></div>
        <div><strong>Información</strong><a href="/politica-de-privacidad">Política de privacidad</a><a href="/terminos-y-condiciones">Términos y condiciones</a><p className="footerNote">© 2026 Vita Lima Spa</p></div>
      </footer>
      <WhatsAppButton />
    </>
  );
}
