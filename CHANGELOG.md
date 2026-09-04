# Changelog

Registro de cambios relevantes del sitio (`vita-lima-web`). No sigue un formato semántico de versiones; cada entrada referencia el/los commits donde se aplicó el cambio en `main`.

## 2026-09-04 — El inglés pasa a tener URLs propias (i18n con rutas y hreflang)

Cierra el pendiente de fondo del selector de idioma. Hasta ahora el botón EN cambiaba el texto sin cambiar la dirección: el inglés existía para quien ya estaba en la página, pero Google indexa URLs, no clics, así que la versión en inglés era invisible para el buscador y no se podía compartir por enlace.

### Rutas

- **`lib/i18n/routes.ts`** (nuevo): el mapa entre rutas equivalentes y los helpers (`localizedPath`, `counterpartPath`, `languageAlternates`). El español conserva sus rutas actuales sin prefijo —ningún enlace existente se rompe— y el inglés cuelga de `/en`.
- Los segmentos fijos sí se traducen (`/servicios` → `/en/services`) porque forman parte de la URL que el visitante ve y comparte. Los slugs de servicio no: son nombres propios de la marca y traducirlos obligaría a mantener dos juegos de identificadores para el mismo servicio.
- Rutas nuevas: `/en`, `/en/services`, `/en/services/[slug]` (50), `/en/san-borja`, `/en/miraflores`. El build pasó de 64 a 117 páginas estáticas.
- `/empresas`, `/regalos` y las legales **no** tienen versión en inglés: todavía no están traducidas, y publicar una URL en inglés con contenido en español sería contenido duplicado. Desde el sitio en inglés se enlaza a la versión en español. Cuando se traduzcan, basta agregarlas a `ROUTE_PAIRS`.

### El idioma ahora sale de la URL

- **`lib/i18n/LanguageContext.tsx`**: reescrito. Antes el idioma vivía en `localStorage` y el botón cambiaba estado; ahora se deduce del pathname y el botón navega a la misma página en la otra URL. Como consecuencia desaparece el estado que hidratar y la preferencia que recordar: la URL es la única fuente de verdad.
- El contexto expone `href(rutaEnEspañol)`, que traduce cualquier enlace interno al idioma activo. Los componentes siguen escribiendo `/servicios` y el helper decide. Aplicado en `SiteFooter`, `ServicesCatalog`, `ServiceDetailPage`, `LocationPageView` y `HomePageView`.
- `document.documentElement.lang` se corrige en el cliente según la ruta (el `<html lang>` del layout raíz es estático).

### Metadata y hreflang

- Cada página traducida publica `canonical` propio y `hreflang` recíproco (`es-PE`, `en`, `x-default` → español), verificado en el HTML servido.
- **`components/ServiceRoute.tsx`** (nuevo) y **`components/LocationRoute.tsx`**: la parte servidor se comparte entre ambos idiomas y recibe el idioma como parámetro. Title, description y Open Graph en inglés para las rutas `/en`.
- El JSON-LD del negocio se mantiene en español (es la ficha para buscadores, no texto para el visitante); solo el `FAQPage` y el `BreadcrumbList` siguen el idioma de la página.
- **`app/sitemap.ts`**: cada página traducida aparece en los dos idiomas con su bloque `xhtml:link`. De 58 a 112 URLs.
- `app/page.tsx` pasó a ser componente de servidor con su propia metadata; el contenido del home se movió a **`components/HomePageView.tsx`** para que `/` y `/en` compartan la vista. Se quitó el `canonical: "/"` del layout raíz, que lo heredaban rutas que no son el home.

Validado con `npm run typecheck`, `npm run lint` y `npm run build` (117 páginas), y probado con Playwright: el botón ES/EN navega en ambos sentidos, los enlaces internos se quedan en el idioma activo, el HTML servido de `/en/...` ya viene en inglés (no depende de JavaScript) y el sitio en español no cambió.

## 2026-09-04 — Traducción al inglés del contenido nuevo y foto del mapa

Continuación del despliegue del 3 de setiembre. Dos cosas: el selector EN no traducía el contenido largo de las páginas nuevas, y la foto del botón "Ver mapa" de San Borja no comunicaba nada.

### Traducción al inglés

