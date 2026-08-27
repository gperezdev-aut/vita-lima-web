"use client";

import { useEffect, useRef, useState } from "react";
import type { Service } from "@/content/services";
import { serviceSummary } from "@/lib/serviceSummary";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { serviceText } from "@/lib/i18n/serviceText";
import RotatingCardImage from "./RotatingCardImage";

type FeaturedCarouselProps = {
  services: Service[];
  images: Record<string, string[]>;
};

const whatsappNumber = "51907308415";

export default function FeaturedCarousel({ services, images }: FeaturedCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  // Pausa compartida para la rotación de fotos de todas las tarjetas
  // (WCAG 2.2.2): un solo botón controla las N instancias de RotatingCardImage.
  const [imagesPaused, setImagesPaused] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].featuredCarousel;
  const tPricing = translations[language].pricing;

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
      <div className="featuredCarousel" role="group" aria-label={t.groupLabel} ref={trackRef}>
        {services.map((service, index) => {
          const text = serviceText(service, language);
          // Resumen corto que se muestra siempre en la tarjeta. Cuando coincide
          // exactamente con el detalle completo (text.includes) no hay nada nuevo
          // que revelar, así que no se muestra el botón "Saber más" para ese caso
          // (evita repetir la misma línea dos veces).
          const summary = text.featuredSummary || serviceSummary(text.includes);
          const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.whatsappMessage(text.name))}`;

          return (
            <article className="featuredServiceCard" id={`featured-${service.slug}`} key={service.code}>
              <div className="featuredServiceImage">
                <RotatingCardImage
                  images={images[service.slug]}
                  alt={text.name}
                  sizes="(max-width: 760px) 88vw, (max-width: 1100px) 46vw, 30vw"
                  staggerMs={index * 700}
                  paused={imagesPaused}
                />
                <span>{text.badge}</span>
              </div>
              <div className="featuredServiceBody">
                <h3>{text.name}</h3>
                <div className="featuredServiceMeta">
                  <span>{service.duration} min</span>
                  <span className="priceNow">
                    {service.originalPrice && (
                      <s className="priceOld">
                        <span className="srOnly">{tPricing.before} </span>
                        S/ {service.originalPrice}
                      </s>
                    )}
                    <strong>
                      {service.originalPrice && <span className="srOnly">{tPricing.now} </span>}
                      S/ {service.price}
                    </strong>
                  </span>
                </div>
                <p className="featuredServiceSummary">{summary}</p>
                {text.includes !== summary && (
                  <details className="featuredServiceDetails">
                    <summary>{t.learnMore}</summary>
                    <p>{text.includes}</p>
                  </details>
                )}
                <a href={whatsappHref} target="_blank" rel="noreferrer" aria-label={t.bookAria(text.name)}>
                  {t.book} <span>→</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
      <div className="featuredCarouselControls" aria-label={t.controlsLabel}>
        <button
          type="button"
          onClick={() => setImagesPaused((current) => !current)}
          aria-pressed={imagesPaused}
          aria-label={imagesPaused ? t.resume : t.pause}
        >
          {imagesPaused ? "▶" : "❚❚"}
        </button>
        <div className="featuredCarouselArrows">
          <button type="button" onClick={() => scrollByCard(-1)} disabled={!canScrollPrev} aria-label={t.prev}>←</button>
          <button type="button" onClick={() => scrollByCard(1)} disabled={!canScrollNext} aria-label={t.next}>→</button>
        </div>
      </div>
    </div>
  );
}
