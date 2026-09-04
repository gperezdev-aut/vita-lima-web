import type { Language } from "./LanguageContext";

/**
 * Rutas por idioma.
 *
 * Hasta ahora el selector ES/EN cambiaba el texto sin cambiar la URL: el
 * inglés existía para quien ya estaba en la página y pulsaba el botón, pero
 * no tenía dirección propia. Google indexa URLs, no clics, así que la
 * versión en inglés era invisible para el buscador y no se podía compartir.
 *
 * Ahora cada página traducida vive también bajo `/en`, y el idioma se deduce
 * de la URL (ver `LanguageContext`). El español es el idioma por defecto y
 * conserva sus rutas actuales sin prefijo, así que ningún enlace existente
 * se rompe.
 *
 * Los segmentos fijos se traducen ("servicios" → "services") porque forman
 * parte de la URL que ve y comparte el visitante. Los slugs de servicio no:
 * son nombres propios de la marca (relax-vital, coco-premium) y traducirlos
 * obligaría a mantener dos juegos de identificadores para el mismo servicio.
 */

export const EN_PREFIX = "/en";

/**
 * Pares de rutas equivalentes. El orden importa: se busca la coincidencia
 * más larga primero, para que "/servicios/relax-vital" use la regla de
 * "/servicios" y no la de "/".
 */
const ROUTE_PAIRS: { es: string; en: string }[] = [
  { es: "/servicios", en: "/en/services" },
  { es: "/san-borja", en: "/en/san-borja" },
  { es: "/miraflores", en: "/en/miraflores" },
  { es: "/", en: "/en" },
];

/**
 * Páginas que todavía no están traducidas (empresas, gift cards y las
 * legales). No tienen versión bajo `/en`: desde el sitio en inglés se enlaza
 * directamente a la versión en español, que es lo honesto — publicar una URL
 * en inglés con contenido en español sería contenido duplicado y una mala
 * experiencia. Cuando se traduzcan, basta agregarlas a ROUTE_PAIRS.
 */
export const UNTRANSLATED_PATHS = [
  "/empresas",
  "/regalos",
  "/politica-de-privacidad",
  "/terminos-y-condiciones",
];

function splitPath(path: string) {
  const [base, rest] = path.split(/(?=[#?])/, 2);
  return { base: base || "/", suffix: rest || "" };
}

/** El idioma que corresponde a una URL. Todo lo que cuelga de /en es inglés. */
export function languageFromPathname(pathname: string): Language {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? "en" : "es";
}

/** ¿Esta ruta en español tiene equivalente en inglés? */
export function hasEnglishVersion(esPath: string): boolean {
  const { base } = splitPath(esPath);
  return !UNTRANSLATED_PATHS.some((path) => base === path || base.startsWith(`${path}/`));
}

/**
 * Convierte una ruta en español a su equivalente en inglés. Si esa página
 * todavía no está traducida, devuelve la ruta en español tal cual.
 */
export function toEnglishPath(esPath: string): string {
  const { base, suffix } = splitPath(esPath);
  if (!hasEnglishVersion(base)) return esPath;

  for (const pair of ROUTE_PAIRS) {
    if (base === pair.es) return `${pair.en}${suffix}`;
    if (pair.es !== "/" && base.startsWith(`${pair.es}/`)) {
      return `${pair.en}${base.slice(pair.es.length)}${suffix}`;
    }
  }
  return `${EN_PREFIX}${base === "/" ? "" : base}${suffix}`;
}

/** Convierte una ruta en inglés a su equivalente en español. */
export function toSpanishPath(enPath: string): string {
  const { base, suffix } = splitPath(enPath);
  if (languageFromPathname(base) === "es") return enPath;

  for (const pair of ROUTE_PAIRS) {
    if (base === pair.en) return `${pair.es}${suffix}`;
    if (base.startsWith(`${pair.en}/`)) {
      return `${pair.es}${base.slice(pair.en.length)}${suffix}`;
    }
  }
  const withoutPrefix = base.slice(EN_PREFIX.length) || "/";
  return `${withoutPrefix}${suffix}`;
}

/**
 * Href para un enlace interno, a partir de la ruta canónica en español.
 * Los componentes siguen escribiendo rutas en español ("/servicios") y esta
 * función las traduce al idioma activo, así no hay que duplicar cada enlace.
 */
export function localizedPath(esPath: string, language: Language): string {
  return language === "en" ? toEnglishPath(esPath) : esPath;
}

/** La contraparte de la ruta actual, para el botón ES/EN. */
export function counterpartPath(pathname: string): string {
  return languageFromPathname(pathname) === "en" ? toSpanishPath(pathname) : toEnglishPath(pathname);
}

/**
 * Bloque `alternates` para la metadata de Next, que se publica como
 * <link rel="alternate" hreflang="..."> y le dice a Google que dos URLs son
 * la misma página en distinto idioma.
 *
 * `x-default` apunta siempre al español: es la versión principal del sitio y
 * la que corresponde a quien busca desde Perú.
 */
export function languageAlternates(esPath: string) {
  if (!hasEnglishVersion(esPath)) return undefined;
  return {
    "es-PE": esPath,
    en: toEnglishPath(esPath),
    "x-default": esPath,
  };
}
