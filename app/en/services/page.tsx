import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ServicesCatalog from "@/components/ServicesCatalog";
import { buildServicesJsonLd } from "@/content/structured-data";
import { languageAlternates } from "@/lib/i18n/routes";

export const metadata: Metadata = {
  title: "Vita Lima Experiences | Massage and wellbeing catalog",
  description:
    "Individual massages, experiences for two, facials, in-home service and session programs at Vita Lima Spa, Lima.",
  alternates: { canonical: "/en/services", languages: languageAlternates("/servicios") },
  openGraph: {
    title: "Vita Lima Experiences",
    description: "The full catalog of massages and wellbeing experiences in Lima.",
    type: "website",
    url: "/en/services",
    locale: "en",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={buildServicesJsonLd()} />
      <ServicesCatalog />
    </>
  );
}
