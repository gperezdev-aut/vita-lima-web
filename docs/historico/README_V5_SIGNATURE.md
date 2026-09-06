# Vita Lima Web — Signature V5

Esta versión parte de la V4 estable y mantiene Docker, Next.js y las dependencias principales.

## Qué cambia
- Nuevo diseño editorial premium.
- Hero a pantalla completa.
- Servicios con fotografías reales.
- Secciones de parejas, Gift Cards y corporativo.
- Galería real, sedes, reseñas, reserva y preguntas frecuentes.
- Optimización responsive para computadora y celular.

## Despliegue en Contabo

```bash
cd /opt/vita-lima-web
git pull origin main
docker compose down
docker compose up -d --build
docker compose ps
curl -I https://nueva.vitalimaspa.com
```

No reemplaces el `.env.local` del servidor.
