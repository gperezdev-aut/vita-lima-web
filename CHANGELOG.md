# Changelog

Registro de cambios relevantes del sitio (`vita-lima-web`). No sigue un formato semántico de versiones; cada entrada referencia el/los commits donde se aplicó el cambio en `main`.

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
