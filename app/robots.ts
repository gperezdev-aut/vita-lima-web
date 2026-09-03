import type { MetadataRoute } from "next";

/**
 * En cualquier entorno que no sea producción el sitio se declara no indexable.
 *
 * Motivo: mientras `nueva.vitalimaspa.com` y `www.vitalimaspa.com` conviven,
 * ambos publican el mismo negocio y compiten entre sí en Google. Con
 * NEXT_PUBLIC_SITE_ENV=staging (o cualquier valor distinto de "production")
 * el subdominio de pruebas deja de ser rastreable. Si la variable no está
 * definida, el comportamiento es el de siempre: rastreo permitido.
 */
export const isProductionSite = (process.env.NEXT_PUBLIC_SITE_ENV || "production") === "production";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://nueva.vitalimaspa.com";

  if (!isProductionSite) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${base}/sitemap.xml` };
}
