import Image from "next/image";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ReserveForm } from "@/components/ReserveForm";
import { site } from "@/content/site";

const experiences = [
  { ...site.services[0], image: "/images/signature/facial-room.webp", icon: "✦" },
  { ...site.services[1], image: "/images/signature/electro.webp", icon: "≈" },
  { ...site.services[2], image: "/images/signature/cupping.webp", icon: "◉" },
  { ...site.services[3], image: "/images/signature/ambience.webp", icon: "◇" },
  { ...site.services[4], image: "/images/signature/couple-room.webp", icon: "♧" },
];

const trustItems = [
  ["♙", "Atención", "personalizada"],
  ["❧", "Ambientes", "privados"],
  ["◷", "Horarios", "coordinados"],
  ["⌖", "Dos sedes", "en Lima"],
  ["✓", "Reserva", "por WhatsApp"],
];

const reviews = [
  { source: "Google", title: "Reseña real seleccionada", text: "Aquí mostraremos una opinión auténtica tomada de la ficha pública de Vita Lima.", author: "Cliente verificado" },
  { source: "Tripadvisor", title: "Experiencia verificable", text: "Esta tarjeta está lista para recibir un comentario real, sin inventar nombres ni puntuaciones.", author: "Viajero verificado" },
  { source: "Google", title: "Confianza antes de reservar", text: "Las reseñas destacadas conservarán su fuente visible y un enlace a la publicación original.", author: "Cliente verificado" },
];

