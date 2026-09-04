import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import LocationPageView from "@/components/LocationPageView";
import { getLocation, locations } from "@/content/locations";
import { locationsEn } from "@/content/locations-en";
import { services } from "@/content/services";
import { buildLocationJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/content/structured-data";
import { languageAlternates, toEnglishPath } from "@/lib/i18n/routes";
import type { Language } from "@/lib/i18n/LanguageContext";

/**
 * Parte servidor compartida por `/san-borja`, `/miraflores` y sus versiones
 * bajo `/en`: metadata, datos estructurados y armado de los servicios
 * destacados de cada sede. Las rutas son archivos mínimos que solo eligen el
 * `slug` y el idioma, para que cada sede tenga una URL propia y limpia
 * (mejor para búsqueda local que una ruta tipo `/sedes/[slug]`).
 */

export function buildLocationMetadata(slug: string, language: Language = "es"): Metadata {
  const location = getLocation(slug);
  if (!location) return {};

  const esPath = `/${location.slug}`;
  const alternates = {
    canonical: language === "en" ? toEnglishPath(esPath) : esPath,
    languages: languageAlternates(esPath),
  };

  if (language === "en") {
    const copy = locationsEn[location.slug];
    const heading = copy?.heading || location.heading;
    const tagline = copy?.tagline || location.tagline;
    const title = `${heading} | Vita Lima Spa`;
    const description = `${tagline} ${location.streetAddress}, ${location.district}, Lima. Massages, facials and experiences for two. Book on WhatsApp.`;

    return {
      title,
      description,
      alternates,
      openGraph: { title, description, type: "website", url: alternates.canonical, locale: "en", images: [location.heroImage] },
      twitter: { card: "summary_large_image", title, description, images: [location.heroImage] },
    };
  }

  const title = `${location.heading} | Vita Lima Spa`;
  const description = `${location.tagline} ${location.streetAddress}, ${location.district}. Masajes, faciales y experiencias para dos. Reserva por WhatsApp.`;

  return {
    title,
    description,
    alternates,
    openGraph: { title, description, type: "website", url: esPath, locale: "es_PE", images: [location.heroImage] },
    twitter: { card: "summary_large_image", title, description, images: [location.heroImage] },
  };
}

export default function LocationRoute({ slug, language = "es" }: { slug: string; language?: Language }) {
  const location = getLocation(slug);
  if (!location) notFound();

  const other = locations.find((item) => item.slug !== location.slug) ?? location;
  const featuredServices = location.featuredServiceSlugs
    .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
    .filter((service): service is (typeof services)[number] => Boolean(service));

  const isEnglish = language === "en";
  const copy = isEnglish ? locationsEn[location.slug] : undefined;

  const breadcrumb = buildBreadcrumbJsonLd(
    isEnglish
      ? [
          { name: "Home", path: "/en" },
          { name: location.name, path: `/en/${location.slug}` },
        ]
      : [
          { name: "Inicio", path: "/" },
          { name: location.name, path: `/${location.slug}` },
        ],
  );

  const faqs = copy?.faqs?.length ? copy.faqs : location.faqs;

  return (
    <>
      <JsonLd data={buildLocationJsonLd(location)} />
      <JsonLd data={buildFaqJsonLd(faqs.map(({ q, a }) => [q, a]))} />
      <JsonLd data={breadcrumb} />
      <LocationPageView
        location={location}
        featuredServices={featuredServices}
        otherLocation={{ name: other.name, slug: other.slug }}
      />
    </>
  );
}
