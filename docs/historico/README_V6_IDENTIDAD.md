# Vita Lima Web Signature V6

Esta versión incorpora la identidad oficial de Vita Lima en toda la web.

## Cambios incluidos

- Logo oficial con fondo transparente.
- Versiones naranja, verde y blanca del logo.
- Encabezado rediseñado con el logo real.
- Footer premium de cuatro columnas.
- Mejor contraste y tratamiento visual uniforme para las fotografías.
- Microinteracciones suaves en botones y enlaces.
- Ajustes específicos para celular.

## Despliegue en Contabo

```bash
cd /opt/vita-lima-web
git stash push -u -m "backup antes de V6"
git pull origin main
docker compose down
docker compose up -d --build
docker compose ps
curl -I https://nueva.vitalimaspa.com
```

El resultado correcto debe mostrar `HTTP/1.1 200 OK`.
