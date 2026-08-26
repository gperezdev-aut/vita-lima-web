"use client";

import { useEffect, useRef } from "react";

type Review = {
  quote: string;
  author: string;
  source: string;
  rating: string;
};

type ReviewsCarouselProps = {
  reviews: Review[];
};

const PIXELS_PER_SECOND = 34;
const RESUME_DELAY_MS = 2600;

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reviews.length < 2) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId: number;
    let lastTime: number | null = null;
    // Posición propia en px, independiente del scrollLeft nativo: el navegador
    // limita scrollLeft a (scrollWidth - clientWidth), que puede ser menor que
    // la mitad del track cuando el viewport es ancho respecto al contenido
    // (por ejemplo con pocas reseñas), y eso congelaba el loop antes de
    // completarlo. Con transform no hay ese tope.
    let offset = 0;

    function step(timestamp: number) {
      if (lastTime === null) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      if (!pausedRef.current && document.visibilityState === "visible" && track) {
        const halfWidth = track.scrollWidth / 2;
        offset += (PIXELS_PER_SECOND * delta) / 1000;
        if (halfWidth > 0 && offset >= halfWidth) {
          offset -= halfWidth;
        }
        track.style.transform = `translateX(${-offset}px)`;
      }
      frameId = requestAnimationFrame(step);
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [reviews.length]);

  function pause() {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }

  function scheduleResume() {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  }

  // Duplicamos las reseñas para que el desplazamiento continuo se vea infinito:
  // al llegar a la mitad del ancho del track, restamos esa mitad y sigue igual.
  const loopedReviews = reviews.length > 1 ? [...reviews, ...reviews] : reviews;

  return (
    <div
      className="reviewsCarouselWrap"
      onMouseEnter={pause}
      onMouseLeave={scheduleResume}
      onTouchStart={pause}
      onTouchEnd={scheduleResume}
    >
      <div className="reviewGrid" ref={trackRef} aria-label="Opiniones de clientes">
        {loopedReviews.map((review, index) => (
          <article
            className="reviewCard"
            key={`${review.author}-${index}`}
            aria-hidden={index >= reviews.length ? true : undefined}
          >
            <div className="reviewTop">
              <span className="stars">★★★★★</span>
              <strong>{review.rating}</strong>
            </div>
            <blockquote>“{review.quote}”</blockquote>
            <div className="reviewSource">
              <span className="avatar">{review.author.charAt(0)}</span>
              <div>
                <strong>{review.author}</strong>
                <small>{review.source}</small>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
