import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import ReserveForm from "@/components/ReserveForm";
import SiteFooter from "@/components/SiteFooter";
import { featuredServices } from "@/content/services";

const featuredServiceImages: Record<string, string> = {
  "relax-vital": "/images/signature/facial.webp",
  "alivio-integral": "/images/signature/cupping.webp",
  "balance-plus": "/images/signature/facial-room.webp",
  relax: "/images/signature/room-wide.webp",
  deluxe: "/images/signature/ambience.webp",
  supreme: "/images/signature/room-stone.webp",
};

const serviceWhatsAppHref = (serviceName: string) =>
  `https://wa.me/51907308415?text=${encodeURIComponent(`Hola Vita Lima, quisiera reservar el servicio ${serviceName}.`)}`;

const reviews = [
  { quote: "Me encantó el ambiente, el aroma y el profesionalismo. Fue una experiencia realmente relajante.", author: "María Claudia N.", source: "Google", rating: "5.0" },
  { quote: "La atención fue excelente y el masaje me ayudó muchísimo. El lugar transmite tranquilidad desde que llegas.", author: "Carla A.", source: "Google", rating: "5.0" },
  { quote: "Un servicio muy profesional, limpio y acogedor. Definitivamente volvería.", author: "Milagritos C.", source: "Tripadvisor", rating: "5.0" },
];

const experiences = [
  { kicker: "Para compartir", title: "Una pausa para dos", text: "Un momento íntimo de descanso, calma y conexión.", image: "/images/signature/couple-room.webp", cta: "Ver experiencia para dos" },
  { kicker: "Para sorprender", title: "Gift Cards", text: "Regala bienestar con una experiencia cuidada de principio a fin.", image: "/images/signature/buddha.webp", cta: "Solicitar Gift Card" },
  { kicker: "Para tu equipo", title: "Bienestar corporativo", text: "Pausas profesionales de relajación para empresas y eventos.", image: "/images/signature/room-wide.webp", cta: "Solicitar propuesta" },
  { kicker: "Donde estés", title: "Masajes a domicilio", text: "Llevamos la experiencia Vita Lima a tu espacio, previa coordinación.", image: "/images/signature/facial.webp", cta: "Consultar disponibilidad" },
];

const faqs = [
  ["¿Cómo reservo?", "Completa el formulario o escríbenos por WhatsApp. Nuestro equipo confirma sede, horario y condiciones."],
  ["¿Trabajan con adelanto?", "Sí. Para una persona se solicita S/10; para dos personas, el 50 %."],
  ["¿Puedo reprogramar?", "Sí, avisando con al menos 24 horas de anticipación."],
  ["¿Atienden parejas?", "Sí. Contamos con experiencias para dos, sujetas a disponibilidad de sede y horario."],
  ["¿Tienen Gift Cards?", "Sí. Se abonan al 100 % y coordinamos contigo la presentación y entrega."],
  ["¿Atienden a domicilio?", "Sí. Ofrecemos opciones de 1 y 2 horas, previa coordinación y según zona."],
];

