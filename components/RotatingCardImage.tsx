"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BLUR_DATA_URL } from "@/lib/blurPlaceholder";

type RotatingCardImageProps = {
  images: string[];
  alt: string;
  sizes: string;
  /** Tiempo que cada imagen permanece visible antes de cambiar. */
  intervalMs?: number;
  /** Retraso inicial para que no todas las tarjetas roten a la vez. */
  staggerMs?: number;
  /** Pausa manual (WCAG 2.2.2), controlada por un botón compartido en FeaturedCarousel. */
  paused?: boolean;
};

export default function RotatingCardImage({ images, alt, sizes, intervalMs = 4500, staggerMs = 0, paused = false }: RotatingCardImageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeImages = images && images.length > 0 ? images : [];

  useEffect(() => {
    if (safeImages.length < 2 || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % safeImages.length);
      intervalId = setInterval(() => {
        setActiveIndex((current) => (current + 1) % safeImages.length);
      }, intervalMs);
    }, intervalMs + staggerMs);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeImages.length, paused]);

  if (safeImages.length === 0) return null;

  return (
    <>
      {safeImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={index === 0 ? alt : ""}
          aria-hidden={index === 0 ? undefined : true}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          style={{ opacity: index === activeIndex ? 1 : 0, transition: "opacity 1.1s ease" }}
        />
      ))}
    </>
  );
}
