import Image from "next/image";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import ReserveForm from "@/components/ReserveForm";

const services = [
  { name: "Relax Vital", duration: "60 min", price: "S/70", desc: "Una pausa profunda para bajar el ritmo y respirar.", image: "/images/signature/facial.webp", icon: "✦" },
  { name: "Espalda Libre", duration: "45 min", price: "S/58", desc: "Movilidad y alivio para espalda, cuello y hombros.", image: "/images/signature/electro.webp", icon: "◌" },
  { name: "Alivio Integral", duration: "60 min", price: "S/80", desc: "Atención completa para músculos cansados y tensión acumulada.", image: "/images/signature/cupping.webp", icon: "◉" },
  { name: "Terapia Vita", duration: "60 min", price: "S/80", desc: "Una sesión personalizada según lo que tu cuerpo necesita.", image: "/images/signature/ambience.webp", icon: "◇" },
  { name: "Balance Plus", duration: "70 min", price: "S/88", desc: "Más tiempo para desconectar, descansar y renovarte.", image: "/images/signature/facial-room.webp", icon: "∞" },
];

const benefits = [
  ["♙", "Atención personalizada"],
  ["❧", "Aromaterapia y productos premium"],
  ["⌂", "Ambientes privados"],
  ["◷", "Horarios flexibles"],
  ["✓", "Atención segura y cercana"],
  ["★", "Opiniones públicas verificables"],
];

const steps = [
  ["01", "Cuéntanos qué necesitas", "Escríbenos por WhatsApp o completa el formulario."],
  ["02", "Te orientamos", "Revisamos sede, servicio y disponibilidad."],
  ["03", "Confirmamos", "Coordinamos horario y condiciones de tu reserva."],
  ["04", "Disfrutas tu pausa", "Llegas a Vita Lima y nosotros nos ocupamos del resto."],
];

