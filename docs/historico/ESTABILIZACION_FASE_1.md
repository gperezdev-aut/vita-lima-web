# Estabilización técnica — Fase 1

## Estado del lockfile

`package.json` ya declara las versiones y el rango de Node requeridos por el
proyecto. El `package-lock.json` no debe regenerarse en este entorno porque no
dispone de npm con una cadena TLS válida.

Antes de considerar cerrada la validación reproducible, el lockfile debe
regenerarse y verificarse en un entorno local limpio con:

- Node.js 24 LTS;
- npm disponible;
- acceso HTTPS al registro de npm con validación TLS correcta;
- ninguna configuración `strict-ssl=false` ni desactivación de TLS.

Comandos pendientes:

```bash
node --version
npm --version
npm install --package-lock-only
npm ci
npm run build
docker compose config
docker compose build
```

La regeneración debe revisarse antes de confirmar el nuevo `package-lock.json`.
No se deben copiar archivos `.env` al contexto de Docker ni registrar secretos
en el repositorio.
