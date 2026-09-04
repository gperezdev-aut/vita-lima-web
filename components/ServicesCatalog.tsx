"use client";

import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import { servicesByCategory, type Service, type ServiceCategory } from "@/content/services";
import { BLUR_DATA_URL } from "@/lib/blurPlaceholder";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { serviceText } from "@/lib/i18n/serviceText";

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

const categoryOrder: ServiceCategory[] = ["individual", "couples", "facial", "home", "program", "beauty"];

function serviceImage(category: ServiceCategory, index: number) {
  const images = catalogImages[category];
  return images[index % images.length];
}

export default function ServicesCatalog() {
  const { language, toggleLanguage, href } = useLanguage();
  const t = translations[language].servicesPage;
  const tPricing = translations[language].pricing;
  const tHeader = translations[language].header;
  const tDetail = translations[language].serviceDetail;

  function whatsappHref(service?: Service) {
    const message = service ? t.whatsappForService(serviceText(service, language).name) : t.whatsappDefault;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  return (
    <main className="servicesCatalogPage">
      <header className="catalogHeader">
        <div className="catalogNav shell">
          <Link href={href("/")} aria-label={tHeader.brandHome}>
            <Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={180} height={78} priority />
          </Link>
          <div className="catalogNavActions">
            <button type="button" className="langToggle" onClick={toggleLanguage} aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}>
              {language === "es" ? "EN" : "ES"}
            </button>
            <Link className="catalogBackLink" href={href("/")}>{t.backHome}</Link>
          </div>
        </div>
        <div className="catalogHero shell">
          <p className="eyebrow catalogEyebrow">{t.catalogEyebrow}</p>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
          <a className="button orangeButton" href={whatsappHref()} target="_blank" rel="noreferrer">
            {t.bookWhatsapp} <span>→</span>
          </a>
        </div>
      </header>

      <nav className="catalogCategoryNav" aria-label={t.categoryNav.all}>
        <div className="shell">
          <a href="#catalogo">{t.categoryNav.all}</a>
          <a href="#individual">{t.categoryNav.individual}</a>
          <a href="#couples">{t.categoryNav.couples}</a>
          <a href="#facial">{t.categoryNav.facial}</a>
          <a href="#home">{t.categoryNav.home}</a>
          <a href="#program">{t.categoryNav.program}</a>
          <a href="#mirada-y-belleza">{t.categoryNav.beauty}</a>
          <a href="/empresas">{t.categoryNav.empresas}</a>
          <a href="/regalos">{t.categoryNav.giftCards}</a>
        </div>
      </nav>

      <div className="catalogSections" id="catalogo">
        {categoryOrder.map((category) => {
          const categoryServices = servicesByCategory[category];
          const section = t.categories[category];

          return (
            <section
              className="catalogSection section"
              id={category === "beauty" ? "mirada-y-belleza" : category}
              key={category}
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
                  {categoryServices.map((service, index) => {
                    const text = serviceText(service, language);
                    return (
                      <article className="catalogCard" id={service.slug} key={service.code}>
                        <div className="catalogCardImage">
                          <Image src={serviceImage(category, index)} alt={text.name} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                          {text.badge && <span>{text.badge}</span>}
                        </div>
                        <div className="catalogCardBody">
                          {/* El título enlaza a la página propia del servicio:
                              cada servicio tiene ahora su URL indexable en
                              /servicios/[slug] con descripción larga y FAQ. */}
                          <h3>
                            <Link className="catalogCardTitleLink" href={href(`/servicios/${service.slug}`)}>
                              {text.name}
                            </Link>
                          </h3>
                          <div className="catalogCardTop">
                            <span>{service.duration} min</span>
                            <span className="priceNow">
                              {service.originalPrice && (
                                <s className="priceOld">
                                  <span className="srOnly">{tPricing.before} </span>
                                  S/ {service.originalPrice}
                                </s>
                              )}
                              <strong>
                                {service.originalPrice && <span className="srOnly">{tPricing.now} </span>}
                                S/ {service.price}
                              </strong>
                            </span>
                          </div>
                          {/* Se muestra el texto completo de "includes" (antes se recortaba con
                              serviceSummary()) porque el dueño del negocio pidió explícitamente
                              que la tarjeta del catálogo liste todo lo que incluye cada servicio,
                              no un resumen parcial — ver ejemplo de Royale en el pedido original. */}
                          <p className="catalogIncludes">{text.includes}</p>
                          <div className="catalogCardActions">
                            <AddToCartButton
                              className="catalogReserveButton"
                              label={t.addToCart}
                              addedLabel={t.addedToCart}
                              ariaLabel={t.addToCartAria(text.name)}
                              item={{ id: service.slug, name: text.name, price: service.price, meta: `${service.duration} min` }}
                            />
                            <Link className="catalogDetailLink" href={href(`/servicios/${service.slug}`)}>
                              {tDetail.seeDetails} <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
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
