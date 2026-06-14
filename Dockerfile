# ── 1. Build ──────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ARG JWT_SECRET="dummy_secret_for_build_only"
RUN npm run build

# ── 2. Runner ─────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Installer uniquement les dépendances de production + générer le client Prisma
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci --omit=dev && npx prisma generate

# Copier l'app buildée
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["sh", "-c", "npx prisma db push && npm start"]
