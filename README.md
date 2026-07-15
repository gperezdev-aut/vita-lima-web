# Vita Lima Web

Primera versión funcional del nuevo sitio público de Vita Lima Spa.

## Estado de esta entrega

- Diseño responsive para celular y PC.
- Portada, servicios, experiencias, sedes, FAQ y formulario.
- Botón flotante de WhatsApp.
- Políticas y términos base.
- API segura preparada para conectar n8n sin exponer secretos.
- Docker preparado para publicar localmente en `127.0.0.1:3001`.
- Indexación bloqueada mientras se prueba en el subdominio temporal.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Variables privadas

Copia `.env.example` como `.env.local`. No subas `.env.local` a GitHub.

```env
N8N_RESERVAS_WEBHOOK_URL=
N8N_RESERVAS_WEBHOOK_SECRET=
```

El formulario funciona en modo demostración aunque estas variables estén vacías. La conexión real se hará en una etapa posterior.

## Docker

No ejecutar todavía en el VPS hasta revisar puertos, respaldar Nginx y validar los servicios existentes.

```bash
docker compose build
docker compose up -d
```

## Antes de producción

1. Incorporar logo e imágenes oficiales.
2. Validar tarifas, horarios y textos.
3. Revisar política de privacidad y términos.
4. Conectar el formulario con n8n.
5. Cambiar `robots.ts` para permitir indexación cuando el dominio principal reemplace Wix.
