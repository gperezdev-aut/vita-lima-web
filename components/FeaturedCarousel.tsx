"use client";

import { useEffect, useRef, useState } from "react";
import type { Service } from "@/content/services";
import RotatingCardImage from "./RotatingCardImage";

type FeaturedCarouselProps = {
  services: Service[];
  images: Record<string, string[]>;
};

const whatsappNumber = "51907308415";

function serviceWhatsAppHref(serviceName: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola Vita Lima, quisiera reservar el servicio ${serviceName}.`)}`;
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
              <a href={serviceWhatsAppHref(service.name)} target="_blank" rel="noreferrer" aria-label={`Reservar ${service.name} por WhatsApp`}>
                Reservar <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="featuredCarouselArrows" aria-label="Controles del carrusel">
        <button
          type="button"
          onClick={() => setImagesPaused((current) => !current)}
          aria-pressed={imagesPaused}
          aria-label={imagesPaused ? "Reanudar la rotación de fotos" : "Pausar la rotación de fotos"}
        >
          {imagesPaused ? "▶" : "❚❚"}
        </button>
        <button type="button" onClick={() => scrollByCard(-1)} disabled={!canScrollPrev} aria-label="Ver servicios anteriores">←</button>
        <button type="button" onClick={() => scrollByCard(1)} disabled={!canScrollNext} aria-label="Ver más servicios">→</button>
      </div>
    </div>
  );
}