export default function HomePage() {
  return (
    <main>
      <section id="inicio" className="heroSection">
        <Header />
        <Image className="heroImage" src="/images/hero-vita-lima-premium.png" alt="Ambiente de Vita Lima Spa" fill priority sizes="100vw" />
        <div className="heroShade" />
        <div className="heroContent shell">
          <p className="eyebrow heroEyebrow">Spa boutique · San Borja & Miraflores</p>
          <h1>Es momento<br />de volver a ti.</h1>
          <p className="heroLead">Experiencias de masaje creadas con técnica, cuidado y una atención verdaderamente personalizada.</p>
          <div className="heroButtons">
            <a className="button orangeButton" href="#reserva">Agendar mi momento <span>→</span></a>
            <a className="button ghostButton" href="#servicios">Descubrir experiencias</a>
          </div>
          <div className="heroTrust" aria-label="Indicadores de confianza">
            <div>
              <div className="heroRating" aria-label="Valoración de Google: 4.7 de 5 estrellas">
                <strong>4.7</strong>
                <span className="heroStars" aria-hidden="true">★★★★★</span>
              </div>
              <span>Google · 226 opiniones</span>
            </div>
            <div>
              <div className="heroRating" aria-label="Valoración de Tripadvisor: 4.8 de 5 estrellas">
                <strong>4.8</strong>
                <span className="heroStars" aria-hidden="true">★★★★★</span>
              </div>
              <span>Tripadvisor · 399 opiniones</span>
            </div>
            <div><strong>2</strong><span>Sedes en Lima</span></div>
          </div>
        </div>
      </section>

      <section className="signatureStrip">
        <div className="shell signatureGrid">
          <div><span>01</span><strong>Atención personalizada</strong><p>Cada sesión parte de lo que tu cuerpo necesita.</p></div>
          <div><span>02</span><strong>Ambientes privados</strong><p>Espacios creados para desconectar con calma.</p></div>
          <div><span>03</span><strong>Profesionales del bienestar</strong><p>Técnica, cuidado y trato cercano en cada visita.</p></div>
          <div><span>04</span><strong>Opiniones verificables</strong><p>Más de 600 experiencias compartidas públicamente.</p></div>
        </div>
      </section>

      <section id="servicios" className="section servicesSection">
        <div className="shell">
          <div className="featuredServicesHeader">
            <div>
              <p className="eyebrow">Experiencias Vita Lima</p>
              <h2>Los favoritos de nuestros clientes</h2>
            </div>
            <p>Las experiencias más reservadas por quienes buscan relajarse, aliviar tensiones y compartir un momento especial.</p>
          </div>

          <div className="featuredCarouselWrap">
            <div className="featuredCarousel" aria-label="Servicios favoritos">
              {featuredServices.map((service) => (
                <article className="featuredServiceCard" id={`featured-${service.slug}`} key={service.code}>
                  <div className="featuredServiceImage">
                    <Image src={featuredServiceImages[service.slug]} alt={service.name} fill sizes="(max-width: 760px) 88vw, (max-width: 1100px) 46vw, 30vw" />
                    <span>{service.badge}</span>
                  </div>
                  <div className="featuredServiceBody">
                    <h3>{service.name}</h3>
                    <div className="featuredServiceMeta">
                      <span>{service.duration} min</span>
                      <strong>S/ {service.price}</strong>
                    </div>
                    <a href={serviceWhatsAppHref(service.name)} target="_blank" rel="noreferrer" aria-label={`Reservar ${service.name} por WhatsApp`}>
                      Reservar <span>→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="featuredCarouselArrows" aria-label="Controles del carrusel">
              <a href="#featured-relax-vital" aria-label="Volver al inicio del carrusel">←</a>
              <a href="#featured-relax" aria-label="Avanzar en el carrusel">→</a>
            </div>
          </div>

          <div className="servicesAllAction">
            <Link className="button servicesAllButton" href="/servicios">Ver todos los servicios <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="brandStorySection">
        <div className="shell brandStoryLayout">
          <div className="brandStoryImage"><Image src="/images/signature/room-stone.webp" alt="Cabina de Vita Lima Spa" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          <div className="brandStoryCopy">
            <p className="eyebrow">Nuestra forma de cuidar</p>
            <h2>No se trata solo de un masaje. Se trata de cómo quieres volver a sentirte.</h2>
            <p>En Vita Lima combinamos técnica, escucha y una atmósfera cuidadosamente preparada para que cada visita se sienta privada, profesional y especial.</p>
            <div className="storyPoints"><span>Aromas suaves</span><span>Música seleccionada</span><span>Atención cercana</span><span>Cabinas privadas</span></div>
          </div>
        </div>
      </section>

      <section id="opiniones" className="section reviewsSection">
        <div className="shell">
          <div className="reviewsHeader">
            <div><p className="eyebrow orangeText">Confianza que se construye visita a visita</p><h2>Más de 600 historias de bienestar compartidas por nuestros clientes.</h2></div>
            <div className="ratingSummary">
              <div><strong>4.7</strong><span>Google</span><small>226 opiniones</small></div>
              <div><strong>4.8</strong><span>Tripadvisor</span><small>399 opiniones</small></div>
              <div><strong>N.º 5</strong><span>En Lima</span><small>Spas y bienestar</small></div>
            </div>
          </div>
          <div className="reviewGrid">
            {reviews.map((review) => (
              <article className="reviewCard" key={review.author}>
                <div className="reviewTop"><span className="stars">★★★★★</span><strong>{review.rating}</strong></div>
                <blockquote>“{review.quote}”</blockquote>
                <div className="reviewSource"><span className="avatar">{review.author.charAt(0)}</span><div><strong>{review.author}</strong><small>{review.source}</small></div></div>
              </article>
            ))}
          </div>
          <div className="reviewActions">
            <a href="https://www.google.com/search?q=Vita+Lima+Spa+reseñas" target="_blank" rel="noreferrer">Ver reseñas en Google →</a>
            <a href="https://www.tripadvisor.com/Search?q=Vita%20Lima%20Spa" target="_blank" rel="noreferrer">Ver reseñas en Tripadvisor →</a>
          </div>
        </div>
      </section>

      <section className="whyReturnSection">
        <div className="shell whyReturnLayout">
          <div><p className="eyebrow">Lo que nuestros clientes recuerdan</p><h2>Los detalles que hacen que quieran volver.</h2></div>
          <div className="whyReturnGrid">
            {["El aroma y la calma del ambiente", "El trato profesional y cercano", "La personalización de cada sesión", "La limpieza y privacidad de las cabinas", "La sensación de alivio al terminar", "La facilidad para reservar por WhatsApp"].map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}
          </div>
        </div>
      </section>

      <section id="experiencias" className="section experienceTilesSection">
        <div className="shell">
          <div className="sectionTop editorialTop"><div><p className="eyebrow">Más formas de vivir Vita Lima</p><h2>Experiencias creadas para compartir, regalar y cuidar.</h2></div></div>
          <div className="experienceTiles">
            {experiences.map((item) => (
              <article className="experienceTile" key={item.title}>
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 800px) 88vw, 25vw" />
                <div className="tileShade" />
                <div className="tileContent"><span>{item.kicker}</span><h3>{item.title}</h3><p>{item.text}</p><a href="#reserva">{item.cta} →</a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section stepsSection">
        <div className="shell stepsLayout">
          <div className="stepsHeading"><p className="eyebrow">Concierge Vita Lima</p><h2>Reservar tu experiencia es simple.</h2><p>Te acompañamos personalmente para encontrar el servicio, sede y horario ideales.</p></div>
          <div className="stepsGrid">
            {[['01','Cuéntanos qué buscas','Relajación, alivio, pareja, regalo o una sesión personalizada.'],['02','Te orientamos','Nuestro equipo recomienda la experiencia más adecuada.'],['03','Confirmamos contigo','Coordinamos sede, horario y condiciones por WhatsApp.'],['04','Disfrutas tu momento','Llegas a Vita Lima y nosotros nos ocupamos del resto.']].map(([n,t,p]) => <article className="stepCard" key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section gallerySection">
        <div className="shell galleryLayout">
          <div className="galleryIntro"><p className="eyebrow">Ambientes Vita Lima</p><h2>Privacidad, calma y atención a cada detalle.</h2><p>Una atmósfera pensada para ayudarte a desconectar desde el primer momento.</p></div>
          <div className="galleryGrid">
            {["reception.webp", "room-wide.webp", "room-stone.webp", "ambience.webp"].map((img, index) => <div className={`galleryItem galleryItem${index + 1}`} key={img}><Image src={`/images/signature/${img}`} alt="Ambiente Vita Lima" fill sizes="(max-width: 800px) 100vw, 30vw" /></div>)}
          </div>
        </div>
      </section>

      <section id="sedes" className="section locationsSection">
        <div className="shell sectionTop editorialTop"><div><p className="eyebrow">Dos sedes, una misma experiencia</p><h2>Encuentra tu pausa en Lima.</h2></div></div>
        <div className="shell locationsGrid">
          <article className="locationCard"><Image src="/images/signature/reception.webp" alt="Sede San Borja" fill /><div className="locationShade" /><div className="locationContent"><span>01 · Sede principal</span><h3>San Borja</h3><p>Av. Aviación 3358, oficina 204</p><small>Lunes a sábado · 3:00 p. m. a 8:00 p. m.</small><a href="https://www.google.com/maps/search/?api=1&query=Av.+Aviacion+3358+San+Borja" target="_blank" rel="noreferrer">Cómo llegar →</a></div></article>
          <article className="locationCard"><Image src="/images/signature/buddha.webp" alt="Sede Miraflores" fill /><div className="locationShade" /><div className="locationContent"><span>02 · Previa reserva</span><h3>Miraflores</h3><p>Av. Larco 812, oficina 306</p><small>Atención coordinada previamente</small><a href="https://www.google.com/maps/search/?api=1&query=Av.+Larco+812+Miraflores" target="_blank" rel="noreferrer">Cómo llegar →</a></div></article>
        </div>
      </section>

      <section id="reserva" className="section reservationSection">
        <div className="shell reservationLayout">
          <div className="reservationIntro"><p className="eyebrow">Concierge de reservas</p><h2>Cuéntanos cómo quieres sentirte.</h2><p>Nos comunicaremos contigo personalmente para ayudarte a elegir la experiencia ideal y confirmar disponibilidad.</p><ul><li>Orientación personalizada</li><li>Confirmación por WhatsApp</li><li>Sin cobros desde este formulario</li></ul></div>
          <ReserveForm />
        </div>
      </section>

      <section id="preguntas" className="section faqSection">
        <div className="shell faqLayout">
          <div><p className="eyebrow">Antes de tu visita</p><h2>Todo claro, desde el inicio.</h2></div>
          <div className="faqGrid">{faqs.map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      <SiteFooter context="home" />
      <WhatsAppButton />
    </main>
  );
}
