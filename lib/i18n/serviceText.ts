import type { Service } from "@/content/services";
import type { Language } from "./LanguageContext";

// Textos de un servicio en el idioma activo. Si el campo *En no está
// definido para ese servicio (no debería pasar hoy: los 50 servicios del
// catálogo ya tienen su versión en inglés, pero un servicio nuevo podría
// agregarse sin traducir todavía), se usa el texto en español como
// respaldo en vez de mostrar un campo vacío.
export function serviceText(service: Service, language: Language) {
  if (language === "es") {
    return {
      name: service.name,
      includes: service.includes,
      badge: service.badge,
      featuredSummary: service.featuredSummary,
    };
  }
  return {
    name: service.nameEn || service.name,
    includes: service.includesEn || service.includes,
    badge: service.badgeEn || service.badge,
    featuredSummary: service.featuredSummaryEn || service.featuredSummary,
  };
}
