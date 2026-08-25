import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://nueva.vitalimaspa.com";
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/servicios`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/empresas`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/regalos`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/politica-de-privacidad`, lastModified: new Date(), priority: 0.3 },
    { url: `${base}/terminos-y-condiciones`, lastModified: new Date(), priority: 0.3 }
  ];
}
