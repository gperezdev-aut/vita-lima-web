# Vita Lima Web Pública — V1

Sitio público independiente de Caja Vita Lima y n8n.

## Desarrollo local

```bash
npm ci
npm run dev
```

## Docker

```bash
cp .env.example .env.local
docker compose build
docker compose up -d
curl -I http://127.0.0.1:3001
```

## Seguridad

Nunca subir `.env.local`. Las integraciones futuras se realizan desde `app/api/reservas`, nunca desde el navegador con claves privadas.

## Importante

La versión temporal bloquea indexación en `app/robots.ts`. Antes del lanzamiento definitivo debe habilitarse Google y revisarse el contenido legal.
