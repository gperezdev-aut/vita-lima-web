import type { Location, LocationCopy } from "@/content/locations";
import { locationsEn } from "@/content/locations-en";
import type { Language } from "./LanguageContext";

/**
 * Textos de una sede en el idioma activo, con respaldo campo por campo al
 * español si falta la traducción. Mismo criterio que `serviceDetailText.ts`.
 */
export function locationText(location: Location, language: Language): LocationCopy {
  if (language === "es") return location;

  const en = locationsEn[location.slug];
  if (!en) return location;

  return {
    heading: en.heading || location.heading,
    tagline: en.tagline || location.tagline,
    scheduleText: en.scheduleText || location.scheduleText,
    intro: en.intro?.length ? en.intro : location.intro,
    gettingHere: en.gettingHere?.length ? en.gettingHere : location.gettingHere,
    highlights: en.highlights?.length ? en.highlights : location.highlights,
    faqs: en.faqs?.length ? en.faqs : location.faqs,
  };
}