export default function HomePage() {
  return (
    <main>
      <section id="inicio" className="heroSection">
        <Header />
        <Image className="heroImage" src="/images/signature/hero.webp" alt="Ambiente de Vita Lima Spa" fill priority sizes="100vw" />
        <div className="heroShade" />
        <div className="heroContent shell">
          <p className="eyebrow heroEyebrow">Masajes terapéuticos y experiencias de bienestar</p>
          <h1>Tu momento<br />de volver a ti.</h1>
          <p className="heroLead">Relájate, desconecta y recupera energía en San Borja y Miraflores.</p>
          <div className="heroButtons">
            <a className="button orangeButton" href="#reserva">Reservar por WhatsApp <span>→</span></a>
            <a className="button ghostButton" href="#servicios">Conocer experiencias <span>↓</span></a>
          </div>
        </div>
      </section>

      <section className="benefitStrip" aria-label="Beneficios de Vita Lima">
        <div className="benefitGrid shell">
          {benefits.map(([icon, text]) => (
            <div className="benefitItem" key={text}><span>{icon}</span><strong>{text}</strong></div>
          ))}
        </div>
      </section>

      <section id="servicios" className="section servicesSection">
        <div className="shell">
          <div className="sectionTop compactTop">
            <div><p className="eyebrow">Nuestros masajes</p><h2>Elige la pausa que necesitas hoy.</h2></div>
            <a className="textLink" href="#reserva">Ver todos los servicios →</a>
          </div>
          <div className="serviceGrid">
            {services.map((service) => (
              <article className="serviceCard" key={service.name}>
                <div className="serviceImageWrap">
                  <Image src={service.image} alt={service.name} fill sizes="(max-width: 800px) 82vw, 20vw" />
                  <span className="serviceIcon">{service.icon}</span>
                </div>
                <div className="serviceBody">
                  <h3>{service.name}</h3>
                  <p>{service.desc}</p>
                  <div className="serviceMeta"><span>{service.duration}</span><strong>{service.price}</strong></div>
                  <a href="#reserva">Reservar →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="opiniones" className="section reviewsSection">
        <div className="shell">
          <div className="sectionTop reviewsTop">
            <div><p className="eyebrow orangeText">La confianza de nuestros clientes</p><h2>Opiniones reales,<br />experiencias que hablan.</h2></div>
            <a className="textLink lightLink" href="https://www.google.com/search?q=Vita+Lima+Spa+reseñas" target="_blank" rel="noreferrer">Ver opiniones verificadas →</a>
          </div>
          <div className="reviewGrid">
            {[
              ["Google", "Consulta nuestras calificaciones y comentarios públicos.", "Abrir Google"],
              ["Tripadvisor", "Conoce experiencias compartidas por viajeros.", "Abrir Tripadvisor"],
              ["Reseñas verificables", "Mostramos solo fuentes públicas y nunca inventamos testimonios.", "Ver fuentes"],
              ["Tu experiencia", "Después de tu visita, tu opinión también ayuda a otros clientes.", "Reservar ahora"],
            ].map(([source, text, action], i) => (
              <article className="reviewCard" key={source}>
                <div className="stars">★★★★★</div>
                <p>{text}</p>
                <div className="reviewSource"><span className="avatar">{i + 1}</span><strong>{source}</strong></div>
                <a href={i === 3 ? "#reserva" : "https://www.google.com/search?q=Vita+Lima+Spa+reseñas"}>{action} →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experiencias" className="section experienceTilesSection">
        <div className="shell experienceTiles">
          {[
            ["Para dos", "Un momento especial para compartir.", "/images/signature/couple-room.webp"],
            ["Gift Cards", "Sorprende a alguien con una experiencia de bienestar.", "/images/signature/buddha.webp"],
            ["Para empresas", "Bienestar y pausas de relajación para tu equipo.", "/images/signature/room-wide.webp"],
            ["Masajes a domicilio", "Llevamos la pausa donde estés.", "/images/signature/facial.webp"],
          ].map(([title, desc, image]) => (
            <article className="experienceTile" key={title}>
              <Image src={image} alt={title} fill sizes="(max-width: 800px) 85vw, 25vw" />
              <div className="tileShade" />
              <div><h3>{title}</h3><p>{desc}</p><a href="#reserva">Conocer más →</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section stepsSection">
        <div className="shell stepsLayout">
          <div className="stepsHeading"><p className="eyebrow">Reservar es simple</p><h2>De tu consulta a tu sesión, en cuatro pasos.</h2></div>
          <div className="stepsGrid">
            {steps.map(([number, title, text]) => (
              <article className="stepCard" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section gallerySection">
        <div className="shell galleryLayout">
          <div className="galleryIntro"><p className="eyebrow">Así es Vita Lima</p><h2>Ambientes creados para tu bienestar.</h2></div>
          <div className="galleryGrid">
            {["reception.webp", "room-wide.webp", "room-stone.webp", "ambience.webp"].map((img) => (
              <div className="galleryItem" key={img}><Image src={`/images/signature/${img}`} alt="Ambiente Vita Lima" fill sizes="(max-width: 800px) 70vw, 20vw" /></div>
            ))}
            <a className="galleryCta" href="#sedes">Ver galería<br />completa →</a>
          </div>
        </div>
      </section>

      <section id="sedes" className="section locationsSection">
        <div className="shell locationsGrid">
          <article className="locationCard"><Image src="/images/signature/reception.webp" alt="Sede San Borja" fill /><div className="locationShade" /><div><span>01</span><h3>San Borja</h3><p>Av. Aviación 3358, oficina 204</p><a href="https://www.google.com/maps/search/?api=1&query=Av.+Aviacion+3358+San+Borja" target="_blank" rel="noreferrer">Abrir en Google Maps →</a></div></article>
          <article className="locationCard"><Image src="/images/signature/buddha.webp" alt="Sede Miraflores" fill /><div className="locationShade" /><div><span>02</span><h3>Miraflores</h3><p>Av. Larco 812, oficina 306</p><a href="https://www.google.com/maps/search/?api=1&query=Av.+Larco+812+Miraflores" target="_blank" rel="noreferrer">Abrir en Google Maps →</a></div></article>
        </div>
      </section>

      <section id="reserva" className="section reservationSection">
        <div className="shell reservationLayout">
          <div className="reservationIntro"><p className="eyebrow">Reserva tu momento</p><h2>Déjanos tus datos y coordinamos contigo.</h2><ul><li>Respuesta por WhatsApp</li><li>Sin cobros dentro del formulario</li><li>Atención personalizada</li></ul></div>
          <ReserveForm />
        </div>
      </section>

      <section id="preguntas" className="section faqSection">
        <div className="shell faqLayout">
          <div><p className="eyebrow">Preguntas frecuentes</p><h2>Resolvemos tus dudas más comunes.</h2></div>
          <div className="faqGrid">
            {[
              ["¿Cómo puedo reservar?", "Completa el formulario o escríbenos por WhatsApp. Confirmamos disponibilidad y condiciones contigo."],
              ["¿Atienden a parejas?", "Sí. Coordinamos sesiones para dos según la sede y el horario disponible."],
              ["¿Tienen Gift Cards?", "Sí. Podemos preparar una experiencia con dedicatoria para regalar."],
              ["¿Realizan masajes a domicilio?", "Sí, sujeto a zona, horario y disponibilidad."],
              ["¿Puedo reprogramar?", "Sí, de acuerdo con las políticas vigentes y comunicándolo con anticipación."],
              ["¿Cuáles son sus métodos de pago?", "Coordinamos el método de pago durante la confirmación de tu reserva."],
            ].map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footerGrid">
          <div className="footerBrand"><Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={180} height={78} /><p>Masajes terapéuticos y experiencias de bienestar en San Borja y Miraflores.</p></div>
          <div><h4>Contacto</h4><a href="tel:+51907308415">+51 907 308 415</a><a href="mailto:info@vitalimaspa.com">info@vitalimaspa.com</a><a href="#reserva">Escríbenos por WhatsApp</a></div>
          <div><h4>Sedes</h4><a href="#sedes">San Borja</a><a href="#sedes">Miraflores</a><a href="#sedes">Ver en Google Maps</a></div>
          <div><h4>Información</h4><a href="/politica-de-privacidad">Política de privacidad</a><a href="/terminos-y-condiciones">Términos y condiciones</a><a href="#preguntas">Preguntas frecuentes</a></div>
          <div><h4>Síguenos</h4><div className="socialRow"><span>◎</span><span>f</span><span>◉</span></div></div>
        </div>
        <div className="shell footerBottom">© 2026 Vita Lima Spa. Todos los derechos reservados.</div>
      </footer>

      <WhatsAppButton />
    </main>
  );
}
