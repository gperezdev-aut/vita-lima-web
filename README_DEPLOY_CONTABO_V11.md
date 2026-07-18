# V11 Production — despliegue en Contabo

Esta versión fue validada con `npm ci` y `npm run build`.

## Reemplazo limpio

```bash
cd /opt
cp -a vita-lima-web vita-lima-web-backup-$(date +%Y%m%d-%H%M)
rm -rf vita-lima-web-v11-production
unzip -o vita-lima-web-v11-production.zip
rm -rf vita-lima-web
mv vita-lima-web-v11-production vita-lima-web
cd vita-lima-web
docker compose down --remove-orphans
docker compose build --no-cache
docker compose up -d --force-recreate
```

## Verificación

```bash
docker compose ps
docker compose logs --tail=100 vita-lima-web
curl -I http://127.0.0.1:3001
curl -I https://nueva.vitalimaspa.com
```

Debe responder `HTTP/1.1 200 OK` o `HTTP/2 200`.

El proyecto no contiene la API antigua de reservas ni `ReservationForm.tsx`.
