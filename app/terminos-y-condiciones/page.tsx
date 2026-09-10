import type { Metadata } from "next";
import TermsAndConditionsPage from "@/components/TermsAndConditionsPage";
import { languageAlternates } from "@/lib/i18n/routes";

export const metadata: Metadata = {
  title: "Términos y condiciones | Vita Lima Spa",
  description:
    "Condiciones de separación de horario, adelantos, reprogramaciones y cancelaciones de Vita Lima Spa.",
  alternates: { canonical: "/terminos-y-condiciones", languages: languageAlternates("/terminos-y-condiciones") },
  openGraph: {
    title: "Términos y condiciones | Vita Lima Spa",
    description: "Condiciones de separación de horario, adelantos, reprogramaciones y cancelaciones de Vita Lima Spa.",
    type: "website",
    url: "/terminos-y-condiciones",
    locale: "es_PE",
  },
};

export default function Page() {
  return <TermsAndConditionsPage language="es" />;
}
