"use client";

import Image from "next/image";
import { useState } from "react";
import { BLUR_DATA_URL } from "@/lib/blurPlaceholder";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

type ConsentMapProps = {
  /** Nombre de la sede, para el título accesible del iframe. */
  name: string;
  /** Consulta de dirección que se envía a Google Maps. */
  query: string;
  /** Foto de la sede que se muestra en lugar del mapa hasta que se abre. */
  previewImage: string;
  previewAlt: string;
};

/**
 * Mapa de Google que no se carga solo.
 *
 * Antes el home embebía dos iframes de Google Maps en la carga inicial: eso
 * descarga el JavaScript de Maps y deja cookies de Google antes de que el
 * visitante llegue siquiera a esa sección, además de pesar en el LCP de la
 * página de entrada. Ahora se muestra una foto de la sede y el iframe se
 * inserta solo cuando la persona pulsa "Ver mapa" — un clic explícito e
 * informado, con el aviso a la vista.
 */
export default function ConsentMap({ name, query, previewImage, previewAlt }: ConsentMapProps) {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].mapEmbed;

  if (open) {
    return (
      <div className="locationMapCard">
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t.loadedTitle(name)}
        />
      </div>
    );
  }

  return (
    <div className="locationMapCard locationMapPlaceholder">
      <Image src={previewImage} alt={previewAlt} fill sizes="(max-width: 760px) 100vw, 50vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
      <div className="locationMapVeil" />
      <div className="locationMapPrompt">
        <button type="button" className="button orangeButton" onClick={() => setOpen(true)}>
          {t.open}
        </button>
        <p>{t.notice}</p>
      </div>
    </div>
  );
}
