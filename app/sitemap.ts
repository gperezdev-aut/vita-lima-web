import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://nueva.vitalimaspa.com";
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/politica-de-privacidad`, lastModified: new Date(), priority: 0.3 },
    { url: `${base}/terminos-y-condiciones`, lastModified: new Date(), priority: 0.3 }
  ];
}
