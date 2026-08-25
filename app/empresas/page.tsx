import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { corporate } from "@/content/corporate";

export const metadata: Metadata = {
  title: "Bienestar corporativo | Vita Lima Spa",
  description: "Masajes para empresas en silla o camilla, coaching empresarial, ergonomía laboral y limpieza facial express para tu equipo.",
  openGraph: {
    title: "Bienestar corporativo Vita Lima",
    description: "Pausas de masajes y bienestar para empresas y equipos en Lima.",
    type: "website",
  },
};

const whatsappHref = "https://wa.me/51907308415?text=" + encodeURIComponent("Hola Vita Lima, quisiera solicitar una propuesta de bienestar corporativo para mi empresa.");

export default function CorporatePage() {
  return (
    <main className="servicesCatalogPage">
      <header className="catalogHeader">
        <div className="catalogNav shell">
          <Link href="/" aria-label="Vita Lima Spa - Inicio">
            <Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={180} height={78} priority />
          </Link>
          <Link className="catalogBackLink" href="/">Volver al inicio</Link>
        </div>
        <div className="catalogHero shell">
          <p className="eyebrow catalogEyebrow">{corporate.eyebrow}</p>
          <h1>{corporate.title}</h1>
          <p>{corporate.description}</p>
          <a className="button orangeButton" href={whatsappHref} target="_blank" rel="noreferrer">
            Solicitar propuesta <span>→</span>
          </a>
        </div>
      </header>

      <div className="catalogSections" id="catalogo">
        <section className="catalogSection section">
          <div className="shell">
            <div className="catalogSectionHeader">
              <div>
                <p className="eyebrow">Modalidades</p>
                <h2>Cómo llevamos Vita Lima a tu oficina</h2>
              </div>
              <p>Adaptamos el servicio al espacio y al tiempo disponible de tu equipo.</p>
            </div>

            <div className="catalogGrid">
              {corporate.modes.map((mode) => (
                <article className="catalogCard" key={mode.title}>
                  <div className="catalogCardImage">
                    <Image src="/images/generated/corporate.webp" alt={mode.title} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  </div>
                  <div className="catalogCardBody">
                    <h3>{mode.title}</h3>
                    <p className="catalogIncludes" title={mode.text}>{mode.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="catalogSection section">
          <div className="shell">
            <div className="catalogSectionHeader">
              <div>
                <p className="eyebrow">Complementos</p>
                <h2>Más que masajes</h2>
              </div>
              <p>Servicios adicionales para sumar a tu programa de bienestar corporativo.</p>
            </div>

            <div className="catalogGrid">
              {corporate.addons.map((addon) => (
                <article className="catalogCard" key={addon.title}>
                  <div className="catalogCardImage">
                    <Image src="/images/generated/room_wide.webp" alt={addon.title} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  </div>
                  <div className="catalogCardBody">
                    <h3>{addon.title}</h3>
                    <p className="catalogIncludes" title={addon.text}>{addon.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <p style={{ marginTop: 32, color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{corporate.note}</p>
          </div>
        </section>
      </div>

      <SiteFooter context="internal" />
    </main>
  );
}
