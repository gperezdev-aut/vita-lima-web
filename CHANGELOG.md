# Changelog

Registro de cambios relevantes del sitio (`vita-lima-web`). No sigue un formato semántico de versiones; cada entrada referencia el/los commits donde se aplicó el cambio en `main`.

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
