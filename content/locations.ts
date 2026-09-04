/**
 * Datos de las dos sedes. Alimentan las páginas `/san-borja` y `/miraflores`,
 * el JSON-LD de tipo DaySpa y la sección de sedes del home.
 *
 * PENDIENTE DEL DUEÑO (marcado con TODO en cada campo):
 *  - `geo`: coordenadas exactas de cada local. Mientras estén vacías, el
 *    JSON-LD omite la propiedad `geo` en vez de publicar un dato inventado.
 *  - Fotos de Miraflores: hoy no hay sesión de fotos propia de esa sede en
 *    `public/images/`, así que usa fotos generales del spa.
 *  - `openingHours`: el horario publicado hoy en el sitio es aproximado
 *    ("principalmente de 3 a 8 p. m."). Conviene confirmarlo día por día.
 */

export type LocationSchedule = {
  /** Días en formato schema.org: Monday, Tuesday, ... */
  days: string[];
  opens: string;
  closes: string;
};

/**
 * La parte traducible de una sede. `content/locations-en.ts` publica esta
 * misma forma en inglés y `lib/i18n/locationText.ts` elige según el idioma
 * activo, campo por campo.
 */
export type LocationCopy = {
  /** Título de la página, orientado a búsqueda local. */
  heading: string;
  tagline: string;
  /** Texto de horario para mostrar al visitante. */
  scheduleText: string;
  intro: string[];
  /** Referencias del barrio para llegar. */
  gettingHere: string[];
  /** Qué distingue a esta sede. */
  highlights: string[];
  faqs: { q: string; a: string }[];
};

export type Location = LocationCopy & {
  slug: "san-borja" | "miraflores";
  name: string;
  streetAddress: string;
  district: string;
  /** Horario estructurado para el JSON-LD. Vacío = no se publica. */
  openingHours: LocationSchedule[];
  /** TODO: reemplazar por las coordenadas reales del local. */
  geo?: { latitude: number; longitude: number };
  mapQuery: string;
  /** Imagen estática que se muestra antes de cargar el iframe de Google Maps. */
  heroImage: string;
  gallery: string[];
  /** Slugs de servicios que se destacan en esta sede. */
  featuredServiceSlugs: string[];
};

