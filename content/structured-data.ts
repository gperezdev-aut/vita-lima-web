import { services, type Service } from "@/content/services";
import { giftBoxes } from "@/content/giftboxes";
import { site } from "@/content/site";
import { locations, type Location } from "@/content/locations";
import { serviceDetails, getServiceImages } from "@/content/service-details";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nueva.vitalimaspa.com";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Reputación real publicada en el sitio (mismos números que muestra el hero
 * y la sección de opiniones). Vive en una sola constante para que la ficha
 * visible y el JSON-LD no puedan desalinearse.
 *
 * Antes el JSON-LD declaraba 5.0 sobre 3 reseñas —el promedio de los tres
 * testimonios escritos a mano en la página—, que no es la calificación real
 * del negocio. Además publicaba esos tres testimonios como `review` de la
 * propia ficha: Google desaconseja marcar reseñas escritas por el propio
 * sitio sobre sí mismo, así que ya no se emiten como datos estructurados
 * (siguen visibles para el visitante en la sección de opiniones).
 */
export const reputation = {
  google: { ratingValue: 4.7, reviewCount: 226 },
  tripadvisor: { ratingValue: 4.8, reviewCount: 399 },
};

function cleanServiceName(name: string) {
  // Los nombres de servicio llevan un emoji decorativo adelante (ej. "🌿 Relax Vital");
  // para los datos estructurados usamos el nombre limpio.
  return name.replace(/^[\p{Extended_Pictographic}️\s]+/u, "").trim();
}

export { cleanServiceName };

// Excluye los programas de varias sesiones (paquetes) del rango de precios: son un
// costo total por varias visitas, no lo que cuesta una sesión típica, y mezclarlos
// exageraba el rango (ej. programas de 10 sesiones cerca de S/650).
const singleVisitPrices = services.filter((service) => service.group !== "SESSIONS").map((service) => service.price);
const priceRange = `S/ ${Math.min(...singleVisitPrices)} - S/ ${Math.max(...singleVisitPrices)}`;

function locationId(location: Location) {
  return `${SITE_URL}/${location.slug}#sede`;
}

function openingHoursSpecification(location: Location) {
  if (location.openingHours.length === 0) return undefined;
  return location.openingHours.map((schedule) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: schedule.days.map((day) => `https://schema.org/${day}`),
    opens: schedule.opens,
    closes: schedule.closes,
  }));
}

function postalAddress(location: Location) {
  return {
    "@type": "PostalAddress",
    streetAddress: location.streetAddress,
    addressLocality: location.district,
    addressRegion: "Lima",
    addressCountry: "PE",
  };
}

/** Ficha completa de una sede, usada en `/san-borja` y `/miraflores`. */
export function buildLocationJsonLd(location: Location) {
  const hours = openingHoursSpecification(location);

  return {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    "@id": locationId(location),
    name: `Vita Lima Spa - ${location.name}`,
    url: `${SITE_URL}/${location.slug}`,
    image: `${SITE_URL}${location.heroImage}`,
    telephone: `+${site.whatsapp}`,
    email: site.email,
    priceRange,
    currenciesAccepted: "PEN",
    address: postalAddress(location),
    // `geo` solo se publica cuando hay coordenadas reales cargadas en
    // content/locations.ts: es preferible omitir la propiedad antes que
    // publicar una ubicación aproximada.
    ...(location.geo ? { geo: { "@type": "GeoCoordinates", ...location.geo } } : {}),
    ...(hours ? { openingHoursSpecification: hours } : {}),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`,
    parentOrganization: { "@id": ORGANIZATION_ID },
    sameAs: [site.instagram, site.facebook, site.tiktok],
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    "@id": ORGANIZATION_ID,
    name: "Vita Lima Spa",
    url: SITE_URL,
    image: `${SITE_URL}/images/signature/hero.webp`,
    telephone: `+${site.whatsapp}`,
    email: site.email,
    priceRange,
    currenciesAccepted: "PEN",
    address: postalAddress(locations[0]),
    sameAs: [site.instagram, site.facebook, site.tiktok],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reputation.google.ratingValue,
      bestRating: "5",
      reviewCount: reputation.google.reviewCount,
    },
    department: locations.map((location) => ({
      "@type": "DaySpa",
      "@id": locationId(location),
      name: `Vita Lima Spa - ${location.name}`,
      url: `${SITE_URL}/${location.slug}`,
      address: postalAddress(location),
      telephone: `+${site.whatsapp}`,
      ...(openingHoursSpecification(location) ? { openingHoursSpecification: openingHoursSpecification(location) } : {}),
    })),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Vita Lima Spa",
    inLanguage: "es-PE",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function buildFaqJsonLd(faqs: string[][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/** Migas de pan. `trail` va del nivel más alto al más profundo. */
export function buildBreadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: `${SITE_URL}${step.path}`,
    })),
  };
}

/** Ficha de un servicio individual, para `/servicios/[slug]`. */
export function buildServiceJsonLd(service: Service) {
  const detail = serviceDetails[service.slug];
  const name = cleanServiceName(service.name);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/servicios/${service.slug}#servicio`,
    name,
    description: detail?.tagline || service.includes,
    serviceType: name,
    url: `${SITE_URL}/servicios/${service.slug}`,
    image: getServiceImages(service).map((path) => `${SITE_URL}${path}`),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: locations.map((location) => ({ "@type": "City", name: location.district })),
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "PEN",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/servicios/${service.slug}`,
      seller: { "@id": ORGANIZATION_ID },
    },
  };
}

export function buildServicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/servicios/${service.slug}`,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/servicios/${service.slug}#servicio`,
        name: cleanServiceName(service.name),
        description: service.includes,
        url: `${SITE_URL}/servicios/${service.slug}`,
        provider: { "@id": ORGANIZATION_ID },
        offers: {
          "@type": "Offer",
          price: service.price,
          priceCurrency: "PEN",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };
}

export function buildGiftBoxesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: giftBoxes.map((box, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: box.name,
        description: box.includes,
        brand: { "@id": ORGANIZATION_ID },
        offers: {
          "@type": "Offer",
          price: box.price,
          priceCurrency: "PEN",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };
}
