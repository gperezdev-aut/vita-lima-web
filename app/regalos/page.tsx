import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import JsonLd from "@/components/JsonLd";
import { giftBoxes, giftBoxesNote } from "@/content/giftboxes";
import { buildGiftBoxesJsonLd } from "@/content/structured-data";

export const metadata: Metadata = {
  title: "Gift Cards y cajas de regalo | Vita Lima Spa",
  description: "Regala una experiencia Vita Lima: cajas de regalo con masaje incluido, en distintas presentaciones y precios.",
  openGraph: {
    title: "Gift Cards Vita Lima",
    description: "Cajas de regalo con masaje incluido para sorprender a alguien especial.",
    type: "website",
  },
};

const giftImages = [
  "/images/generated/gift.webp",
  "/images/generated/couple.webp",
  "/images/signature/facial.webp",
  "/images/generated/reception.webp",
  "/images/v4/ambience.webp",
];

function whatsappHref(name?: string) {
  const message = name
    ? `Hola Vita Lima, quisiera pedir la caja de regalo "${name}".`
    : "Hola Vita Lima, quisiera más información sobre las cajas de regalo.";
  return `https://wa.me/51907308415?text=${encodeURIComponent(message)}`;
}

export default function GiftCardsPage() {
  return (
    <main className="servicesCatalogPage">
      <JsonLd data={buildGiftBoxesJsonLd()} />
      <header className="catalogHeader">
        <div className="catalogNav shell">
          <Link href="/" aria-label="Vita Lima Spa - Inicio">
            <Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={180} height={78} priority />
          </Link>
          <Link className="catalogBackLink" href="/">Volver al inicio</Link>
        </div>
        <div className="catalogHero shell">
          <p className="eyebrow catalogEyebrow">Para sorprender</p>
          <h1>Gift Cards Vita Lima</h1>
          <p>Regala bienestar con una caja diseñada para la ocasión, con masaje incluido.</p>
          <a className="button orangeButton" href={whatsappHref()} target="_blank" rel="noreferrer">
            Consultar por WhatsApp <span>→</span>
          </a>
        </div>
      </header>

      <div className="catalogSections" id="catalogo">
        <section className="catalogSection section">
          <div className="shell">
            <div className="catalogSectionHeader">
              <div>
                <p className="eyebrow">Cajas de regalo</p>
                <h2>Elige la caja ideal</h2>
              </div>
              <p>Todas incluyen un masaje de 1 hora más detalles temáticos según la presentación.</p>
            </div>

            <div className="catalogGrid">
              {giftBoxes.map((box, index) => (
                <article className="catalogCard" id={box.slug} key={box.slug}>
                  <div className="catalogCardImage">
                    <Image src={giftImages[index % giftImages.length]} alt={box.name} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  </div>
                  <div className="catalogCardBody">
                    <h3>{box.name}</h3>
                    <div className="catalogCardTop">
                      <span>Incluye masaje</span>
                      <strong>S/ {box.price}</strong>
                    </div>
                    <p className="catalogIncludes" title={box.includes}>{box.includes}</p>
                    <AddToCartButton
                      className="catalogReserveButton"
                      label="Agregar"
                      item={{ id: box.slug, name: box.name, price: box.price, meta: "Incluye masaje" }}
                    />
                  </div>
                </article>
              ))}
            </div>

            <p style={{ marginTop: 32, color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{giftBoxesNote}</p>
          </div>
        </section>
      </div>

      <SiteFooter context="internal" />
    </main>
  );
}
