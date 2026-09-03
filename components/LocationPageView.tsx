"use client";

import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import ConsentMap from "@/components/ConsentMap";
import { BLUR_DATA_URL } from "@/lib/blurPlaceholder";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { serviceText } from "@/lib/i18n/serviceText";
import type { Location } from "@/content/locations";
import type { Service } from "@/content/services";

const whatsappNumber = "51907308415";

type LocationPageViewProps = {
  location: Location;
  featuredServices: Service[];
  otherLocation: { name: string; slug: string };
};

export default function LocationPageView({ location, featuredServices, otherLocation }: LocationPageViewProps) {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].locationPage;
  const tService = translations[language].serviceDetail;
  const tHeader = translations[language].header;

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.whatsappMessage(location.name))}`;

  return (
    <main className="servicesCatalogPage locationDetailPage">
      <header className="catalogHeader">
        <div className="catalogNav shell">
          <Link href="/" aria-label={tHeader.brandHome}>
            <Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={180} height={78} priority />
          </Link>
          <div className="catalogNavActions">
            <button
              type="button"
              className="langToggle"
              onClick={toggleLanguage}
              aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}
            >
              {language === "es" ? "EN" : "ES"}
            </button>
            <Link className="catalogBackLink" href={`/${otherLocation.slug}`}>
              {t.otherLocation}
            </Link>
          </div>
        </div>

        <div className="catalogHero shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">{t.breadcrumbHome}</Link>
              </li>
              <li aria-current="page">{location.name}</li>
            </ol>
          </nav>
          <p className="eyebrow catalogEyebrow">{t.eyebrow}</p>
          <h1>{location.heading}</h1>
          <p>{location.tagline}</p>
          <a className="button orangeButton" href={whatsappHref} target="_blank" rel="noreferrer">
            {t.book} <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      <section className="section locationIntroSection">
        <div className="shell locationIntroLayout">
          <div className="locationIntroCopy">
            {location.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            <h2>{t.gettingHereHeading}</h2>
            <ul className="locationList">
              {location.gettingHere.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>{t.highlightsHeading}</h2>
            <ul className="locationList">
              {location.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className="locationFactsCard">
            <h2>{t.addressHeading}</h2>
            <p className="locationAddress">{location.streetAddress}</p>
            <p className="locationDistrict">{location.district}, Lima</p>

            <h2>{t.scheduleHeading}</h2>
            <p>{location.scheduleText}</p>

            <a className="button orangeButton locationCardCta" href={whatsappHref} target="_blank" rel="noreferrer">
              {t.book} <span aria-hidden="true">→</span>
            </a>

            <div className="locationMapWrap">
              <ConsentMap
                name={location.name}
                query={location.mapQuery}
                previewImage={location.heroImage}
                previewAlt={`Sede ${location.name} de Vita Lima Spa`}
              />
            </div>
          </aside>
        </div>
      </section>

      <section className="section locationServicesSection">
        <div className="shell">
          <h2>{t.servicesHeading}</h2>
          <div className="catalogGrid locationServicesGrid">
            {featuredServices.map((service) => {
              const text = serviceText(service, language);
              return (
                <article className="catalogCard" key={service.code}>
                  <div className="catalogCardBody">
                    <h3>
                      <Link href={`/servicios/${service.slug}`}>{text.name}</Link>
                    </h3>
                    <div className="catalogCardTop">
                      <span>
                        {service.duration} {tService.minutes}
                      </span>
                      <strong>S/ {service.price}</strong>
                    </div>
                    <p className="catalogIncludes">{text.includes}</p>
                    <Link className="catalogReserveButton" href={`/servicios/${service.slug}`}>
                      {tService.seeDetails}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="servicesAllAction">
            <Link className="button servicesAllButton" href="/servicios">
              {t.viewAllServices} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section locationGallerySection">
        <div className="shell">
          <h2>{t.galleryHeading}</h2>
          <div className="locationGallery">
            {location.gallery.map((src) => (
              <div className="locationGalleryItem" key={src}>
                <Image
                  src={src}
                  alt={`Sede ${location.name} de Vita Lima Spa`}
                  fill
                  sizes="(max-width: 760px) 80vw, 25vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section locationFaqSection">
        <div className="shell faqLayout">
          <div>
            <p className="eyebrow">{location.name}</p>
            <h2>{t.faqHeading}</h2>
          </div>
          <div className="faqGrid">
            {location.faqs.map(({ q, a }) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter context="internal" />
      <WhatsAppButton />
    </main>
  );
}
