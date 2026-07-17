# Vita Lima Web Premium V5

## Qué cambia en V5
- Portada inmersiva con fotografía real y estética premium.
- Servicios en formato editorial, no como plantilla genérica.
- Sección de experiencia, parejas, Gift Cards y corporativo.
- Sedes con imágenes y accesos a Google Maps.
- Galería real más elegante y responsive.
- Reserva por WhatsApp y formulario conservados.

## Subir al servidor

```bash
cd /opt/vita-lima-web
git stash push -u -m "backup antes de V5"
git pull origin main
docker compose down
docker compose up -d --build
docker compose ps
curl -I https://nueva.vitalimaspa.com
```

Debe aparecer `HTTP/1.1 200 OK`.