- **`content/service-details-en.ts`** (nuevo): la versión en inglés de los 50 servicios — tagline, descripción, cómo es la sesión, para quién es, beneficios y las 3 preguntas frecuentes de cada uno. Es traducción editorial, no literal: se mantuvo el tono del original.
- **`content/locations-en.ts`** (nuevo): lo mismo para San Borja y Miraflores. Las direcciones quedan tal cual en español ("Av. Aviación 3358, oficina 204"): quien se la muestra a un taxista necesita el texto real, no su traducción.
- **`lib/i18n/serviceDetailText.ts`** y **`lib/i18n/locationText.ts`** (nuevos): eligen el idioma activo con respaldo **campo por campo**. Si mañana se agrega un servicio y su traducción queda a medias, la página igual se muestra completa mezclando inglés y español, en vez de quedarse con secciones vacías. Mismo criterio que ya usaba `serviceText.ts` con el catálogo.
- **`content/service-details.ts`** y **`content/locations.ts`**: se separó la parte traducible en los tipos `ServiceDetailCopy` y `LocationCopy`. Los datos que no son texto (precio, duración, dirección, horario estructurado, coordenadas, fotos) siguen viviendo solo en el archivo en español.
- **`lib/i18n/translations.ts`**: se tradujo lo que quedaba suelto — el texto alternativo de las fotos de sede y la etiqueta "Disponible en", que mostraba el valor crudo del catálogo ("Ambas") también en la versión en inglés.

La metadata para buscadores (title, description, JSON-LD) se mantiene en español, como el resto del sitio: el selector ES/EN sigue siendo un cambio de texto en el cliente y no hay URLs `/en/` indexables. Eso queda pendiente aparte.

### Foto del botón "Ver mapa"

`content/locations.ts`: el `heroImage` de San Borja pasó de `san-borja-01.webp` (un detalle oscuro de la pared) a `san-borja-03.webp` (la recepción con el letrero de la marca). Se ve mucho mejor bajo la capa oscura del botón y comunica "este es el lugar". La foto anterior no se pierde: entra a la galería. El cambio también mejora el `og:image` y la imagen del JSON-LD de esa sede, que usan el mismo campo.

Validado con `npm run typecheck`, `npm run lint` y `npm run build`, y revisado con capturas de las páginas con el idioma en inglés.

## 2026-09-03 — Páginas por servicio y por sede + consentimiento de datos

Dos bloques de trabajo derivados de la revisión del sitio del 3 de setiembre de 2026.

### Bloque 1 — Páginas propias para cada servicio y cada sede

Antes todo el catálogo vivía en una sola URL (`/servicios`) con anclas: 50 servicios y ninguna página indexable propia. Ahora:

- **`app/servicios/[slug]/page.tsx`** (nuevo): una página estática por servicio, generada con `generateStaticParams` desde `content/services.ts` (que ya tenía el campo `slug`). Incluye `generateMetadata` propio (title, description, canonical, Open Graph e imagen), JSON-LD `Service` + `Offer`, `FAQPage` y `BreadcrumbList`.
- **`content/service-details.ts`** (nuevo): contenido editorial largo de los 50 servicios — tagline, descripción, cómo es la sesión, para quién es, qué te llevas y 3 preguntas frecuentes por servicio — más el mapeo de fotos por servicio. El catálogo (`content/services.ts`) sigue siendo la única fuente de precio, duración y nombre.
- **`components/ServiceDetailPage.tsx`** (nuevo): la vista, reutilizando el header, las tarjetas y el sistema de diseño de `/servicios`. Incluye galería, FAQ, servicios relacionados de la misma categoría y CTA de WhatsApp con el mensaje ya armado.
- **`app/san-borja/page.tsx` y `app/miraflores/page.tsx`** (nuevos): una URL por sede, orientadas a búsqueda local. Contenido en **`content/locations.ts`** (nuevo): dirección, horarios, cómo llegar, qué encuentras ahí, servicios destacados, galería y FAQ. Lógica compartida en `components/LocationRoute.tsx` y vista en `components/LocationPageView.tsx`.
- **`content/structured-data.ts`**: `AggregateRating` corregido — antes declaraba 5.0 sobre 3 reseñas (el promedio de los testimonios escritos a mano en la página); ahora usa la calificación real de Google (4.7 / 226), centralizada en la constante `reputation`. Se dejaron de emitir esos 3 testimonios como `review` de la propia ficha (Google desaconseja marcar reseñas propias). Se añadieron `address`, `openingHoursSpecification` y `hasMap` por sede, `parentOrganization`, y los nuevos constructores `buildLocationJsonLd`, `buildServiceJsonLd`, `buildBreadcrumbJsonLd` y `buildWebSiteJsonLd`.
- **`app/sitemap.ts`**: pasó de 6 a 58 URLs (home, catálogo, 2 sedes, 50 servicios y las páginas legales), generadas automáticamente desde el contenido.
- **`components/ServicesCatalog.tsx`**: cada tarjeta enlaza ahora a su página de servicio (título + enlace "Ver detalle"), manteniendo el botón "Agregar" del carrito.
- **`app/page.tsx` / `components/SiteFooter.tsx`**: las tarjetas de sede del home y el footer enlazan a `/san-borja` y `/miraflores`.

