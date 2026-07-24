import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { servicesByCategory, type Service, type ServiceCategory } from "@/content/services";

export const metadata: Metadata = {
  title: "Experiencias Vita Lima | Catálogo de masajes y bienestar",
  description: "Conoce los masajes individuales, experiencias para dos, servicios a domicilio y programas de sesiones de Vita Lima Spa.",
  openGraph: {
    title: "Experiencias Vita Lima",
    description: "Catálogo completo de masajes y experiencias de bienestar en Lima.",
    type: "website",
  },
};

const whatsappNumber = "51907308415";

const catalogImages: Record<ServiceCategory, string[]> = {
  individual: [
    "/images/servicios/servicio-01.webp",
    "/images/servicios/servicio-02.webp",
    "/images/servicios/servicio-03.webp",
  ],
  couples: [
    "/images/signature/couple-room.webp",
    "/images/real/room_pair.webp",
    "/images/v4/room-pair.webp",
  ],
  home: [
    "/images/servicios/servicio-07.webp",
    "/images/servicios/servicio-08.webp",
  ],
  program: [
    "/images/signature/room-stone.webp",
    "/images/signature/ambience.webp",
  ],
  beauty: [
    "/images/v4/facial.webp",
    "/images/real/facial_real.webp",
    "/images/v4/facial-room.webp",
  ],
};

const categorySections: Array<{
  category: ServiceCategory;
  title: string;
  eyebrow: string;
  description: string;
}> = [
  {
    category: "individual",
    title: "Masajes individuales",
    eyebrow: "Tu momento",
    description: "Experiencias para aliviar tensión, recuperar energía y volver a sentirte bien.",
  },
  {
    category: "couples",
    title: "Experiencias para dos",
    eyebrow: "Para compartir",
    description: "Pausas creadas para disfrutar en pareja o con alguien especial.",
  },
  {
    category: "home",
    title: "Masajes a domicilio",
    eyebrow: "Donde estés",
    description: "La atención Vita Lima en tu espacio, con coordinación previa.",
  },
  {
    category: "program",
    title: "Programas de sesiones",
    eyebrow: "Bienestar continuo",
    description: "Programas para dar continuidad a tu cuidado y tus objetivos de bienestar.",
  },
  {
    category: "beauty",
    title: "Mirada y belleza",
    eyebrow: "REALZA TU MIRADA",
    description: "Tratamientos para realzar pestañas y cejas con un acabado natural y cuidado.",
  },
];

function whatsappHref(service?: Service) {
  const message = service
    ? `Hola Vita Lima, quisiera reservar el servicio ${service.name}.`
    : "Hola Vita Lima, quisiera recibir orientación para reservar una experiencia.";

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function serviceSummary(includes: string) {
  const separators = [" + ", ". "];
  const end = separators
    .map((separator) => includes.indexOf(separator))
    .filter((index) => index > 0)
    .sort((a, b) => a - b)[0];

  return end ? includes.slice(0, end) : includes;
}

function serviceImage(category: ServiceCategory, index: number) {
  const images = catalogImages[category];
  return images[index % images.length];
}

export default function ServicesPage() {
  return (
    <main className="servicesCatalogPage">
      <header className="catalogHeader">
        <div className="catalogNav shell">
          <Link href="/" aria-label="Vita Lima Spa - Inicio">
            <Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={180} height={78} priority />
          </Link>
          <Link className="catalogBackLink" href="/">Volver al inicio</Link>
        </div>
        <div className="catalogHero shell">
          <p className="eyebrow catalogEyebrow">Catálogo oficial</p>
          <h1>Experiencias Vita Lima</h1>
          <p>Encuentra el masaje o programa que mejor acompaña lo que necesitas hoy.</p>
          <a className="button orangeButton" href={whatsappHref()} target="_blank" rel="noreferrer">
            Reservar por WhatsApp <span>→</span>
          </a>
        </div>
      </header>

      <nav className="catalogCategoryNav" aria-label="Categorías de servicios">
        <div className="shell">
          <a href="#catalogo">Todos</a>
          <a href="#individual">Individuales</a>
          <a href="#couples">Para dos</a>
          <a href="#home">Domicilio</a>
          <a href="#program">Programas</a>
          <a href="#mirada-y-belleza">MIRADA Y BELLEZA</a>
        </div>
      </nav>

      <div className="catalogSections" id="catalogo">
        {categorySections.map((section) => {
          const categoryServices = servicesByCategory[section.category];

          return (
            <section
              className="catalogSection section"
              id={section.category === "beauty" ? "mirada-y-belleza" : section.category}
              key={section.category}
            >
              <div className="shell">
                <div className="catalogSectionHeader">
                  <div>
                    <p className="eyebrow">{section.eyebrow}</p>
                    <h2>{section.title}</h2>
                  </div>
                  <p>{section.description}</p>
                </div>

                <div className="catalogGrid">
                  {categoryServices.map((service, index) => (
                    <article className="catalogCard" id={service.slug} key={service.code}>
                      <div className="catalogCardImage">
                        <Image src={serviceImage(section.category, index)} alt={service.name} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                      </div>
                      <div className="catalogCardBody">
                        <h3>{service.name}</h3>
                        <div className="catalogCardTop">
                          <span>{service.duration} min</span>
                          <strong>S/ {service.price}</strong>
                        </div>
                        <p className="catalogIncludes" title={service.includes}>{serviceSummary(service.includes)}</p>
                        <a className="catalogReserveButton" href={whatsappHref(service)} target="_blank" rel="noreferrer" aria-label={`Reservar ${service.name} por WhatsApp`}>
                          Reservar <span>→</span>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <SiteFooter context="internal" />
    </main>
  );
}
