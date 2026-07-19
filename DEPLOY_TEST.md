# Despliegue manual del entorno de pruebas

Esta guía se aplica exclusivamente a `nueva.vitalimaspa.com`.

> No modificar `www.vitalimaspa.com`, Caja Vita Lima ni n8n. No reutilizar sus
> contenedores, redes, configuraciones Nginx o archivos de entorno.

## Requisitos

- Una copia de seguridad verificable del despliegue de pruebas actual.
- Node.js 24 LTS y npm 11 para las validaciones previas.
- Docker y Docker Compose disponibles en el servidor de pruebas.
- Acceso manual autorizado al repositorio de GitHub.
- Variables de entorno del servidor conservadas fuera del repositorio.

## Actualización manual desde GitHub

1. Confirma que estás trabajando en el directorio exclusivo de
   `nueva.vitalimaspa.com`.
2. Registra el identificador del commit actualmente desplegado para poder
   volver a él.
3. Descarga manualmente desde GitHub el commit aprobado.
4. No reemplaces, muestres ni subas archivos `.env`.
5. Revisa los archivos descargados antes de construir la imagen.

## Validación y construcción

```bash
docker compose config
docker compose build
docker compose up -d
```

## Comprobación

```bash
docker compose ps
docker compose logs --tail=100 vita-lima-web
curl -I http://127.0.0.1:3001
curl -I https://nueva.vitalimaspa.com
```

El contenedor debe aparecer como saludable y el dominio de pruebas debe
responder correctamente. No continúes si Compose muestra servicios ajenos a
`vita-lima-web`.

## Rollback

1. Detén cualquier nueva actualización del entorno de pruebas.
2. Restaura el commit previamente registrado o la copia de seguridad
   verificada.
3. Conserva sin cambios los archivos de entorno del servidor.
4. Reconstruye y levanta únicamente el servicio de la web de pruebas:

```bash
docker compose config
docker compose build
docker compose up -d
docker compose ps
docker compose logs --tail=100 vita-lima-web
```

5. Verifica nuevamente `https://nueva.vitalimaspa.com`.

El rollback no autoriza cambios en `www.vitalimaspa.com`, Caja Vita Lima, n8n
ni sus recursos compartidos.
