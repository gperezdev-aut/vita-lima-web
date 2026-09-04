import type { Metadata } from "next";
import GuidesIndex from "@/components/GuidesIndex";
import JsonLd from "@/components/JsonLd";
import { guidesByDate } from "@/content/guides";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/content/structured-data";

export const metadata: Metadata = {
  title: "Guías de bienestar | Vita Lima Spa",
  description:
    "Qué esperar de un masaje, cuál elegir según lo que te duele, cada cuánto conviene y cómo regalarlo. Escrito por el equipo de Vita Lima Spa.",
  alternates: { canonical: "/guias" },
  openGraph: {
    title: "Guías de bienestar | Vita Lima Spa",
    description: "Lo que conviene saber antes de reservar tu masaje.",
    type: "website",
    url: "/guias",
    locale: "es_PE",
  },
};

export default function Page() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: guidesByDate.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/guias/${guide.slug}`,
      name: guide.title,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Guías", path: "/guias" },
        ])}
      />
      <GuidesIndex />
    </>
  );
}
