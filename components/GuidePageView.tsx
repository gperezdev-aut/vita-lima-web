"use client";

import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BLUR_DATA_URL } from "@/lib/blurPlaceholder";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { serviceText } from "@/lib/i18n/serviceText";
import type { Guide } from "@/content/guides";
import type { Service } from "@/content/services";

const whatsappNumber = "51907308415";
const dateFormatter = new Intl.DateTimeFormat("es-PE", { year: "numeric", month: "long", day: "numeric" });

type GuidePageViewProps = {
  guide: Guide;
  relatedServices: Service[];
  relatedGuides: Guide[];
};

export default function GuidePageView({ guide, relatedServices, relatedGuides }: GuidePageViewProps) {
  const { language, href } = useLanguage();
  const t = translations[language].guidesPage;
  const tService = translations[language].serviceDetail;
  const tHeader = translations[language].header;

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <main className="servicesCatalogPage guidePage">
      <header className="catalogHeader">
        <div className="catalogNav shell">
          <Link href={href("/")} aria-label={tHeader.brandHome}>
            <Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={180} height={78} priority />
          </Link>
          <div className="catalogNavActions">
            <Link className="catalogBackLink" href="/guias">
              {t.allGuides}
            </Link>
          </div>
        </div>

        <div className="catalogHero shell guideHero">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href={href("/")}>{t.breadcrumbHome}</Link>
              </li>
              <li>
                <Link href="/guias">{t.title}</Link>
              </li>
              <li aria-current="page">{guide.title}</li>
            </ol>
          </nav>
          <h1>{guide.title}</h1>
          <p className="guideHeroSummary">{guide.summary}</p>
          <p className="guideHeroMeta">
            <time dateTime={guide.date}>{dateFormatter.format(new Date(guide.date))}</time>
            <span aria-hidden="true"> · </span>
            {t.readingTime(guide.readingMinutes)}
          </p>
        </div>
      </header>

      <section className="section guideBodySection">
        <div className="shell guideLayout">
          <article className="guideBody">
            {guide.body.map((block, index) => {
              if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
              if (block.type === "p") return <p key={index}>{block.text}</p>;
              if (block.type === "note")
                return (
                  <aside className="guideNote" key={index}>
                    <p>{block.text}</p>
                  </aside>
                );
              return (
                <ul key={index}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            })}

            <div className="guideCta">
              <p>{t.ctaText}</p>
              <a className="button orangeButton" href={whatsappHref} target="_blank" rel="noreferrer">
                {t.ctaButton} <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>

          <aside className="guideAside">
            <div className="guideAsideImage">
              <Image
                src={guide.image}
                alt=""
                fill
                sizes="(max-width: 1100px) 100vw, 340px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>

            {relatedServices.length > 0 && (
              <div className="serviceDetailCard">
                <h2>{t.relatedServicesHeading}</h2>
                <ul className="guideServiceList">
                  {relatedServices.map((service) => {
                    const text = serviceText(service, language);
                    return (
                      <li key={service.code}>
                        <Link href={href(`/servicios/${service.slug}`)}>{text.name}</Link>
                        <span>
                          {service.duration} {tService.minutes} · S/ {service.price}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {relatedGuides.length > 0 && (
        <section className="section guideRelatedSection">
          <div className="shell">
            <h2>{t.relatedGuidesHeading}</h2>
            <div className="guidesGrid">
              {relatedGuides.map((related) => (
                <article className="guideCard" key={related.slug}>
                  <div className="guideCardBody">
                    <h3>
                      <Link href={`/guias/${related.slug}`}>{related.title}</Link>
                    </h3>
                    <p className="guideCardSummary">{related.summary}</p>
                    <Link className="guideCardLink" href={`/guias/${related.slug}`}>
                      {t.readGuide} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter context="internal" />
      <WhatsAppButton />
    </main>
  );
}