export const locations: Location[] = [
  {
    slug: "san-borja",
    name: "San Borja",
    heading: "Masajes en San Borja",
    tagline: "Nuestra sede principal, en Av. Aviación, a pasos del Pentagonito.",
    streetAddress: "Av. Aviación 3358, oficina 204",
    district: "San Borja",
    scheduleText: "Lunes a sábado, principalmente de 3:00 p. m. a 8:00 p. m.",
    openingHours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "15:00", closes: "20:00" },
    ],
    mapQuery: "Av. Aviacion 3358 San Borja Lima",
    heroImage: "/images/sede-san-borja/san-borja-03.webp",
    gallery: [
      "/images/sede-san-borja/san-borja-01.webp",
      "/images/sede-san-borja/san-borja-02.webp",
      "/images/sede-san-borja/san-borja-04.webp",
      "/images/sede-san-borja/san-borja-05.webp",
      "/images/sede-san-borja/san-borja-06.webp",
      "/images/sede-san-borja/san-borja-07.webp",
      "/images/sede-san-borja/san-borja-08.webp",
      "/images/sede-san-borja/san-borja-09.webp",
      "/images/sede-san-borja/san-borja-10.webp",
      "/images/sede-san-borja/san-borja-11.webp",
      "/images/sede-san-borja/san-borja-12.webp",
      "/images/sede-san-borja/san-borja-13.webp",
      "/images/sede-san-borja/san-borja-14.webp",
      "/images/sede-san-borja/san-borja-15.webp",
      "/images/sede-san-borja/san-borja-16.webp",
      "/images/sede-san-borja/san-borja-17.webp",
      "/images/sede-san-borja/san-borja-18.webp",
      "/images/sede-san-borja/san-borja-19.webp",
      "/images/sede-san-borja/san-borja-20.webp",
    ],
    intro: [
      "San Borja es nuestra sede principal y donde está disponible el catálogo completo: masajes individuales, experiencias para dos, faciales, programas de sesiones y servicios de mirada y belleza.",
      "El local está en el segundo piso de un edificio de Av. Aviación, con salas privadas —individuales y de pareja— y recepción propia. Es una zona tranquila y bien conectada, a pocos minutos del Pentagonito y del Centro Cultural.",
    ],
    gettingHere: [
      "Av. Aviación 3358, oficina 204 — segundo piso.",
      "A pocos minutos del Pentagonito y del Centro Cultural de San Borja.",
      "Acceso directo desde Av. Aviación; hay paraderos de transporte público en la misma cuadra.",
      "Estacionamiento en la vía pública según disponibilidad de la zona.",
    ],
    highlights: [
      "Catálogo completo disponible: individuales, para dos, faciales, programas y belleza",
      "Salas privadas individuales y de pareja",
      "Sede con mayor disponibilidad de horarios",
      "Punto de recojo de cajas de regalo y gift cards",
    ],
    featuredServiceSlugs: ["relax-vital", "alivio-integral", "balance-plus", "relax", "deluxe", "glow-facial"],
    faqs: [
      {
        q: "¿Necesito reservar o puedo llegar sin cita?",
        a: "Siempre conviene reservar. Trabajamos con cita para que la sala y la terapeuta estén disponibles a tu hora; escríbenos por WhatsApp al +51 907 308 415 y coordinamos.",
      },
      {
        q: "¿Hay estacionamiento?",
        a: "No contamos con playa propia. Se estaciona en la vía pública de la zona, según disponibilidad.",
      },
      {
        q: "¿Qué servicios están disponibles en San Borja?",
        a: "El catálogo completo: masajes individuales, experiencias para dos, faciales, programas de sesiones y servicios de mirada y belleza.",
      },
    ],
  },
  {
    slug: "miraflores",
    name: "Miraflores",
    heading: "Masajes en Miraflores",
    tagline: "En Av. Larco, en el corazón de Miraflores. Atención previa reserva.",
    streetAddress: "Av. Larco 812, oficina 306",
    district: "Miraflores",
    scheduleText: "Atención previa reserva.",
    openingHours: [],
    mapQuery: "Av. Larco 812 Miraflores Lima",
    // TODO: reemplazar por fotos reales de la sede de Miraflores cuando estén.
    heroImage: "/images/signature/reception.webp",
    gallery: [
      "/images/signature/buddha.webp",
      "/images/signature/room-wide.webp",
      "/images/signature/room-stone.webp",
      "/images/signature/ambience.webp",
      "/images/signature/couple-room.webp",
      "/images/signature/facial-room.webp",
    ],
    intro: [
      "La sede de Miraflores está sobre Av. Larco, a pocas cuadras del Parque Kennedy y del malecón. Atendemos con reserva previa, así que la sala está preparada exclusivamente para tu horario.",
      "Es la sede más conveniente si te hospedas en Miraflores: además, el masaje a domicilio incluye el traslado sin costo dentro del distrito.",
    ],
    gettingHere: [
      "Av. Larco 812, oficina 306 — tercer piso.",
      "A pocas cuadras del Parque Kennedy y del Óvalo de Miraflores.",
      "Zona bien conectada por transporte público y a corta distancia caminando desde la mayoría de hoteles del distrito.",
      "Estacionamiento en playas cercanas de Av. Larco.",
    ],
    highlights: [
      "Atención con reserva previa: la sala se prepara solo para tu horario",
      "A pocas cuadras del Parque Kennedy y el malecón",
      "Traslado sin costo para masaje a domicilio dentro de Miraflores",
      "Cerca de la mayoría de hoteles del distrito",
    ],
    featuredServiceSlugs: [
      "relax-vital",
      "espalda-libre",
      "masaje-domicilio-1-hora",
      "relax",
      "reflexologia",
      "piedras-calientes",
    ],
    faqs: [
      {
        q: "¿Atienden sin cita en Miraflores?",
        a: "No. La sede de Miraflores trabaja con reserva previa: escríbenos por WhatsApp al +51 907 308 415 y coordinamos tu horario.",
      },
      {
        q: "¿Puedo pedir el masaje en mi hotel?",
        a: "Sí. El masaje a domicilio incluye el traslado sin costo dentro de Miraflores, y la terapeuta lleva camilla, toallas y aceites. Requiere reservar con 24 horas de anticipación.",
      },
      {
        q: "¿Atienden en inglés?",
        a: "Sí, podemos coordinar la atención en inglés. Escríbenos por WhatsApp antes de reservar para asegurarnos de asignar la terapeuta adecuada.",
      },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}
