# Vita Lima Web V8 Premium

Rediseño completo orientado a UX y conversión, inspirado en la maqueta visual aprobada:

- Hero oscuro y cinematográfico.
- Beneficios visibles antes del primer scroll.
- Cinco servicios compactos en una sola vista de escritorio.
- Reseñas integradas visualmente dentro de la web.
- Bloques de cifras, parejas, Gift Cards y corporativo.
- Sedes, reserva y preguntas frecuentes con jerarquía más compacta.
- Diseño móvil con carruseles horizontales y WhatsApp fijo.

## Importante sobre reseñas

Las tarjetas de reseñas tienen textos de marcador claramente identificados. Deben sustituirse por comentarios reales de Google o Tripadvisor antes de publicar la web como versión final. No se incluyeron nombres, cifras ni testimonios inventados.

## Despliegue

```bash
cd /opt/vita-lima-web
git pull origin main
docker compose up -d --build
docker compose ps
curl --max-time 20 -I https://nueva.vitalimaspa.com
```
