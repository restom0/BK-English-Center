# =============================================================
# Backend Dockerfile — BK English Center API v2
# Multi-stage: builder (Prisma generate) → runner (lean image)
# =============================================================

# ── Stage 1: install all deps + generate Prisma client ────────
FROM node:22-alpine AS builder
WORKDIR /app

# Install build-time deps (including prisma CLI via devDependencies)
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy source (needed for prisma generate to locate schema.prisma)
# prisma.config.ts holds the datasource config (Prisma 7+)
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate

# ── Stage 2: production-only deps ────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# ── Stage 3: lean production image ───────────────────────────
FROM node:22-alpine AS runner

# Security: run as non-root user
RUN addgroup -S bkec && adduser -S bkec -G bkec

WORKDIR /app

# Production node_modules
COPY --chown=bkec:bkec --from=deps /app/node_modules ./node_modules

# Generated Prisma client (must come after node_modules)
COPY --chown=bkec:bkec --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Application source
COPY --chown=bkec:bkec . .

# Remove dev artefacts
RUN rm -rf nodemon.json .env .env.* .gitignore "readme.txt.txt"

USER bkec

EXPOSE 3000

# Schema migrations are handled by Flyway (the `migrate` service in
# docker-compose), not at app startup — so just run the server.
CMD ["node", "index.js"]

HEALTHCHECK --interval=20s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/courses || exit 1
