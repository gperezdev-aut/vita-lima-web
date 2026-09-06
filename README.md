# Vita Lima Web

Sitio público de Vita Lima Spa: catálogo de servicios, sedes, guías, formulario de reserva y
enlaces a WhatsApp. En español e inglés.

Next.js 16 (App Router) · React 19 · TypeScript · Docker sobre Contabo.
Última revisión de este documento: 2026-09-06.

> El detalle de cada cambio está en `CHANGELOG.md`, que es el registro real del proyecto.
> Este README describe cómo está armado el sitio; el CHANGELOG, cómo llegó a estarlo.
>
> Cómo encaja este sitio con la Caja y el bot de WhatsApp:
> `vita-lima-bot-n8n/documentation/ARQUITECTURA_INTEGRACION_VITA_LIMA.md`.

---

## Estructura

```text
app/          Rutas. El español no lleva prefijo (/servicios); el inglés cuelga de /en.
components/   Vistas y piezas de UI compartidas entre ambos idiomas.
content/      El contenido del sitio, versionado como TypeScript (ver abajo).
lib/i18n/     Mapa de rutas equivalentes ES↔EN, traducciones y respaldo campo por campo.
public/       Fotografías reales del spa, organizadas por servicio y sede.
scripts/      Validaciones que corren fuera de Next (imágenes, catálogo).
deploy/       Ejemplo de configuración de nginx para el servidor.
```

### El contenido vive en `content/`, no en un CMS

| Archivo | Qué guarda |
|---|---|
| `services.ts` | Los 50 servicios: código, precio, duración, sede, categoría, destacados |
| `service-details.ts` / `-en.ts` | La ficha larga de cada servicio, en español y en inglés |
| `locations.ts` / `-en.ts` | Las dos sedes: dirección, horario, fotos, cómo llegar, preguntas |
| `guides.ts` | Las 11 guías de `/guias` |
| `giftboxes.ts`, `corporate.ts` | Contenido de `/regalos` y `/empresas` |
| `structured-data.ts` | El JSON-LD que leen los buscadores |
| `site.ts` | Teléfono, email y redes sociales |

Los precios y las traducciones se editan aquí y se despliegan con el sitio. No hay panel de
administración: es deliberado, para que todo cambio de precio quede en el historial de Git.

---

## Idiomas

El español conserva sus rutas sin prefijo y el inglés cuelga de `/en`, con `hreflang`
recíproco y canonical propio en cada página. El idioma se deduce de la URL, no de
`localStorage`: la URL es la única fuente de verdad, y por eso una página en inglés se puede
compartir por enlace e indexar.

`/empresas`, `/regalos`, `/guias` y las páginas legales existen **solo en español**: desde el
sitio en inglés se enlaza a la versión en español y no se emite `hreflang` para ellas.
Traducirlas es cuestión de añadirlas a `ROUTE_PAIRS` en `lib/i18n/routes.ts`.

---

## Comandos

```bash
npm run dev              # desarrollo
npm run build            # build de producción
npm run typecheck        # tsc --noEmit
npm run lint             # eslint
npm run check:images     # toda imagen citada en content/ existe y no está vacía
npm run check:catalogo   # compara el catálogo con el del bot de WhatsApp
npm run validate         # typecheck + lint + check:images + build
```

`npm run validate` es lo que hay que pasar antes de desplegar.

**`check:catalogo` está fuera de `validate` a propósito.** Compara `content/services.ts` con
el catálogo del bot (`../vita-lima-bot-n8n/exports/services_catalog_v5.csv`) y hoy encuentra
divergencias reales: once servicios con precio distinto y veinticuatro que solo existen en la
web. Meterlo dentro de `validate` bloquearía los despliegues del sitio por un problema que no
se arregla en este repositorio. Cuando los catálogos estén unificados, conviene moverlo dentro.

---

## Variables de entorno

Ver `.env.example`, que documenta cada una. Lo que hay que entender antes de tocarlas:

- Las `NEXT_PUBLIC_*` se compilan **dentro** del bundle, así que tienen que existir durante
  `npm run build`. Por eso van en `args:` del `docker-compose.yml` y como `ARG` en el
  `Dockerfile`. Declararlas solo en `environment:` no tiene ningún efecto sobre el build, y
  el fallo es silencioso: el sitio se genera con el valor por defecto del código.
- `N8N_RESERVAS_WEBHOOK_URL` y `N8N_RESERVAS_WEBHOOK_SECRET` son justo al revés: se leen en
  tiempo de ejecución en el servidor, van solo en `environment:`, y no llevan prefijo
  `NEXT_PUBLIC_` para que el secreto no acabe en el navegador.
- Si el webhook no está configurado, el formulario sigue funcionando igual —abre WhatsApp con
  el mensaje prerrellenado— y `/api/reservas` responde 204 sin hacer nada.

---

## Despliegue

Docker sobre Contabo, en `/opt/vita-lima-web`, con el `docker-compose.yml` de este repo.
El contenedor publica en `127.0.0.1:3001` y nginx le hace de proxy. El procedimiento paso a
paso, con su rollback, está en `DEPLOY_TEST.md`.

---

## Pendientes

1. **Confirmar en qué dominio sirve el sitio.** `.env.example` y el `docker-compose.yml`
   apuntan a `www.vitalimaspa.com`, pero todas las guías de despliegue verifican
   `nueva.vitalimaspa.com`. Mientras los dos dominios convivan, `NEXT_PUBLIC_SITE_ENV` debe
   valer algo distinto de `production` en el de pruebas, para que `robots.txt` lo bloquee y
   los dos no compitan en Google.
2. **Horario real de Miraflores.** Hoy se publica "atención previa reserva" con
   `openingHours: []`, mientras el catálogo del bot dice "Lun–Sáb 11:00–20:00, Dom
   14:00–20:00". Uno de los dos está mal.
3. **Formato de las direcciones.** La web escribe "Av. Larco 812, oficina 306" y el bot
   "Av. José Larco 812, Of. 306". Para el SEO local conviene que el nombre, la dirección y el
   teléfono sean idénticos carácter a carácter en todas partes.
4. **Coordenadas `geo` de ambas sedes**, hoy vacías: el JSON-LD omite la propiedad en vez de
   publicar un dato inventado.
5. **Fotos propias de Miraflores**: esa sede usa fotos generales del spa.
6. **Precios divergentes con el bot** (`npm run check:catalogo`), y los 24 servicios que el
   bot no conoce.
7. **Regenerar `package-lock.json`** en un entorno limpio con Node 24 y TLS válido, si no se
   hizo ya. Venía anotado en `docs/historico/ESTABILIZACION_FASE_1.md`.

---

## Documentos históricos

Las notas de las versiones V5 a V11 y las guías de la época en que el sitio se movía por ZIP
están en `docs/historico/`. Describen versiones que ya no existen y **no sirven como
instrucciones**: varias afirman cosas que hoy son falsas.
