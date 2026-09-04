import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuidePageView from "@/components/GuidePageView";
import JsonLd from "@/components/JsonLd";
import { guides, getGuide } from "@/content/guides";
import { services } from "@/content/services";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/content/structured-data";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const title = `${guide.title} | Vita Lima Spa`;

  return {
    title,
    description: guide.summary,
    alternates: { canonical: `/guias/${slug}` },
    openGraph: {
      title,
      description: guide.summary,
      type: "article",
      url: `/guias/${slug}`,
      locale: "es_PE",
      publishedTime: guide.date,
      images: [guide.image],
    },
    twitter: { card: "summary_large_image", title, description: guide.summary, images: [guide.image] },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const relatedServices = guide.relatedServices
    .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
    .filter((service): service is (typeof services)[number] => Boolean(service));

  const relatedGuides = guide.relatedGuides
    .map((guideSlug) => getGuide(guideSlug))
    .filter((related): related is NonNullable<typeof related> => Boolean(related));

  // Article, no BlogPosting: son guías de referencia que se actualizan, no
  // entradas de bitácora atadas a una fecha.
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    image: `${SITE_URL}${guide.image}`,
    datePublished: guide.date,
    dateModified: guide.date,
    inLanguage: "es-PE",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guias/${guide.slug}` },
    author: { "@type": "Organization", name: "Vita Lima Spa", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <JsonLd data={article} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Guías", path: "/guias" },
          { name: guide.title, path: `/guias/${guide.slug}` },
        ])}
      />
      <GuidePageView guide={guide} relatedServices={relatedServices} relatedGuides={relatedGuides} />
    </>
  );
}
