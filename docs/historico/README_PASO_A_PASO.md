# Vita Lima Web Premium V4 — instalación

Esta versión reemplaza las imágenes generadas de la V3 por fotografías reales y optimizadas.

## Subir a GitHub
1. Descomprime el ZIP.
2. Sube todo su contenido a la raíz del repositorio `vita-lima-web` reemplazando los archivos existentes.
3. Confirma el commit con el mensaje: `feat: install Vita Lima Web Premium V4`.

## Actualizar Contabo
```bash
cd /opt/vita-lima-web
git stash push -u -m "backup antes de V4"
git pull origin main
docker compose down
docker compose up -d --build
docker compose ps
curl -I https://nueva.vitalimaspa.com
```

El resultado esperado es `HTTP/1.1 200 OK`.

## Si el navegador conserva la versión anterior
Usa `Ctrl + F5` o abre una ventana de incógnito.
