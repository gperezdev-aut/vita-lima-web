import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import LocationPageView from "@/components/LocationPageView";
import { getLocation, locations } from "@/content/locations";
import { services } from "@/content/services";
import { buildLocationJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/content/structured-data";

/**
 * Parte servidor compartida por `/san-borja` y `/miraflores`: metadata,
 * datos estructurados y armado de los servicios destacados de cada sede.
 * Las dos rutas son archivos mínimos que solo eligen el `slug`, para que
 * cada sede tenga una URL propia y limpia (mejor para búsqueda local que
 * una ruta tipo `/sedes/[slug]`).
 */

export function buildLocationMetadata(slug: string): Metadata {
  const location = getLocation(slug);
  if (!location) return {};

  const title = `${location.heading} | Vita Lima Spa`;
  const description = `${location.tagline} ${location.streetAddress}, ${location.district}. Masajes, faciales y experiencias para dos. Reserva por WhatsApp.`;

  return {
    title,
    description,
    alternates: { canonical: `/${location.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/${location.slug}`,
      locale: "es_PE",
      images: [location.heroImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [location.heroImage] },
  };
}

export default function LocationRoute({ slug }: { slug: string }) {
  const location = getLocation(slug);
  if (!location) notFound();

  const other = locations.find((item) => item.slug !== location.slug) ?? location;
  const featuredServices = location.featuredServiceSlugs
    .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
    .filter((service): service is (typeof services)[number] => Boolean(service));

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: location.name, path: `/${location.slug}` },
  ]);

  return (
    <>
      <JsonLd data={buildLocationJsonLd(location)} />
      <JsonLd data={buildFaqJsonLd(location.faqs.map(({ q, a }) => [q, a]))} />
      <JsonLd data={breadcrumb} />
      <LocationPageView
        location={location}
        featuredServices={featuredServices}
        otherLocation={{ name: other.name, slug: other.slug }}
      />
    </>
  );
}
