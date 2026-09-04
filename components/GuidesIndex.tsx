"use client";

import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BLUR_DATA_URL } from "@/lib/blurPlaceholder";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { guidesByDate } from "@/content/guides";

const dateFormatter = new Intl.DateTimeFormat("es-PE", { year: "numeric", month: "long" });

export default function GuidesIndex() {
  const { language, href } = useLanguage();
  const t = translations[language].guidesPage;
  const tHeader = translations[language].header;

  return (
    <main className="servicesCatalogPage guidesPage">
      <header className="catalogHeader">
        <div className="catalogNav shell">
          <Link href={href("/")} aria-label={tHeader.brandHome}>
            <Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={180} height={78} priority />
          </Link>
          <div className="catalogNavActions">
            <Link className="catalogBackLink" href={href("/servicios")}>
              {t.viewCatalog}
            </Link>
          </div>
        </div>

        <div className="catalogHero shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href={href("/")}>{t.breadcrumbHome}</Link>
              </li>
              <li aria-current="page">{t.title}</li>
            </ol>
          </nav>
          <p className="eyebrow catalogEyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
        </div>
      </header>

      <section className="section guidesListSection">
        <div className="shell">
          <div className="guidesGrid">
            {guidesByDate.map((guide) => (
              <article className="guideCard" key={guide.slug}>
                <Link className="guideCardImage" href={`/guias/${guide.slug}`} tabIndex={-1} aria-hidden="true">
                  <Image
                    src={guide.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </Link>
                <div className="guideCardBody">
                  <p className="guideCardMeta">
                    <time dateTime={guide.date}>{dateFormatter.format(new Date(guide.date))}</time>
                    <span aria-hidden="true"> · </span>
                    {t.readingTime(guide.readingMinutes)}
                  </p>
                  <h2>
                    <Link href={`/guias/${guide.slug}`}>{guide.title}</Link>
                  </h2>
                  <p className="guideCardSummary">{guide.summary}</p>
                  <Link className="guideCardLink" href={`/guias/${guide.slug}`}>
                    {t.readGuide} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="servicesAllAction">
            <Link className="button servicesAllButton" href={href("/servicios")}>
              {t.viewCatalog} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter context="internal" />
      <WhatsAppButton />
    </main>
  );
}
