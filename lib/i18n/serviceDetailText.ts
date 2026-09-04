import type { ServiceDetail, ServiceDetailCopy } from "@/content/service-details";
import { serviceDetailsEn } from "@/content/service-details-en";
import type { Language } from "./LanguageContext";

/**
 * Contenido largo de un servicio en el idioma activo.
 *
 * El respaldo es campo por campo, no por servicio completo: si algún día se
 * agrega un servicio nuevo y su traducción queda a medias, la página igual
 * se muestra entera, mezclando el inglés disponible con el español del
 * resto, en vez de quedarse con secciones vacías. Mismo criterio que
 * `serviceText.ts` usa con el catálogo.
 */
export function serviceDetailText(slug: string, detail: ServiceDetail, language: Language): ServiceDetailCopy {
  if (language === "es") return detail;

  const en = serviceDetailsEn[slug];
  if (!en) return detail;

  return {
    tagline: en.tagline || detail.tagline,
    intro: en.intro?.length ? en.intro : detail.intro,
    forWhom: en.forWhom || detail.forWhom,
    benefits: en.benefits?.length ? en.benefits : detail.benefits,
    session: en.session || detail.session,
    faqs: en.faqs?.length ? en.faqs : detail.faqs,
  };
}
