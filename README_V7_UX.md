# Vita Lima Web · V7 UX

Esta versión se concentra en experiencia de usuario y conversión, sin cambiar el material fotográfico.

## Cambios principales
- Header más bajo, sticky y menú móvil.
- Hero con mejor jerarquía y texto legible.
- Beneficios visibles inmediatamente.
- Títulos y espaciados equilibrados.
- Sección de opiniones preparada sin inventar reseñas.
- Flujo de reserva explicado en cuatro pasos.
- Formulario más claro, accesible y orientado a WhatsApp.
- Botones, focos, hover y responsive unificados.
- Docker estable con Node 20 y pnpm.

## Despliegue
```bash
cd /opt/vita-lima-web
git pull origin main
docker compose down
docker compose up -d --build
docker compose ps
curl --max-time 20 -I https://nueva.vitalimaspa.com
```
