# Documentos históricos

Estos archivos vivían en la raíz del repositorio y describen versiones del sitio que ya no
existen, o formas de trabajo que ya no se usan. Se conservan porque explican de dónde viene
cada rediseño, no como referencia de cómo funciona el sitio hoy.

**Ninguno de ellos es fiable como instrucción.** Varios afirman cosas que hoy son falsas —el
de la V11, por ejemplo, dice que el proyecto no incluye `app/api/reservas/route.ts`, y sí lo
incluye desde que el formulario registra los leads en n8n—.

Para el estado real: `README.md` de la raíz, y `CHANGELOG.md` para el detalle de cada cambio.

## Notas de versión

Cada rediseño del sitio dejaba su propio README en la raíz, con los marcadores para
verificar en el servidor que el despliegue había tomado la versión correcta.

| Archivo | Versión |
|---|---|
| `README_V5_SIGNATURE.md` | V5 — Signature |
| `README_V6_IDENTIDAD.md` | V6 — Identidad |
| `README_V7_UX.md` | V7 — UX |
| `README_V8_PREMIUM.md` | V8 — Premium |
| `README_V9_SIGNATURE.md` | V9 — Signature |
| `README_SIGNATURE_X.md` | V10 — Signature X |
| `README_V11_LUXURY.md` | V11 — Luxury (la base del sitio actual) |

## Guías de despliegue de la época del ZIP

El proyecto se movía subiendo un ZIP a GitHub por la interfaz web y descomprimiéndolo sobre
el repositorio. Hoy se trabaja con ramas, commits y `git pull` en el servidor.

| Archivo | Qué explicaba |
|---|---|
| `GUIA_SUBIR_GITHUB.md` | Subir la primera versión arrastrando archivos a GitHub |
| `GUIA_ACTUALIZAR_GITHUB.md` | Reemplazar el repositorio entero con el contenido de un ZIP |
| `README_PASO_A_PASO.md` | Instalación de la V4 y actualización de Contabo |
| `README_DEPLOY_CONTABO_V11.md` | Despliegue de la V11 descomprimiendo un ZIP en `/opt` |

Para desplegar hoy: `DEPLOY_TEST.md` en la raíz.

## Otros

| Archivo | Qué explicaba | Estado |
|---|---|---|
| `ESTABILIZACION_FASE_1.md` | Que el `package-lock.json` debía regenerarse en un entorno limpio con Node 24 y TLS válido, porque el entorno de entonces no podía | Pendiente de confirmar si ya se hizo; anotado en los pendientes del README de la raíz |
