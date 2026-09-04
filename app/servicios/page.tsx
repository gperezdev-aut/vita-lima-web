import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ServicesCatalog from "@/components/ServicesCatalog";
import { buildServicesJsonLd } from "@/content/structured-data";
import { languageAlternates } from "@/lib/i18n/routes";

// Metadata en español para la ruta en español. La versión en inglés vive en
// app/en/services/page.tsx con su propia metadata, y `languages` publica el
// hreflang que enlaza ambas.
export const metadata: Metadata = {
  title: "Experiencias Vita Lima | Catálogo de masajes y bienestar",
  description: "Conoce los masajes individuales, experiencias para dos, servicios a domicilio y programas de sesiones de Vita Lima Spa.",
  alternates: { canonical: "/servicios", languages: languageAlternates("/servicios") },
  openGraph: {
    title: "Experiencias Vita Lima",
    description: "Catálogo completo de masajes y experiencias de bienestar en Lima.",
    type: "website",
    url: "/servicios",
    locale: "es_PE",
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
