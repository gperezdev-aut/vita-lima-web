import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

/**
 * Página 404 propia.
 *
 * Hasta ahora cualquier URL inexistente devolvía la pantalla por defecto de
 * Next.js: fondo blanco, "404: This page could not be found." en inglés, sin
 * logo y sin ninguna salida. Con las 22 redirecciones del sitio anterior en
 * funcionamiento, cada URL vieja que no se haya contemplado —y las que la
 * gente escribe mal— aterrizaba ahí.
 *
 * Se queda en español a propósito: es el idioma principal del sitio y una
 * 404 no puede leer el idioma de la ruta que no existe.
 */
export const metadata: Metadata = {
  title: "Página no encontrada | Vita Lima Spa",
  description: "La página que buscas no existe o cambió de dirección.",
  robots: { index: false, follow: true },
};

const salidas = [
  { href: "/servicios", titulo: "Ver el catálogo", texto: "Los 50 masajes, faciales y programas, con precios y duración." },
  { href: "/san-borja", titulo: "Nuestras sedes", texto: "San Borja y Miraflores: direcciones, horarios y cómo llegar." },
  { href: "/regalos", titulo: "Regalar una sesión", texto: "Cajas de regalo con masaje incluido para una ocasión especial." },
];

export default function NotFound() {
  return (
    <main className="servicesCatalogPage">
      <header className="catalogHeader">
        <div className="catalogNav shell">
          <Link href="/" aria-label="Ir al inicio de Vita Lima Spa">
            <Image src="/images/brand/logo-vita-lima-white.png" alt="Vita Lima Spa" width={180} height={78} priority />
          </Link>
          <div className="catalogNavActions">
            <Link className="catalogBackLink" href="/">Volver al inicio</Link>
          </div>
        </div>
        <div className="catalogHero shell">
          <p className="eyebrow catalogEyebrow">Error 404</p>
          <h1>Esta página ya no está aquí.</h1>
          <p>
            Puede que la dirección haya cambiado o que el enlace tenga un error. Lo que
            buscas probablemente esté a un clic de distancia.
          </p>
          <a
            className="button orangeButton"
            href="https://wa.me/51907308415?text=Hola%2C%20estaba%20buscando%20algo%20en%20la%20web%20y%20no%20lo%20encontr%C3%A9."
            target="_blank"
            rel="noreferrer"
          >
            Escríbenos por WhatsApp <span>→</span>
          </a>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <div className="notFoundExits">
            {salidas.map((salida) => (
              <article className="notFoundExit" key={salida.href}>
                <h2>
                  <Link href={salida.href}>{salida.titulo}</Link>
                </h2>
                <p>{salida.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter context="internal" />
      <WhatsAppButton />
    </main>
  );
}