### Bloque 2 — Consentimiento de datos (Ley N.º 29733)

- **`components/ConsentContext.tsx`** y **`components/CookieBanner.tsx`** (nuevos): banner de aceptar/rechazar, con la decisión persistida en `localStorage` dentro de `try/catch`. Mientras no haya decisión, no se carga nada de terceros.
- **`components/GoogleTag.tsx`**: GA4 ya no se monta hasta que el visitante acepta. Se añadió `anonymize_ip`. El ID sigue teniendo el mismo valor por defecto, así que la medición existente no cambia.
- **`components/ConsentMap.tsx`** (nuevo): los dos iframes de Google Maps del home ya no se cargan solos. Se muestra una foto real de la sede y el iframe se inserta únicamente al pulsar "Ver mapa", con el aviso a la vista. Esto quita de la página de entrada el JavaScript y las cookies de Google Maps.
- **`components/ReserveForm.tsx`**: casilla de autorización obligatoria y sin marcar por defecto, con enlace a la política, más un campo de correo opcional que se suma al mensaje de WhatsApp.
- **`app/politica-de-privacidad/page.tsx`**: reescritura completa (antes eran dos párrafos). Once secciones: responsable, qué datos se recogen, para qué, base legal, con quién se comparten, plazo de conservación, derechos ARCO y cómo ejercerlos, cookies, seguridad, menores y cambios. Queda pendiente que un abogado la revise y que se confirmen razón social, RUC y plazo real de conservación.

### Extra: control de indexación del dominio de pruebas

- **`app/robots.ts` y `next.config.ts`**: con `NEXT_PUBLIC_SITE_ENV` distinto de `production`, el sitio se declara no rastreable en `robots.txt` y emite `X-Robots-Tag: noindex, nofollow`. Sirve para que `nueva.vitalimaspa.com` deje de competir con el Wix en Google mientras ambos estén vivos. Si la variable no se define, el comportamiento es el de siempre (indexable).

Validado con `npm run typecheck`, `npm run lint` y `npm run build` (Next 16, 64 páginas estáticas generadas), y revisado visualmente con capturas de escritorio y móvil.

## 2026-08-30 — Cambio de paleta de colores (esquema cítrico)

**PR:** [#9 `paleta-citrico-vita-lima`](https://github.com/gperezdev-aut/vita-lima-web/pull/9), fusionado en `8c466c3`.

- Se reemplazó la paleta verde oscuro / crema / naranja original por una paleta marrón cálido / naranja / amarillo cítrico, a pedido del cliente (paleta de 8 colores provista por él).
- Cambio contenido enteramente en `app/globals.css`: variables CSS `--green`, `--green-deep`, `--green-soft`, `--cream`, `--paper`, `--orange`, `--ink`, `--muted`, `--line`, más los `rgba()` derivados de esos tonos. Sin cambios de layout ni tipografía.
- Validado con `npm run typecheck`, `npm run lint` y `npm run build`; verificado visualmente con capturas de pantalla antes de fusionar.
- Ya desplegado y confirmado saludable en [nueva.vitalimaspa.com](https://nueva.vitalimaspa.com) (Contabo).

## 2026-08-25 — Actualización de catálogo

**En `main` hasta el commit `ce95d29`.**

- `content/services.ts`: nueva categoría **facial**, y 21 servicios nuevos (`SVC_030`–`SVC_050`): piedras calientes, bambuterapia, shiatsu, drenaje linfático, masaje prenatal, bioenergético, ventosas, reflexología (+plus), paquetes para regalar, glow facial plus/premium, 4 faciales nuevos y 3 paquetes en pareja nuevos.
- Corrección de contenido: el recargo de movilidad a domicilio pasó de S/15 a S/30; se agregaron los tipos de masaje "deportivo" y "holístico" a la descripción del servicio a domicilio.
- Contenido nuevo: `content/corporate.ts` (servicios corporativos) y `content/giftboxes.ts` (5 cajas de regalo: Clásico, Suculentas, Flores, Vino, Wellness).
- Páginas nuevas: `app/empresas/page.tsx` y `app/regalos/page.tsx`, con enlaces agregados en el nav de `/servicios`, en las tarjetas del home, en el sitemap y en el footer.
