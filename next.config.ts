import type { NextConfig } from "next";

// Ver app/robots.ts: cuando el sitio no está marcado como producción se emite
// además la cabecera X-Robots-Tag, que es lo que impide que una URL ya
// conocida por Google siga apareciendo en resultados (robots.txt por sí solo
// evita el rastreo, no la indexación de una URL enlazada desde fuera).
const isProductionSite = (process.env.NEXT_PUBLIC_SITE_ENV || "production") === "production";

/**
 * Redirecciones desde las URLs del sitio anterior en Wix.
 *
 * El dominio `vitalimaspa.com` no cambia con la migración: cambia el servidor
 * que lo atiende. Eso conserva la antigüedad del dominio en Google, pero solo
 * si las URLs que ya tiene indexadas siguen respondiendo. Sin estas
 * redirecciones, cada posición ganada en años cae en un 404 el día del corte.
 *
 * Las rutas de origen salen del `pages-sitemap.xml` y del `blog-posts-sitemap.xml`
 * del Wix, leídos el 4 de setiembre de 2026.
 *
 * Se usa 301 (y no el 308 que Next emite con `permanent: true`) porque es el
 * código que toda herramienta de SEO y todo navegador antiguo entiende sin
 * ambigüedad. Google los trata igual; el resto del ecosistema no siempre.
 *
 * Los `source` con tilde o ñ van percent-encoded (ej. "%C3%A9" para "é"), no
 * como el carácter literal: Next.js compila `source` a una regex y la
 * compara contra la URL tal como llega (percent-encoded), así que un
 * carácter Unicode literal en `source` nunca hace match y la regla cae
 * silenciosamente en el comodín de más abajo. No "simplificar" esto de
 * vuelta a tildes literales sin volver a probar contra el build real.
 */
const wixRedirects = [
  // ── Páginas del sitio anterior ──────────────────────────────────────
  { source: "/home", destination: "/" },
  { source: "/masajes", destination: "/servicios#individual" },
  { source: "/serviciosvitalima", destination: "/servicios" },
  { source: "/services-9", destination: "/servicios" },
  { source: "/faciales", destination: "/servicios#facial" },
  { source: "/paquetes", destination: "/servicios#program" },
  { source: "/paquetespara2", destination: "/servicios#couples" },
  { source: "/mirada", destination: "/servicios#mirada-y-belleza" },
  { source: "/masajesadomicilio", destination: "/servicios#home" },
  { source: "/para-empresas", destination: "/empresas" },
  { source: "/book-online", destination: "/#reserva" },
  { source: "/contactanos", destination: "/#sedes" },
  { source: "/contactus", destination: "/#sedes" },
  { source: "/contact-8", destination: "/#sedes" },
  { source: "/quienes-somos", destination: "/" },
  { source: "/trabajaconnosotros", destination: "/" },
  { source: "/encuesta", destination: "/" },
  { source: "/payment-request-page", destination: "/" },
  { source: "/protocolos-y-condiciones", destination: "/terminos-y-condiciones" },

  // ── Blog: los seis artículos que se rescataron como guías ───────────
  {
    source: "/single-post/el-masaje-siempre-duele-para-ser-efectivo-descubre-la-verdad",
    destination: "/guias/el-masaje-tiene-que-doler",
  },
  {
    source: "/single-post/descubre-los-beneficios-del-masaje-relajante-en-lima",
    destination: "/guias/beneficios-del-masaje-relajante",
  },
  {
    source: "/single-post/descubre-los-beneficios-de-un-masaje-relajante-y-c%C3%B3mo-puede-transformar-tu-bienestar",
    destination: "/guias/beneficios-del-masaje-relajante",
  },
  { source: "/single-post/reflexologiapodal", destination: "/guias/que-es-la-reflexologia-podal" },
  { source: "/single-post/2017/03/29/masaje-pre-natal", destination: "/guias/masaje-prenatal-cuando-si" },
  {
    source: "/single-post/2018/08/20/como-combatir-el-estr%C3%A9s",
    destination: "/guias/bajar-el-estres-sin-formulas-magicas",
  },
  { source: "/single-post/2019/12/19/masajes-reductores", destination: "/guias/que-es-la-bambuterapia" },
  {
    source: "/single-post/2016/08/26/beneficios-de-los-masajes-relajantes",
    destination: "/guias/beneficios-del-masaje-relajante",
  },

  // ── Blog: los que no se migraron, al servicio o la guía más cercana ──
  { source: "/single-post/2016/08/16/masajes-relajantes", destination: "/servicios/relax-vital" },
  { source: "/single-post/2017/03/21/-porque-consumir-col%C3%A1geno-hidrolisado", destination: "/servicios/glow-facial" },
  { source: "/single-post/2016/11/01/serum-rejuvenecedor-celular", destination: "/servicios/facial-glow-premium-solo" },
  { source: "/single-post/2016/08/16/beneficios-de-beber-agua", destination: "/guias" },
  {
    source: "/single-post/2016/08/16/-es-bueno-beber-agua-por-la-noche-la-respuesta-te-sorprender%C3%A1",
    destination: "/guias",
  },

  // ── Redes de seguridad ──────────────────────────────────────────────
  // Cubren lo que el sitemap del Wix no listaba: reservas, tienda, perfiles
  // de miembro y cualquier artículo de blog que se nos haya pasado. Van al
  // final para que las reglas específicas de arriba ganen.
  { source: "/blog", destination: "/guias" },
  { source: "/blog/:path*", destination: "/guias" },
  { source: "/single-post/:path*", destination: "/guias" },
  { source: "/booking-calendar/:path*", destination: "/servicios" },
  { source: "/service-page/:path*", destination: "/servicios" },
  { source: "/product-page/:path*", destination: "/regalos" },
  { source: "/category/:path*", destination: "/servicios" },
  { source: "/member-profile/:path*", destination: "/" },
  { source: "/profile/:path*", destination: "/" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return wixRedirects.map((redirect) => ({ ...redirect, statusCode: 301 as const }));
  },
  async headers() {
    if (isProductionSite) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
