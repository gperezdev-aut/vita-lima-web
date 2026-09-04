import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/content/services";
import { getServiceDetail, getServiceImages } from "@/content/service-details";
import { serviceDetailsEn } from "@/content/service-details-en";
import {
  buildServiceJsonLd,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
  cleanServiceName,
} from "@/content/structured-data";
import { languageAlternates, toEnglishPath } from "@/lib/i18n/routes";
import { serviceText } from "@/lib/i18n/serviceText";
import type { Language } from "@/lib/i18n/LanguageContext";

/**
 * Parte servidor compartida por `/servicios/[slug]` y `/en/services/[slug]`:
 * metadata, datos estructurados y armado de los servicios relacionados. Las
 * dos rutas son archivos mínimos que solo pasan el idioma.
 */

export function buildServiceMetadata(slug: string, language: Language): Metadata {
  const service = services.find((item) => item.slug === slug);
  const detail = getServiceDetail(slug);
  if (!service || !detail) return {};

  const esPath = `/servicios/${slug}`;
  const [image] = getServiceImages(service);
  const alternates = { canonical: language === "en" ? toEnglishPath(esPath) : esPath, languages: languageAlternates(esPath) };

  if (language === "en") {
    const name = cleanServiceName(serviceText(service, "en").name);
    const copy = serviceDetailsEn[slug];
    const tagline = copy?.tagline || detail.tagline;
    const title = `${name} in Lima | Vita Lima Spa`;
    const description = `${tagline} ${service.duration} min · S/ ${service.price}. Book in San Borja or Miraflores.`;

    return {
      title,
      description,
      alternates,
      openGraph: { title, description, type: "website", url: alternates.canonical, locale: "en", images: image ? [image] : undefined },
      twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
    };
  }

  const name = cleanServiceName(service.name);
  const title = detail.seoTitle || `${name} en Lima | Vita Lima Spa`;
  const description =
    detail.seoDescription ||
    `${detail.tagline} ${service.duration} min · S/ ${service.price}. Reserva en San Borja o Miraflores.`;

  return {
    title,
    description,
    alternates,
    openGraph: { title, description, type: "website", url: esPath, locale: "es_PE", images: image ? [image] : undefined },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

export default function ServiceRoute({ slug, language }: { slug: string; language: Language }) {
  const service = services.find((item) => item.slug === slug);
  const detail = getServiceDetail(slug);

  if (!service || !detail) notFound();

  const images = getServiceImages(service);
  const related = services
    .filter((item) => item.category === service.category && item.slug !== service.slug)
    .slice(0, 3);

  // El JSON-LD se emite siempre en español, igual que en el resto del sitio:
  // es la ficha del negocio para buscadores, no texto para el visitante.
  const isEnglish = language === "en";
  const breadcrumb = buildBreadcrumbJsonLd(
    isEnglish
      ? [
          { name: "Home", path: "/en" },
          { name: "Experiences", path: "/en/services" },
          { name: cleanServiceName(serviceText(service, "en").name), path: `/en/services/${service.slug}` },
        ]
      : [
          { name: "Inicio", path: "/" },
          { name: "Experiencias", path: "/servicios" },
          { name: cleanServiceName(service.name), path: `/servicios/${service.slug}` },
        ],
  );

  const faqs = isEnglish && serviceDetailsEn[slug]?.faqs?.length ? serviceDetailsEn[slug].faqs : detail.faqs;

  return (
    <>
      <JsonLd data={buildServiceJsonLd(service)} />
      <JsonLd data={buildFaqJsonLd(faqs.map(({ q, a }) => [q, a]))} />
      <JsonLd data={breadcrumb} />
      <ServiceDetailPage service={service} detail={detail} images={images} related={related} />
    </>
  );
}
