import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ServicesCatalog from "@/components/ServicesCatalog";
import { buildServicesJsonLd } from "@/content/structured-data";

// El metadata de SEO se mantiene siempre en español: el selector de idioma
// es un cambio de texto en el cliente (no hay URLs /en/ indexables), así
// que la metadata para buscadores sigue reflejando el idioma principal
// del sitio, tal como se decidió al elegir este enfoque.
export const metadata: Metadata = {
  title: "Experiencias Vita Lima | Catálogo de masajes y bienestar",
  description: "Conoce los masajes individuales, experiencias para dos, servicios a domicilio y programas de sesiones de Vita Lima Spa.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Experiencias Vita Lima",
    description: "Catálogo completo de masajes y experiencias de bienestar en Lima.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={buildServicesJsonLd()} />
      <ServicesCatalog />
    </>
  );
}
