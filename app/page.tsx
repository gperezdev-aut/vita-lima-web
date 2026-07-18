import Image from "next/image";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ReserveForm } from "@/components/ReserveForm";
import { site } from "@/content/site";

const serviceImages = [
  "/images/signature/facial-room.webp",
  "/images/signature/electro.webp",
  "/images/signature/cupping.webp",
  "/images/signature/ambience.webp",
  "/images/signature/couple-room.webp",
];

const benefits = [
  ["✦", "Atención personalizada"],
  ["◌", "Ambientes privados"],
  ["⌖", "San Borja y Miraflores"],
  ["◷", "Horarios coordinados"],
  ["✓", "Reserva por WhatsApp"],
];

const steps = [
  ["01", "Cuéntanos qué necesitas", "Elige sede, servicio y horario tentativo."],
  ["02", "Te orientamos", "Revisamos contigo la mejor opción."],
  ["03", "Confirmamos", "Coordinamos disponibilidad y adelanto."],
  ["04", "Disfrutas tu pausa", "Llegas y nosotros nos ocupamos del resto."],
];

export default function HomePage() {
  const reserveUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Vita Lima, quiero reservar una sesión")}`;

  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="signatureHero">
          <Image src="/images/signature/room-wide.webp" alt="Cabina de Vita Lima Spa" fill priority sizes="100vw" />
          <div className="signatureHeroShade" />
          <div className="signatureHeroContent shell">
            <p className="eyebrow">VITA LIMA SPA · SAN BORJA Y MIRAFLORES</p>
            <h1>Tu momento<br />de volver a ti.</h1>
            <p className="signatureLead">Masajes terapéuticos y experiencias de bienestar con atención cercana, precios claros y reserva sencilla.</p>
            <div className="heroActions">
              <a className="primaryAction" href={reserveUrl} target="_blank" rel="noreferrer">Reservar ahora <span>→</span></a>
              <a className="secondaryAction" href="#servicios">Explorar experiencias <span>↓</span></a>
            </div>
          </div>
        </section>

        <section className="benefitStrip" aria-label="Beneficios">
          <div className="shell benefitGrid">
            {benefits.map(([icon, label]) => <article key={label}><span>{icon}</span><strong>{label}</strong></article>)}
          </div>
        </section>

        <section id="servicios" className="signatureSection servicesSignature">
          <div className="shell">
            <div className="splitHeading">
              <div><p className="eyebrow orange">NUESTRAS EXPERIENCIAS</p><h2>Elige tu momento.</h2></div>
              <p>Cada sesión está pensada para una necesidad concreta. Elige una opción y te ayudamos a coordinar.</p>
            </div>
            <div className="compactServices">
              {site.services.map((service, index) => (
                <article className="compactService" key={service.name}>
                  <div className="compactPhoto"><Image src={serviceImages[index]} alt={service.name} fill sizes="(max-width: 760px) 85vw, 20vw" /></div>
                  <div className="compactBody">
                    <div className="serviceTop"><span>0{index + 1}</span><small>{service.duration}</small></div>
                    <h3>{service.name}</h3>
                    <p>{service.text}</p>
                    <div className="serviceBottom"><strong>{service.price}</strong><a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hola Vita Lima, quiero reservar ${service.name}`)}`} target="_blank" rel="noreferrer">Reservar →</a></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="resenas" className="socialProof">
          <div className="shell proofLayout">
            <div className="proofIntro">
              <p className="eyebrow peach">CONFIANZA REAL</p>
              <h2>Lo que dicen nuestros clientes.</h2>
              <p>La sección está lista para mostrar comentarios reales de Google y Tripadvisor. No publicaremos nombres, cifras ni opiniones inventadas.</p>
              <a href="https://www.google.com/search?q=Vita+Lima+Spa+rese%C3%B1as" target="_blank" rel="noreferrer">Ver reseñas verificables ↗</a>
            </div>
            <div className="proofCards">
              {["Google", "Tripadvisor", "Google"].map((source, index) => (
                <article key={index}>
                  <div className="sourceRow"><span>{source === "Google" ? "G" : "T"}</span><b>{source}</b></div>
                  <div className="stars">★★★★★</div>
                  <blockquote>“Aquí aparecerá una reseña real seleccionada, con su fuente visible y enlace verificable.”</blockquote>
                  <small>Cliente verificado</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencias" className="editorialStory">
          <div className="storyImage"><Image src="/images/signature/couple-room.webp" alt="Cabina para dos" fill sizes="60vw" /></div>
          <div className="storyCopy">
            <p className="eyebrow peach">PARA COMPARTIR</p>
            <h2>Una pausa para dos.</h2>
            <p>Masajes coordinados para parejas, amistades o una ocasión especial.</p>
            <a className="outlineLight" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Vita Lima, quiero consultar por una experiencia para dos")}`} target="_blank" rel="noreferrer">Consultar disponibilidad →</a>
          </div>
        </section>

        <section className="threeOffers">
          <article><p className="eyebrow orange">PARA REGALAR</p><h3>Gift Cards</h3><p>Una experiencia con dedicatoria, lista para sorprender.</p><a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Vita Lima, quiero una Gift Card")}`} target="_blank" rel="noreferrer">Solicitar Gift Card →</a></article>
          <article><p className="eyebrow peach">PARA EQUIPOS</p><h3>Bienestar corporativo</h3><p>Pausas de relajación y propuestas para empresas.</p><a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Vita Lima, quiero información corporativa")}`} target="_blank" rel="noreferrer">Pedir propuesta →</a></article>
          <article><p className="eyebrow orange">A DOMICILIO</p><h3>Tu pausa, donde estés</h3><p>Consulta disponibilidad y recargo según zona.</p><a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Vita Lima, quiero consultar por masaje a domicilio")}`} target="_blank" rel="noreferrer">Consultar cobertura →</a></article>
        </section>

        <section className="signatureSection processSection">
          <div className="shell">
            <div className="centerSignature"><p className="eyebrow orange">RESERVAR ES SIMPLE</p><h2>De tu consulta a tu sesión,<br />en cuatro pasos.</h2></div>
            <div className="processGrid">{steps.map(([n,t,p]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div>
          </div>
        </section>

        <section className="atmosphereStory">
          <div className="atmosphereCopy"><p className="eyebrow peach">LA EXPERIENCIA VITA LIMA</p><h2>Bajar el ritmo también es cuidarte.</h2><p>Iluminación cálida, aromas suaves y ambientes preparados para que desconectes desde que llegas.</p><a href="#galeria" className="outlineLight">Conocer los ambientes</a></div>
          <div className="atmosphereImage"><Image src="/images/signature/ambience.webp" alt="Ambiente Vita Lima" fill sizes="55vw" /></div>
        </section>

        <section id="sedes" className="signatureSection locationSignature">
          <div className="shell">
            <div className="splitHeading"><div><p className="eyebrow orange">DOS SEDES</p><h2>Más cerca de tu próxima pausa.</h2></div><p>Elige la sede que te resulte más cómoda y coordinamos contigo la disponibilidad.</p></div>
            <div className="locationCards">
              {site.locations.map((location,index) => <article key={location.name}><Image src={index===0?"/images/signature/reception.webp":"/images/signature/ambience.webp"} alt={location.name} fill sizes="50vw"/><div className="locationShade"/><div><span>0{index+1}</span><h3>{location.name}</h3><p>{location.address}</p><small>{location.schedule}</small><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address + " Lima")}`} target="_blank" rel="noreferrer">Abrir en Google Maps ↗</a></div></article>)}
            </div>
          </div>
        </section>

        <section id="galeria" className="signatureSection gallerySignature">
          <div className="shell"><div className="splitHeading"><div><p className="eyebrow orange">VITA LIMA POR DENTRO</p><h2>Espacios y momentos reales.</h2></div><p>Una mirada honesta a nuestros ambientes, terapias y detalles.</p></div>
            <div className="galleryGrid"><div><Image src="/images/signature/reception.webp" alt="Recepción" fill sizes="42vw"/></div><div><Image src="/images/signature/couple-room.webp" alt="Cabina" fill sizes="32vw"/></div><div><Image src="/images/signature/buddha.webp" alt="Detalle" fill sizes="22vw"/></div><div><Image src="/images/signature/cupping.webp" alt="Terapia" fill sizes="22vw"/></div></div>
          </div>
        </section>

        <section id="reserva" className="reserveSignature">
          <div className="reserveImage"><Image src="/images/signature/buddha.webp" alt="Ambiente de Vita Lima" fill sizes="38vw"/></div>
          <div className="reserveCopy"><p className="eyebrow orange">RESERVA</p><h2>Cuéntanos qué necesitas.</h2><p>Deja tus datos. Al enviar, abriremos WhatsApp con tu solicitud lista para coordinar.</p><ReserveForm/></div>
        </section>

        <section id="preguntas" className="signatureSection faqSignature">
          <div className="shell faqSignatureGrid"><div><p className="eyebrow orange">ANTES DE RESERVAR</p><h2>Lo esencial,<br />sin letra pequeña.</h2><p>Resolvemos las dudas más frecuentes antes de coordinar.</p></div><div>
            {[["¿Cómo puedo reservar?","Completa el formulario o escríbenos por WhatsApp."],["¿Atienden a parejas?","Sí, coordinamos sesiones para dos según disponibilidad."],["¿Tienen Gift Cards?","Sí, con dedicatoria y pago completo."],["¿Realizan masajes a domicilio?","Sí, previa coordinación y recargo según zona."],["¿Puedo reprogramar?","Sí, avisando con al menos 24 horas de anticipación."]].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div></div>
        </section>
      </main>
      <footer className="signatureFooter"><div className="shell footerSignatureGrid"><div><Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={260} height={120}/><p>Masajes y experiencias de bienestar en San Borja y Miraflores.</p></div><div><b>Contacto</b><a href={`https://wa.me/${site.whatsapp}`}>{site.whatsappDisplay}</a><a href={`mailto:${site.email}`}>{site.email}</a><a href="#reserva">Solicitar una reserva</a></div><div><b>Sedes</b><a href="#sedes">San Borja</a><a href="#sedes">Miraflores</a><a href="#resenas">Opiniones verificables</a></div><div><b>Información</b><a href="/privacidad">Política de privacidad</a><a href="/terminos">Términos y condiciones</a><small>© 2026 Vita Lima Spa</small></div></div></footer>
      <WhatsAppButton />
    </>
  );
}
