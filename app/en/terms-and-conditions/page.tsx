import type { Metadata } from "next";
import TermsAndConditionsPage from "@/components/TermsAndConditionsPage";
import { languageAlternates } from "@/lib/i18n/routes";

export const metadata: Metadata = {
  title: "Terms and conditions | Vita Lima Spa",
  description: "Booking holds, deposits, rescheduling and cancellation terms for Vita Lima Spa.",
  alternates: { canonical: "/en/terms-and-conditions", languages: languageAlternates("/terminos-y-condiciones") },
  openGraph: {
    title: "Terms and conditions | Vita Lima Spa",
    description: "Booking holds, deposits, rescheduling and cancellation terms for Vita Lima Spa.",
    type: "website",
    url: "/en/terms-and-conditions",
    locale: "en",
  },
};

export default function Page() {
  return <TermsAndConditionsPage language="en" />;
}
