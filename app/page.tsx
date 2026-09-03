"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import ReserveForm from "@/components/ReserveForm";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ConsentMap from "@/components/ConsentMap";
import { featuredServices } from "@/content/services";
import { locations } from "@/content/locations";
import { buildOrganizationJsonLd, buildFaqJsonLd, buildWebSiteJsonLd } from "@/content/structured-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

// Cada servicio muestra 2-3 fotos que rotan automáticamente en su tarjeta.
const featuredServiceImages: Record<string, string[]> = {
  "relax-vital": [
    "/images/relax-vital/relax-01-shoulders.webp",
    "/images/relax-vital/relax-02-pressure.webp",
    "/images/relax-vital/relax-03-palms.webp",
    "/images/relax-vital/relax-04-reflexology.webp",
  ],
  "alivio-integral": [
    "/images/alivio-integral/alivio-01-hombros.webp",
    "/images/alivio-integral/alivio-02-cuello.webp",
    "/images/alivio-integral/alivio-03-reflexologia.webp",
    "/images/alivio-integral/alivio-04-lumbar.webp",
  ],
  "balance-plus": [
    "/images/balance-plus/balance-01-piedras-calientes.webp",
    "/images/balance-plus/balance-02-reflexologia.webp",
    "/images/balance-plus/balance-03-exfoliacion-espalda.webp",
    "/images/balance-plus/balance-04-masaje.webp",
  ],
  relax: [
    "/images/relax/relax-01-piedras-aromaterapia.webp",
    "/images/relax/relax-02-reflexologia-podal.webp",
    "/images/relax/relax-03-vino-o-infusion.webp",
    "/images/relax/relax-04-masaje.webp",
  ],
  deluxe: [
    "/images/deluxe/deluxe-01-piedras-aromaterapia.webp",
    "/images/deluxe/deluxe-02-facial-colageno.webp",
    "/images/deluxe/deluxe-03-reflexologia-podal.webp",
    "/images/deluxe/deluxe-04-vino-o-infusion.webp",
  ],
  supreme: [
    "/images/supreme/supreme-01-piedras-aromaterapia.webp",
    "/images/supreme/supreme-02-exfoliacion-hidratacion.webp",
    "/images/supreme/supreme-03-facial-hialuronico.webp",
    "/images/supreme/supreme-04-reflexologia-podal.webp",
    "/images/supreme/supreme-05-descanso-pareja.webp",
  ],
  "lifting-tinturado-planchado-cejas": [
    "/images/lifting-pestanas-cejas/lifting-01-pestanas.webp",
    "/images/lifting-pestanas-cejas/lifting-02-planchado-cejas.webp",
    "/images/lifting-pestanas-cejas/lifting-03-tinturado.webp",
    "/images/lifting-pestanas-cejas/lifting-04-resultado.webp",
  ],
};

// Reseñas reales de clientes: se muestran siempre en su idioma original
// (español), en ambas versiones del sitio. Traducir una reseña real y
// presentarla como si fueran las palabras del cliente no sería honesto;
// el resto de la página sí se traduce por completo.
const reviews = [
  { quote: "Me encantó el ambiente, el aroma y el profesionalismo. Fue una experiencia realmente relajante.", author: "María Claudia N.", source: "Google", rating: "5.0" },
  { quote: "La atención fue excelente y el masaje me ayudó muchísimo. El lugar transmite tranquilidad desde que llegas.", author: "Carla A.", source: "Google", rating: "5.0" },
  { quote: "Un servicio muy profesional, limpio y acogedor. Definitivamente volvería.", author: "Milagritos C.", source: "Tripadvisor", rating: "5.0" },
];

const experienceImages = ["/images/signature/couple-room.webp", "/images/signature/buddha.webp", "/images/signature/room-wide.webp", "/images/signature/facial.webp"];
const experienceHrefs = ["/servicios#couples", "/regalos", "/empresas", "/servicios#home"];

const galleryImages = ["reception.webp", "room-wide.webp", "room-stone.webp", "ambience.webp"];

