import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
];

function whatsappHref(service?: Service) {
  const message = service
    ? `Hola Vita Lima, quisiera reservar el servicio ${service.name}.`
    : "Hola Vita Lima, quisiera recibir orientación para reservar una experiencia.";

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function venueLabel(service: Service) {
  if (service.mode === "HOME") return "Modalidad · A domicilio en Lima";
  return `Sede · ${service.venue}`;
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
          {categorySections.map((section) => (
            <a key={section.category} href={`#${section.category}`}>{section.title}</a>
          ))}
        </div>
      </nav>

      <div className="catalogSections">
        {categorySections.map((section) => {
          const categoryServices = servicesByCategory[section.category];

          return (
            <section className="catalogSection section" id={section.category} key={section.category}>
              <div className="shell">
                <div className="catalogSectionHeader">
                  <div>
                    <p className="eyebrow">{section.eyebrow}</p>
                    <h2>{section.title}</h2>
                  </div>
                  <p>{section.description}</p>
                </div>

                <div className="catalogGrid">
                  {categoryServices.map((service) => (
                    <article className="catalogCard" id={service.slug} key={service.code}>
                      <div className="catalogCardTop">
                        <span>{service.duration} min</span>
                        <strong>S/ {service.price}</strong>
                      </div>
                      <h3>{service.name}</h3>
                      <p className="catalogIncludes">{service.includes}</p>
                      <div className="catalogCardFooter">
                        <span>{venueLabel(service)}</span>
                        <a href={whatsappHref(service)} target="_blank" rel="noreferrer" aria-label={`Reservar ${service.name} por WhatsApp`}>
                          Reservar por WhatsApp <span>→</span>
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

      <footer className="catalogFooter">
        <div className="shell">
          <p>Vita Lima Spa · San Borja & Miraflores</p>
          <Link href="/">Volver al inicio</Link>
        </div>
      </footer>
    </main>
  );
}
