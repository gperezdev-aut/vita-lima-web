# Vita Lima Web Premium V3 — instalación

Esta versión cambia de verdad la portada, la distribución y las imágenes usadas en cada sección.

## Subir a GitHub
1. Descomprime el ZIP.
2. Entra a la carpeta `vita-lima-web-premium-v3`.
3. Sube TODO el contenido interior a la raíz del repositorio y reemplaza los archivos anteriores.
4. Commit sugerido: `feat: install Vita Lima Web Premium V3`.

## Actualizar Contabo
```bash
cd /opt/vita-lima-web
git stash
git pull origin main
git stash pop
docker compose down
docker compose up -d --build
docker compose ps
curl -I https://nueva.vitalimaspa.com
```

Después abre la web en incógnito o pulsa `Ctrl + Shift + R`.
