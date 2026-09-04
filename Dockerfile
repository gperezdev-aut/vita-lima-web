FROM node:24-bookworm-slim AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Las variables NEXT_PUBLIC_* tienen que existir DURANTE `npm run build`, no
# despues. El sitio se genera estatico: los canonical, el sitemap, el robots y
# el JSON-LD quedan escritos en el HTML en este paso. Declararlas solo en
# `environment:` del docker-compose no sirve — eso es entorno de ejecucion y
# Docker no lo pasa al build, asi que el build caeria en el valor por defecto
# del codigo sin avisar. Por eso van como ARG y el compose las manda en `args`.
ARG NEXT_PUBLIC_SITE_URL=https://www.vitalimaspa.com
ARG NEXT_PUBLIC_WHATSAPP=51907308415
ARG NEXT_PUBLIC_SITE_ENV=production
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_WHATSAPP=$NEXT_PUBLIC_WHATSAPP
ENV NEXT_PUBLIC_SITE_ENV=$NEXT_PUBLIC_SITE_ENV

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
