"use client";

import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BLUR_DATA_URL } from "@/lib/blurPlaceholder";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { serviceText } from "@/lib/i18n/serviceText";
import { serviceDetailText } from "@/lib/i18n/serviceDetailText";
import type { Service } from "@/content/services";
import type { ServiceDetail } from "@/content/service-details";

const whatsappNumber = "51907308415";

type ServiceDetailPageProps = {
  service: Service;
  detail: ServiceDetail;
  images: string[];
  related: Service[];
};

export default function ServiceDetailPage({ service, detail, images, related }: ServiceDetailPageProps) {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].serviceDetail;
  const tPricing = translations[language].pricing;
  const tHeader = translations[language].header;
  const tCatalog = translations[language].servicesPage;
  const text = serviceText(service, language);
  // Contenido largo en el idioma activo (respaldo al español por campo).
  const copy = serviceDetailText(service.slug, detail, language);

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.whatsappMessage(text.name))}`;
  const [heroImage, ...galleryImages] = images;

  return (
    <main className="servicesCatalogPage serviceDetailPage">
      <header className="catalogHeader serviceDetailHeader">
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
            <Link className="catalogBackLink" href="/servicios">
              {t.backToCatalog}
            </Link>
          </div>
        </div>

        <div className="catalogHero shell serviceDetailHero">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">{t.breadcrumbHome}</Link>
              </li>
              <li>
                <Link href="/servicios">{t.breadcrumbCatalog}</Link>
              </li>
              <li aria-current="page">{text.name}</li>
            </ol>
          </nav>

          <h1>{text.name}</h1>
          <p className="serviceDetailTagline">{copy.tagline}</p>

          <dl className="serviceDetailMeta">
            <div>
              <dt>{t.duration}</dt>
              <dd>
                {service.duration} {t.minutes}
              </dd>
            </div>
            <div>
              <dt>{t.price}</dt>
              <dd className="priceNow">
                {service.originalPrice && (
                  <s className="priceOld">
                    <span className="srOnly">{tPricing.before} </span>S/ {service.originalPrice}
                  </s>
                )}
                <strong>
                  {service.originalPrice && <span className="srOnly">{tPricing.now} </span>}S/ {service.price}
                </strong>
              </dd>
            </div>
            <div>
              <dt>{t.venue}</dt>
              <dd>{t.venues[service.venue] ?? service.venue}</dd>
            </div>
          </dl>

          <div className="serviceDetailActions">
            <a className="button orangeButton" href={whatsappHref} target="_blank" rel="noreferrer">
              {t.book} <span aria-hidden="true">→</span>
            </a>
            <AddToCartButton
              className="button serviceDetailAddButton"
              label={t.addToCart}
              addedLabel={t.addedToCart}
              ariaLabel={tCatalog.addToCartAria(text.name)}
              item={{ id: service.slug, name: text.name, price: service.price, meta: `${service.duration} min` }}
            />
          </div>
        </div>
      </header>

      <section className="section serviceDetailBody">
        <div className="shell serviceDetailLayout">
          <div className="serviceDetailMain">
            {copy.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="serviceDetailParagraph">
                {paragraph}
              </p>
            ))}

            <h2>{t.sessionHeading}</h2>
            <p className="serviceDetailParagraph">{copy.session}</p>

            <h2>{t.forWhomHeading}</h2>
            <p className="serviceDetailParagraph">{copy.forWhom}</p>
          </div>

          <aside className="serviceDetailAside">
            <div className="serviceDetailCard">
              <h2>{t.includesHeading}</h2>
              <p>{text.includes}</p>
            </div>
            <div className="serviceDetailCard">
              <h2>{t.benefitsHeading}</h2>
              <ul>
                {copy.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
            {heroImage && (
              <div className="serviceDetailAsideImage">
                <Image
                  src={heroImage}
                  alt={text.name}
                  fill
                  sizes="(max-width: 1100px) 100vw, 380px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            )}
          </aside>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="section serviceDetailGallerySection">
          <div className="shell">
            <h2>{t.galleryHeading}</h2>
            <div className="serviceDetailGallery">
              {galleryImages.map((src) => (
                <div className="serviceDetailGalleryItem" key={src}>
                  <Image
                    src={src}
                    alt={`${text.name} — Vita Lima Spa`}
                    fill
                    sizes="(max-width: 760px) 80vw, 30vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section serviceDetailFaqSection">
        <div className="shell faqLayout">
          <div>
            <p className="eyebrow">{text.name}</p>
            <h2>{t.faqHeading}</h2>
          </div>
          <div className="faqGrid">
            {copy.faqs.map(({ q, a }) => (
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

      {related.length > 0 && (
        <section className="section serviceDetailRelatedSection">
          <div className="shell">
            <h2>{t.relatedHeading}</h2>
            <div className="catalogGrid serviceDetailRelatedGrid">
              {related.map((item) => {
                const relatedText = serviceText(item, language);
                return (
                  <article className="catalogCard" key={item.code}>
                    <div className="catalogCardBody">
                      <h3>
                        <Link href={`/servicios/${item.slug}`}>{relatedText.name}</Link>
                      </h3>
                      <div className="catalogCardTop">
                        <span>
                          {item.duration} {t.minutes}
                        </span>
                        <strong>S/ {item.price}</strong>
                      </div>
                      <p className="catalogIncludes">{relatedText.includes}</p>
                      <Link className="catalogReserveButton" href={`/servicios/${item.slug}`}>
                        {t.seeDetails}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="servicesAllAction">
              <Link className="button servicesAllButton" href="/servicios">
                {t.backToCatalog} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <SiteFooter context="internal" />
      <WhatsAppButton />
    </main>
  );
}
