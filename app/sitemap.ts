import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { locations } from "@/content/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://nueva.vitalimaspa.com";
  const lastModified = new Date();

  return [
    { url: base, lastModified, priority: 1 },
    { url: `${base}/servicios`, lastModified, priority: 0.9 },
    // Una entrada por sede: son las páginas que responden las búsquedas
    // locales ("masajes en San Borja", "spa en Miraflores").
    ...locations.map((location) => ({
      url: `${base}/${location.slug}`,
      lastModified,
      priority: 0.8,
    })),
    // Una entrada por servicio. Es el grueso del sitemap y lo que abre el
    // sitio a las búsquedas de cola larga por técnica y por nombre.
    ...services.map((service) => ({
      url: `${base}/servicios/${service.slug}`,
      lastModified,
      priority: service.featured ? 0.8 : 0.7,
    })),
    { url: `${base}/empresas`, lastModified, priority: 0.6 },
    { url: `${base}/regalos`, lastModified, priority: 0.6 },
    { url: `${base}/politica-de-privacidad`, lastModified, priority: 0.3 },
    { url: `${base}/terminos-y-condiciones`, lastModified, priority: 0.3 },
  ];
}