export default function HomePage() {
  const { language } = useLanguage();
  const t = translations[language];
  // El JSON-LD de FAQ es contenido para buscadores, no para el visitante:
  // se mantiene siempre en español, el idioma principal del sitio.
  const faqsForJsonLd = translations.es.faqSection.items.map(({ q, a }) => [q, a] as [string, string]);

  return (
    <main>
      <JsonLd data={buildOrganizationJsonLd()} />
      <JsonLd data={buildWebSiteJsonLd()} />
      <JsonLd data={buildFaqJsonLd(faqsForJsonLd)} />
      <section id="inicio" className="heroSection">
        <Header />
        <div className="heroImageRotation">
          <Image className="heroImage heroImageLayer heroImageLayer1" src="/images/hero-vita-lima-premium.png" alt="Ambiente de Vita Lima Spa" fill priority sizes="100vw" />
          <Image className="heroImage heroImageLayer heroImageLayer2" src="/images/main-hero/hero-01-masaje-relajante.webp" alt="" aria-hidden="true" fill sizes="100vw" />
          <Image className="heroImage heroImageLayer heroImageLayer3" src="/images/main-hero/hero-02-piedras-calientes.webp" alt="" aria-hidden="true" fill sizes="100vw" />
          <Image className="heroImage heroImageLayer heroImageLayer4" src="/images/main-hero/hero-03-reflexologia-podal.webp" alt="" aria-hidden="true" fill sizes="100vw" />
          <Image className="heroImage heroImageLayer heroImageLayer5" src="/images/main-hero/hero-04-cuello-hombros.webp" alt="" aria-hidden="true" fill sizes="100vw" />
        </div>
        <div className="heroShade" />
        <div className="heroContent shell">
          <p className="eyebrow heroEyebrow">{t.hero.eyebrow}</p>
          {/* En inglés el texto es más largo que en español y con el mismo tamaño
              rompía en 3 líneas en vez de 2; heroTitleCompact reduce un poco el
              tamaño solo para esa versión para que vuelva a verse en 2 líneas. */}
          <h1 className={language === "en" ? "heroTitleCompact" : undefined}>{t.hero.titleLine1}<br />{t.hero.titleLine2}</h1>
          <p className="heroLead">{t.hero.lead}</p>
          <div className="heroButtons">
            <a className="button orangeButton" href="#reserva">{t.hero.ctaPrimary} <span>→</span></a>
            <a className="button ghostButton" href="#servicios">{t.hero.ctaSecondary}</a>
          </div>
          <div className="heroTrust" aria-label={t.hero.trustLabel}>
            <div>
              <div className="heroRating" aria-label={t.hero.googleAria}>
                <strong>4.7</strong>
                <span className="heroStars" aria-hidden="true">★★★★★</span>
              </div>
              <span>{t.hero.googleLabel}</span>
            </div>
            <div>
              <div className="heroRating" aria-label={t.hero.tripadvisorAria}>
                <strong>4.8</strong>
                <span className="heroStars" aria-hidden="true">★★★★★</span>
              </div>
              <span>{t.hero.tripadvisorLabel}</span>
            </div>
            <div><strong>2</strong><span>{t.hero.locationsLabel}</span></div>
          </div>
        </div>
      </section>

      <section className="signatureStrip">
        <div className="shell signatureGrid">
          {t.signatureStrip.map((item, index) => (
            <div key={item.title}><span>0{index + 1}</span><strong>{item.title}</strong><p>{item.text}</p></div>
          ))}
        </div>
      </section>

      <section id="servicios" className="section servicesSection">
        <div className="shell">
          <div className="featuredServicesHeader">
            <div>
              <p className="eyebrow">{t.servicesSection.eyebrow}</p>
              <h2>{t.servicesSection.title}</h2>
            </div>
            <p>{t.servicesSection.lead}</p>
          </div>

          <FeaturedCarousel services={featuredServices} images={featuredServiceImages} />

          <div className="servicesAllAction">
            <Link className="button servicesAllButton" href="/servicios">{t.servicesSection.viewAll} <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="brandStorySection">
        <div className="shell brandStoryLayout">
          <div className="brandStoryImage"><Image src="/images/signature/room-stone.webp" alt="Cabina de Vita Lima Spa" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          <div className="brandStoryCopy">
            <p className="eyebrow">{t.brandStory.eyebrow}</p>
            <h2>{t.brandStory.title}</h2>
            <p>{t.brandStory.text}</p>
            <div className="storyPoints">{t.brandStory.points.map((point) => <span key={point}>{point}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="opiniones" className="section reviewsSection">
        <div className="shell">
          <div className="reviewsHeader">
            <div><p className="eyebrow orangeText">{t.reviewsSection.eyebrow}</p><h2>{t.reviewsSection.title}</h2></div>
            <div className="ratingSummary">
              <div><strong>4.7</strong><span>{t.reviewsSection.googleLabel}</span><small>{t.reviewsSection.googleCount}</small></div>
              <div><strong>4.8</strong><span>{t.reviewsSection.tripadvisorLabel}</span><small>{t.reviewsSection.tripadvisorCount}</small></div>
              <div><strong>{t.reviewsSection.rankValue}</strong><span>{t.reviewsSection.rankLabel}</span><small>{t.reviewsSection.rankSub}</small></div>
            </div>
          </div>
          <ReviewsCarousel reviews={reviews} />
          <div className="reviewActions">
            <a href="https://www.google.com/search?q=Vita+Lima+Spa+reseñas" target="_blank" rel="noreferrer">{t.reviewsSection.googleLink}</a>
            <a href="https://www.tripadvisor.com/Search?q=Vita%20Lima%20Spa" target="_blank" rel="noreferrer">{t.reviewsSection.tripadvisorLink}</a>
          </div>
        </div>
      </section>

      <section className="whyReturnSection">
        <div className="shell whyReturnLayout">
          <div><p className="eyebrow">{t.whyReturn.eyebrow}</p><h2>{t.whyReturn.title}</h2></div>
          <div className="whyReturnGrid">
            {t.whyReturn.items.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}
          </div>
        </div>
      </section>

      <section id="experiencias" className="section experienceTilesSection">
        <div className="shell">
          <div className="sectionTop editorialTop"><div><p className="eyebrow">{t.experiencesSection.eyebrow}</p><h2>{t.experiencesSection.title}</h2></div></div>
          <div className="experienceTiles">
            {t.experiencesSection.tiles.map((item, index) => (
              <article className="experienceTile" key={item.title}>
                <Image src={experienceImages[index]} alt={item.title} fill sizes="(max-width: 800px) 88vw, 25vw" />
                <div className="tileShade" />
                <div className="tileContent"><span>{item.kicker}</span><h3>{item.title}</h3><p>{item.text}</p><a href={experienceHrefs[index]}>{item.cta} →</a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section stepsSection">
        <div className="shell stepsLayout">
          <div className="stepsHeading"><p className="eyebrow">{t.steps.eyebrow}</p><h2>{t.steps.title}</h2><p>{t.steps.lead}</p></div>
          <div className="stepsGrid">
            {t.steps.items.map((step, index) => (
              <article className="stepCard" key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section gallerySection">
        <div className="shell galleryLayout">
          <div className="galleryIntro"><p className="eyebrow">{t.gallery.eyebrow}</p><h2>{t.gallery.title}</h2><p>{t.gallery.lead}</p></div>
          <div className="galleryGrid">
            {galleryImages.map((img, index) => <div className={`galleryItem galleryItem${index + 1}`} key={img}><Image src={`/images/signature/${img}`} alt={t.gallery.imageAlt} fill sizes="(max-width: 800px) 100vw, 30vw" /></div>)}
          </div>
        </div>
      </section>

      <section id="sedes" className="section locationsSection">
        <div className="shell sectionTop editorialTop"><div><p className="eyebrow">{t.locations.eyebrow}</p><h2>{t.locations.title}</h2></div></div>
        <div className="shell locationsGrid">
          {/* Las tarjetas llevan ahora a la página propia de cada sede
              (/san-borja y /miraflores), que es donde vive el contenido local
              indexable: cómo llegar, horarios, fotos del local y su FAQ. */}
          <article className="locationCard"><Image src="/images/sede-san-borja/san-borja-01.webp" alt="Sede San Borja" fill /><div className="locationShade" /><div className="locationContent"><span>{t.locations.sanBorja.tag}</span><h3>San Borja</h3><p>Av. Aviación 3358, oficina 204</p><small>{t.locations.sanBorja.hours}</small><Link href="/san-borja">{t.locations.sanBorja.directions}</Link></div></article>
          <article className="locationCard"><Image src="/images/signature/buddha.webp" alt="Sede Miraflores" fill /><div className="locationShade" /><div className="locationContent"><span>{t.locations.miraflores.tag}</span><h3>Miraflores</h3><p>Av. Larco 812, oficina 306</p><small>{t.locations.miraflores.hours}</small><Link href="/miraflores">{t.locations.miraflores.directions}</Link></div></article>
        </div>
        {/* Los mapas ya no se embeben en la carga inicial: cada uno muestra
            una foto de la sede y solo inserta el iframe de Google Maps —con
            sus cookies— cuando la persona pulsa "Ver mapa". */}
        <div className="shell locationsMaps">
          {locations.map((location) => (
            <ConsentMap
              key={location.slug}
              name={location.name}
              query={location.mapQuery}
              previewImage={location.heroImage}
              previewAlt={`Sede ${location.name} de Vita Lima Spa`}
            />
          ))}
        </div>
      </section>

      <section id="reserva" className="section reservationSection">
        <div className="shell reservationLayout">
          <div className="reservationIntro"><p className="eyebrow">{t.reservation.eyebrow}</p><h2>{t.reservation.title}</h2><p>{t.reservation.lead}</p><ul>{t.reservation.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
          <ReserveForm />
        </div>
      </section>

      <section id="preguntas" className="section faqSection">
        <div className="shell faqLayout">
          <div><p className="eyebrow">{t.faqSection.eyebrow}</p><h2>{t.faqSection.title}</h2></div>
          <div className="faqGrid">{t.faqSection.items.map(({ q, a }) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      <SiteFooter context="home" />
      <WhatsAppButton />
    </main>
  );
}
