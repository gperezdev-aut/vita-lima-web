import type { LocationCopy } from "@/content/locations";

/**
 * English copy for the two locations. Same shape as `LocationCopy` in
 * `content/locations.ts`; the Spanish file remains the source of truth for
 * everything that is not text (address, hours, coordinates, photos).
 *
 * Addresses stay exactly as they are written in Spanish — "Av. Aviación 3358,
 * oficina 204" — including the word "oficina": a visitor showing this to a
 * taxi driver or a building doorman needs the real wording, not a translation
 * of it. Only the surrounding explanation is in English.
 */
export const locationsEn: Record<string, LocationCopy> = {
  "san-borja": {
    heading: "Massages in San Borja",
    tagline: "Our main location, on Av. Aviación, a few minutes from the Pentagonito.",
    scheduleText: "Monday to Saturday, mainly from 3:00 p.m. to 8:00 p.m.",
    intro: [
      "San Borja is our main location and the one where the full catalog is available: individual massages, experiences for two, facials, session programs, and lash and brow services.",
      "The studio is on the second floor of a building on Av. Aviación, with private rooms — both single and couples — and its own reception. It is a quiet, well-connected area, a few minutes from the Pentagonito and the San Borja Cultural Center.",
    ],
    gettingHere: [
      "Av. Aviación 3358, oficina 204 — second floor.",
      "A few minutes from the Pentagonito and the San Borja Cultural Center.",
      "Direct access from Av. Aviación; there are public transport stops on the same block.",
      "Street parking, subject to availability in the area.",
    ],
    highlights: [
      "Full catalog available: individual, for two, facials, programs and beauty",
      "Private rooms for one person or for two",
      "The location with the widest choice of time slots",
      "Pick-up point for gift boxes and gift cards",
    ],
    faqs: [
      {
        q: "Do I need to book, or can I just walk in?",
        a: "Booking is always better. We work by appointment so that the room and your therapist are ready at your time; message us on WhatsApp at +51 907 308 415 and we'll arrange it.",
      },
      {
        q: "Is there parking?",
        a: "We don't have our own parking lot. There is street parking in the area, subject to availability.",
      },
      {
        q: "Which services are available in San Borja?",
        a: "The full catalog: individual massages, experiences for two, facials, session programs, and lash and brow services.",
      },
    ],
  },

  miraflores: {
    heading: "Massages in Miraflores",
    tagline: "On Av. Larco, in the heart of Miraflores. By appointment only.",
    scheduleText: "By appointment only.",
    intro: [
      "Our Miraflores location is on Av. Larco, a few blocks from Parque Kennedy and the boardwalk. We work by appointment only, so the room is prepared exclusively for your time slot.",
      "It is the most convenient location if you are staying in Miraflores — and our in-home massage includes travel at no extra cost anywhere within the district.",
    ],
    gettingHere: [
      "Av. Larco 812, oficina 306 — third floor.",
      "A few blocks from Parque Kennedy and the Miraflores roundabout.",
      "Well served by public transport and within walking distance of most hotels in the district.",
      "Paid parking lots nearby on Av. Larco.",
    ],
    highlights: [
      "By appointment only: the room is prepared just for your time slot",
      "A few blocks from Parque Kennedy and the boardwalk",
      "In-home massage with no travel charge within Miraflores",
      "Close to most hotels in the district",
    ],
    faqs: [
      {
        q: "Do you take walk-ins in Miraflores?",
        a: "No. The Miraflores location works by appointment only: message us on WhatsApp at +51 907 308 415 and we'll arrange your time.",
      },
      {
        q: "Can I book a massage at my hotel?",
        a: "Yes. Our in-home massage includes travel at no extra cost within Miraflores, and the therapist brings the table, towels and oils. It needs to be booked at least 24 hours in advance.",
      },
      {
        q: "Do you speak English?",
        a: "Yes, we can arrange your session in English. Message us on WhatsApp before booking so we can assign the right therapist.",
      },
    ],
  },
};
