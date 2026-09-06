/**
 * Datos de contacto del negocio. Los lee `content/structured-data.ts` para el
 * JSON-LD que publican todas las páginas.
 *
 * Este archivo llegó a tener también una lista de 5 servicios y las 2 sedes,
 * de cuando el sitio cabía en una sola página. Cuando el catálogo creció a 50
 * servicios y las sedes pasaron a tener página propia, esa copia dejó de
 * usarse pero se quedó aquí, envejeciendo en silencio: mantenía precios de
 * hace varias versiones y un horario que ya no era el publicado. Se retiró
 * para que no haya dos catálogos dentro del mismo repositorio.
 *
 * Los servicios viven en `content/services.ts` y las sedes en
 * `content/locations.ts`. Aquí solo contacto.
 */
export const site = {
  whatsapp: "51907308415",
  whatsappDisplay: "+51 907 308 415",
  email: "info@vitalimaspa.com",
  instagram: "https://www.instagram.com/vitalima1/",
  facebook: "https://www.facebook.com/vitalimaperu/",
  tiktok: "https://www.tiktok.com/@vita.lima"
};