export default function HomePage() {
  const reserveUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Vita Lima, quiero reservar una sesión")}`;

  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="heroV8">
          <Image src="/images/signature/room-wide.webp" alt="Cabina de Vita Lima Spa preparada para una sesión" fill priority sizes="100vw" />
          <div className="heroV8Overlay" />
          <div className="heroV8Content shell">
            <p className="kicker light">Tu momento</p>
            <h1>de volver a ti.</h1>
            <p className="heroLead">Masajes terapéuticos y experiencias de bienestar en San Borja y Miraflores.</p>
            <div className="heroButtons">
              <a className="btn btnOrange" href={reserveUrl} target="_blank" rel="noreferrer">Reservar ahora <span>→</span></a>
              <a className="btn btnGhost" href="#servicios">Conocer experiencias <span>↓</span></a>
            </div>
          </div>
        </section>

        <section className="trustBar" aria-label="Beneficios de Vita Lima Spa">
          <div className="shell trustBarGrid">
            {trustItems.map(([icon, title, subtitle]) => (
              <article key={title}><span className="trustIcon">{icon}</span><p><strong>{title}</strong><small>{subtitle}</small></p></article>
            ))}
          </div>
        </section>

        <section id="servicios" className="sectionV8 servicesV8">
          <div className="shell">
            <div className="sectionHead compactHead">
              <div><p className="kicker">Nuestras experiencias</p><h2>Elige tu momento.</h2><p className="sectionLead">Cinco opciones claras para sentirte mejor.</p></div>
              <a className="miniCta" href={reserveUrl} target="_blank" rel="noreferrer">Consultar disponibilidad →</a>
            </div>
            <div className="serviceCardsV8">
              {experiences.map((service) => (
                <article key={service.name} className="serviceCardV8">
                  <div className="servicePhotoV8"><Image src={service.image} alt={service.name} fill sizes="(max-width:760px) 86vw, 20vw" /></div>
                  <span className="serviceIconV8">{service.icon}</span>
                  <div className="serviceCardBodyV8">
                    <h3>{service.name}</h3>
                    <p>{service.text}</p>
                    <div className="serviceMeta"><span>{service.duration}</span><strong>{service.price}</strong></div>
                    <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hola Vita Lima, quiero reservar ${service.name}`)}`} target="_blank" rel="noreferrer">Reservar →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="resenas" className="reviewsV8">
          <div className="shell reviewsLayoutV8">
            <div className="reviewsSummaryV8">
              <p className="kicker warm">La confianza de nuestros clientes</p>
              <h2>Opiniones reales dentro de la página.</h2>
              <div className="stars">★★★★★</div>
              <p>No publicaremos cifras ni testimonios inventados. Estas tarjetas ya tienen el diseño final y serán reemplazadas por reseñas verificadas.</p>
              <a href="https://www.google.com/search?q=Vita+Lima+Spa+rese%C3%B1as" target="_blank" rel="noreferrer">Ver opiniones públicas ↗</a>
            </div>
            <div className="reviewGridV8">
              {reviews.map((review, index) => (
                <article key={index} className="reviewV8">
                  <div className="reviewSourceV8"><span>{review.source === "Google" ? "G" : "◉"}</span>{review.source}</div>
                  <div className="stars smallStars">★★★★★</div>
                  <h3>{review.title}</h3>
                  <p>“{review.text}”</p>
                  <footer><span className="avatarV8">{review.author.charAt(0)}</span><b>{review.author}</b></footer>
                </article>
              ))}
              <a className="allReviewsV8" href="https://www.google.com/search?q=Vita+Lima+Spa+rese%C3%B1as" target="_blank" rel="noreferrer"><strong>Ver todas las opiniones</strong><span>Google y Tripadvisor</span><i>→</i></a>
            </div>
          </div>
        </section>

        <section className="numbersV8">
          <div className="shell numberGridV8">
            <article><strong>5</strong><span>experiencias principales</span></article>
            <article><strong>2</strong><span>sedes en Lima</span></article>
            <article><strong>S/58</strong><span>servicios desde</span></article>
            <article><strong>1:1</strong><span>atención personalizada</span></article>
          </div>
        </section>

        <section id="experiencias" className="featureV8">
          <div className="featurePhotoV8"><Image src="/images/signature/couple-room.webp" alt="Cabina para masajes en pareja" fill sizes="62vw" /></div>
          <div className="featureCopyV8"><p className="kicker light">Para compartir</p><h2>Una pausa para dos.</h2><p>Masajes coordinados para parejas, amistades o una ocasión especial.</p><a className="btn btnOrange" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Vita Lima, quiero consultar por una experiencia para dos")}`} target="_blank" rel="noreferrer">Consultar disponibilidad →</a></div>
        </section>

        <section className="offersV8">
          <article className="giftV8"><p className="kicker">Para regalar</p><h2>Gift Cards</h2><p>Una experiencia con dedicatoria, lista para sorprender.</p><a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Vita Lima, quiero solicitar una Gift Card")}`} target="_blank" rel="noreferrer">Solicitar Gift Card →</a></article>
          <article className="corporateV8"><p className="kicker light">Para equipos</p><h2>Bienestar corporativo</h2><p>Pausas de relajación y propuestas para empresas.</p><a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Vita Lima, quiero información sobre bienestar corporativo")}`} target="_blank" rel="noreferrer">Pedir una propuesta →</a></article>
        </section>

        <section id="sedes" className="sectionV8 locationsV8">
          <div className="shell">
            <div className="sectionHead"><div><p className="kicker">Dos sedes</p><h2>Más cerca de tu próxima pausa.</h2></div><p className="sectionLead">Elige la sede más cómoda y coordinamos la disponibilidad contigo.</p></div>
            <div className="locationGridV8">
              {site.locations.map((location, index) => (
                <article key={location.name}>
                  <Image src={index === 0 ? "/images/signature/reception.webp" : "/images/signature/ambience.webp"} alt={`Sede ${location.name}`} fill sizes="50vw" />
                  <div className="locationShadeV8" />
                  <div className="locationTextV8"><span>0{index + 1}</span><h3>{location.name}</h3><p>{location.address}</p><small>{location.schedule}</small><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address + " Lima")}`} target="_blank" rel="noreferrer">Abrir en Google Maps ↗</a></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sectionV8 bookingStepsV8">
          <div className="shell">
            <div className="centerHead"><p className="kicker">Reservar es simple</p><h2>De tu consulta a tu sesión.</h2></div>
            <div className="stepsV8">
              {[['01','Cuéntanos','Completa el formulario o escríbenos.'],['02','Te orientamos','Elegimos sede y servicio.'],['03','Confirmamos','Coordinamos fecha y horario.'],['04','Disfrutas','Nos ocupamos del resto.']].map(([n,t,p]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}
            </div>
          </div>
        </section>

        <section id="reserva" className="reserveV8">
          <div className="reserveVisualV8"><Image src="/images/signature/buddha.webp" alt="Ambiente de relajación de Vita Lima Spa" fill sizes="38vw" /></div>
          <div className="reserveContentV8"><p className="kicker">Reserva</p><h2>Cuéntanos qué necesitas.</h2><p>Deja tus datos y abriremos WhatsApp con tu solicitud lista para coordinar.</p><ReserveForm /></div>
        </section>

        <section id="preguntas" className="sectionV8 faqV8">
          <div className="shell faqLayoutV8"><div><p className="kicker">Antes de reservar</p><h2>Lo esencial, sin letra pequeña.</h2></div><div className="faqListV8">
            <details><summary>¿Cómo puedo reservar?</summary><p>Completa el formulario o escríbenos por WhatsApp. Confirmaremos sede, servicio, fecha y disponibilidad.</p></details>
            <details><summary>¿Atienden a parejas?</summary><p>Sí. Coordinamos sesiones para dos según disponibilidad de cabina y terapeutas.</p></details>
            <details><summary>¿Tienen Gift Cards?</summary><p>Sí. Podemos preparar una experiencia para regalar con dedicatoria.</p></details>
            <details><summary>¿Realizan masajes a domicilio?</summary><p>Consulta cobertura, horarios y recargo directamente por WhatsApp.</p></details>
            <details><summary>¿Puedo reprogramar?</summary><p>La reprogramación está sujeta a las políticas y al tiempo de aviso indicado al confirmar.</p></details>
          </div></div>
        </section>
      </main>

      <footer className="footerV8">
        <div className="shell footerGridV8">
          <div className="footerBrandV8"><Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={665} height={300} /><p>Masajes y experiencias de bienestar en San Borja y Miraflores.</p></div>
          <div><b>Contacto</b><a href={`tel:+${site.whatsapp}`}>{site.whatsappDisplay}</a><a href={`mailto:${site.email}`}>{site.email}</a><a href="#reserva">Solicitar una reserva</a></div>
          <div><b>Sedes</b><a href="#sedes">San Borja</a><a href="#sedes">Miraflores</a><a href="#resenas">Opiniones verificables</a></div>
          <div><b>Información</b><a href="/politica-de-privacidad">Política de privacidad</a><a href="/terminos-y-condiciones">Términos y condiciones</a><small>© 2026 Vita Lima Spa</small></div>
        </div>
      </footer>
      <WhatsAppButton />
    </>
  );
}
