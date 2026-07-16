# Vita Lima Web Premium V2 — instalación

Esta versión reemplaza la V1 e incorpora una composición visual más profesional, nuevas imágenes generadas para servicios y experiencias, fotografías reales del local, galería ampliada y mejoras responsive.

## Subir a GitHub
1. Descomprime el ZIP.
2. Entra a la carpeta `vita-lima-web-premium-v2`.
3. Sube **todo el contenido interno** a la raíz del repositorio `vita-lima-web`.
4. Confirma el commit con: `feat: install Vita Lima Web Premium V2`.

## Actualizar Contabo
```bash
cd /opt/vita-lima-web
git stash
git pull origin main
git stash pop
```

Si el archivo `docker-compose.yml` entra en conflicto, conserva la versión del servidor que usa la red `n8n_default`.

Después ejecuta:
```bash
docker compose down
docker compose up -d --build
docker compose ps
```

Abre `https://nueva.vitalimaspa.com` y presiona `Ctrl + Shift + R`.
