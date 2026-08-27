import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import JsonLd from "@/components/JsonLd";
import { servicesByCategory, type Service, type ServiceCategory } from "@/content/services";
import { buildServicesJsonLd } from "@/content/structured-data";
import { BLUR_DATA_URL } from "@/lib/blurPlaceholder";
import { serviceSummary } from "@/lib/serviceSummary";

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
  facial: [
    "/images/signature/facial.webp",
    "/images/signature/facial-room.webp",
    "/images/generated/foot.webp",
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
    category: "facial",
    title: "Faciales",
    eyebrow: "Piel cuidada",
    description: "Limpiezas y tratamientos faciales independientes, sin necesidad de combinarlos con un masaje.",
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

function serviceImage(category: ServiceCategory, index: number) {
  const images = catalogImages[category];
  return images[index % images.length];
}

export default function ServicesPage() {
  return (
    <main className="servicesCatalogPage">
      <JsonLd data={buildServicesJsonLd()} />
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
          <a href="#facial">Faciales</a>
          <a href="#home">Domicilio</a>
          <a href="#program">Programas</a>
          <a href="#mirada-y-belleza">MIRADA Y BELLEZA</a>
          <a href="/empresas">Empresas</a>
          <a href="/regalos">Gift Cards</a>
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
                        <Image src={serviceImage(section.category, index)} alt={service.name} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                        {service.badge && <span>{service.badge}</span>}
                      </div>
                      <div className="catalogCardBody">
                        <h3>{service.name}</h3>
                        <div className="catalogCardTop">
                          <span>{service.duration} min</span>
                          <span className="priceNow">
                            {service.originalPrice && (
                              <s className="priceOld">
                                <span className="srOnly">Antes </span>
                                S/ {service.originalPrice}
                              </s>
                            )}
                            <strong>
                              {service.originalPrice && <span className="srOnly">Ahora </span>}
                              S/ {service.price}
                            </strong>
                          </span>
                        </div>
                        <p className="catalogIncludes" title={service.includes}>{serviceSummary(service.includes)}</p>
                        <AddToCartButton
                          className="catalogReserveButton"
                          label="Agregar"
                          item={{ id: service.slug, name: service.name, price: service.price, meta: `${service.duration} min` }}
                        />
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
