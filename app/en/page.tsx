import type { Metadata } from "next";
import HomePageView from "@/components/HomePageView";
import { languageAlternates } from "@/lib/i18n/routes";

export const metadata: Metadata = {
  title: "Vita Lima Spa | Massage and wellbeing in Lima",
  description:
    "Relaxing, deep-tissue and couples massages, facials, gift cards and corporate wellbeing in San Borja and Miraflores, Lima.",
  alternates: { canonical: "/en", languages: languageAlternates("/") },
  openGraph: {
    title: "Vita Lima Spa",
    description: "It's time to come back to you. Massage and wellbeing in Lima.",
    type: "website",
    url: "/en",
    locale: "en",
    images: ["/images/signature/hero.webp"],
  },
};

export default function Page() {
  return <HomePageView />;
}
