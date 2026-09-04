import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { toEnglishPath } from "@/lib/i18n/routes";

/**
 * El sitemap publica cada página traducida dos veces —español e inglés— con
 * el bloque `alternates.languages`, que es la forma en que Google entiende
 * que son la misma página en dos idiomas. Las páginas que todavía no están
 * traducidas (empresas, gift cards, legales) aparecen solo en español.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://nueva.vitalimaspa.com";
  const lastModified = new Date();

  /** Una entrada por idioma para una ruta que existe en ambos. */
  function bilingual(esPath: string, priority: number): MetadataRoute.Sitemap {
    const enPath = toEnglishPath(esPath);
    const languages = {
      "es-PE": `${base}${esPath === "/" ? "" : esPath}`,
      en: `${base}${enPath}`,
    };
    return [
      { url: `${base}${esPath === "/" ? "" : esPath}`, lastModified, priority, alternates: { languages } },
      { url: `${base}${enPath}`, lastModified, priority: Math.max(priority - 0.1, 0.1), alternates: { languages } },
    ];
  }

  return [
    ...bilingual("/", 1),
    ...bilingual("/servicios", 0.9),
    ...locations.flatMap((location) => bilingual(`/${location.slug}`, 0.8)),
    ...services.flatMap((service) => bilingual(`/servicios/${service.slug}`, service.featured ? 0.8 : 0.7)),
    // Sin versión en inglés todavía.
    { url: `${base}/empresas`, lastModified, priority: 0.6 },
    { url: `${base}/regalos`, lastModified, priority: 0.6 },
    { url: `${base}/politica-de-privacidad`, lastModified, priority: 0.3 },
    { url: `${base}/terminos-y-condiciones`, lastModified, priority: 0.3 },
  ];
}
