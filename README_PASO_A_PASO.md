# Vita Lima Web Premium V1

Proyecto completo Next.js + Docker listo para reemplazar el contenido del repositorio `vita-lima-web`.

## Antes de subir
1. Haz una copia de seguridad del repositorio actual.
2. No subas `.env.local` a GitHub.
3. Conserva `vitalimaspa.com` en Wix. Este proyecto sigue usando `nueva.vitalimaspa.com`.

## Subir a GitHub desde la web
1. Descomprime el ZIP.
2. Abre el repositorio `gperezdev-aut/vita-lima-web`.
3. Elimina los archivos actuales del repositorio o sube este contenido en la raíz.
4. Confirma que `app`, `components`, `content`, `public`, `Dockerfile`, `docker-compose.yml` y `package.json` queden en la raíz.
5. Crea `.env.local` solamente en Contabo copiando `.env.example`.

## Desplegar en Contabo
```bash
cd /opt/vita-lima-web

cp -a . ../backups/vita-lima-web-antes-premium-$(date +%Y%m%d_%H%M%S)

git pull origin main

cat > .env.local <<'EOF'
NEXT_PUBLIC_SITE_URL=https://nueva.vitalimaspa.com
NEXT_PUBLIC_WHATSAPP=51907308415
EOF

docker compose down
docker compose up -d --build

docker compose ps
curl -I http://127.0.0.1:3001
curl -I https://nueva.vitalimaspa.com
```

## Importante
- Las fotos incluidas provienen del material real recibido de San Borja.
- Publica fotos con clientes o personal solo cuando exista autorización de uso de imagen.
- Los enlaces de Google y Tripadvisor son marcadores. Deben reemplazarse por las fichas oficiales cuando se tengan las URLs.
