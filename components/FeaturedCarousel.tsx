"use client";

import { useEffect, useRef, useState } from "react";
import type { Service } from "@/content/services";
import { serviceSummary } from "@/lib/serviceSummary";
import RotatingCardImage from "./RotatingCardImage";

type FeaturedCarouselProps = {
  services: Service[];
  images: Record<string, string[]>;
};

const whatsappNumber = "51907308415";

function serviceWhatsAppHref(serviceName: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola Vita Lima, quisiera reservar el servicio ${serviceName}.`)}`;
}

// Resumen corto que se muestra siempre en la tarjeta. Cuando coincide
// exactamente con el detalle completo (service.includes) no hay nada nuevo
// que revelar, así que no se muestra el botón "Saber más" para ese caso
// (evita repetir la misma línea dos veces).
function summaryFor(service: Service) {
  return service.featuredSummary || serviceSummary(service.includes);
}

export default function FeaturedCarousel({ services, images }: FeaturedCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  // Pausa compartida para la rotación de fotos de todas las tarjetas
  // (WCAG 2.2.2): un solo botón controla las N instancias de RotatingCardImage.
  const [imagesPaused, setImagesPaused] = useState(false);

  function updateArrowState() {
    const track = trackRef.current;
    if (!track) return;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxScrollLeft - 4);
  }

  useEffect(() => {
    updateArrowState();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateArrowState, { passive: true });
    window.addEventListener("resize", updateArrowState);
    return () => {
      track.removeEventListener("scroll", updateArrowState);
      window.removeEventListener("resize", updateArrowState);
    };
  }, []);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".featuredServiceCard");
    const step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <div className="featuredCarouselWrap">
      <div className="featuredCarousel" role="group" aria-label="Servicios favoritos" ref={trackRef}>
        {services.map((service, index) => (
          <article className="featuredServiceCard" id={`featured-${service.slug}`} key={service.code}>
            <div className="featuredServiceImage">
              <RotatingCardImage
                images={images[service.slug]}
                alt={service.name}
                sizes="(max-width: 760px) 88vw, (max-width: 1100px) 46vw, 30vw"
                staggerMs={index * 700}
                paused={imagesPaused}
              />
              <span>{service.badge}</span>
            </div>
            <div className="featuredServiceBody">
              <h3>{service.name}</h3>
              <div className="featuredServiceMeta">
                <span>{service.duration} min</span>
                <strong>S/ {service.price}</strong>
              </div>
              <p className="featuredServiceSummary">{summaryFor(service)}</p>
              {service.includes !== summaryFor(service) && (
                <details className="featuredServiceDetails">
                  <summary>Saber más</summary>
                  <p>{service.includes}</p>
                </details>
              )}
              <a href={serviceWhatsAppHref(service.name)} target="_blank" rel="noreferrer" aria-label={`Reservar ${service.name} por WhatsApp`}>
                Reservar <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="featuredCarouselControls" aria-label="Controles del carrusel">
        <button
          type="button"
          onClick={() => setImagesPaused((current) => !current)}
          aria-pressed={imagesPaused}
          aria-label={imagesPaused ? "Reanudar la rotación de fotos" : "Pausar la rotación de fotos"}
        >
          {imagesPaused ? "▶" : "❚❚"}
        </button>
        <div className="featuredCarouselArrows">
          <button type="button" onClick={() => scrollByCard(-1)} disabled={!canScrollPrev} aria-label="Ver servicios anteriores">←</button>
          <button type="button" onClick={() => scrollByCard(1)} disabled={!canScrollNext} aria-label="Ver más servicios">→</button>
        </div>
      </div>
    </div>
  );
}
