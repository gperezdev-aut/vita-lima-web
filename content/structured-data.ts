import { services } from "@/content/services";
import { giftBoxes } from "@/content/giftboxes";
import { site } from "@/content/site";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nueva.vitalimaspa.com";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

function cleanServiceName(name: string) {
  // Los nombres de servicio llevan un emoji decorativo adelante (ej. "🌿 Relax Vital");
  // para los datos estructurados usamos el nombre limpio.
  return name.replace(/^[\p{Extended_Pictographic}️\s]+/u, "").trim();
}

// Excluye los programas de varias sesiones (paquetes) del rango de precios: son un
// costo total por varias visitas, no lo que cuesta una sesión típica, y mezclarlos
// exageraba el rango (ej. programas de 10 sesiones cerca de S/650).
const singleVisitPrices = services.filter((service) => service.group !== "SESSIONS").map((service) => service.price);
const priceRange = `S/ ${Math.min(...singleVisitPrices)} - S/ ${Math.max(...singleVisitPrices)}`;

const testimonials = [
  { quote: "Me encantó el ambiente, el aroma y el profesionalismo. Fue una experiencia realmente relajante.", author: "María Claudia N." },
  { quote: "La atención fue excelente y el masaje me ayudó muchísimo. El lugar transmite tranquilidad desde que llegas.", author: "Carla A." },
  { quote: "Un servicio muy profesional, limpio y acogedor. Definitivamente volvería.", author: "Milagritos C." },
];

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
    sameAs: [site.instagram, site.facebook, site.tiktok],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      reviewCount: testimonials.length,
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      author: { "@type": "Person", name: testimonial.author },
      reviewBody: testimonial.quote,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    })),
    department: site.locations.map((location) => ({
      "@type": "DaySpa",
      name: `Vita Lima Spa - ${location.name}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.address,
        addressLocality: location.name,
        addressRegion: "Lima",
        addressCountry: "PE",
      },
      telephone: `+${site.whatsapp}`,
    })),
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

export function buildServicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: cleanServiceName(service.name),
        description: service.includes,
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
