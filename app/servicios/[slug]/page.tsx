import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/content/services";
import { getServiceDetail, getServiceImages } from "@/content/service-details";
import { buildServiceJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd, cleanServiceName } from "@/content/structured-data";

// Todas las páginas de servicio se generan en el build: son estáticas y no
// dependen de nada en tiempo de ejecución.
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

// La metadata para buscadores se mantiene en español, el idioma principal del
// sitio, con el mismo criterio ya aplicado en /servicios: el selector ES/EN es
// un cambio de texto en el cliente, no hay URLs /en/ indexables.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const detail = getServiceDetail(slug);
  if (!service || !detail) return {};

  const name = cleanServiceName(service.name);
  const title = detail.seoTitle || `${name} en Lima | Vita Lima Spa`;
  const description =
    detail.seoDescription ||
    `${detail.tagline} ${service.duration} min · S/ ${service.price}. Reserva en San Borja o Miraflores.`;
  const [image] = getServiceImages(service);

  return {
    title,
    description,
    alternates: { canonical: `/servicios/${slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/servicios/${slug}`,
      locale: "es_PE",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const detail = getServiceDetail(slug);

  if (!service || !detail) notFound();

  const images = getServiceImages(service);
  const related = services
    .filter((item) => item.category === service.category && item.slug !== service.slug)
    .slice(0, 3);

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Experiencias", path: "/servicios" },
    { name: cleanServiceName(service.name), path: `/servicios/${service.slug}` },
  ]);

  return (
    <>
      <JsonLd data={buildServiceJsonLd(service)} />
      <JsonLd data={buildFaqJsonLd(detail.faqs.map(({ q, a }) => [q, a]))} />
      <JsonLd data={breadcrumb} />
      <ServiceDetailPage service={service} detail={detail} images={images} related={related} />
    </>
  );
}
