# =============================================================
# Frontend Dockerfile -- BK English Center Client
# Stage 1: compile SCSS -> CSS
# Stage 2: nginx:alpine serving static files
# =============================================================

# ── Stage 1: build CSS ────────────────────────────────────────
FROM node:26-alpine AS builder
WORKDIR /build

# Install only sass (devDependency)
COPY package*.json ./
RUN npm ci

# Copy all client source
COPY . .

# Compile SCSS to compressed CSS
RUN npm run build:css

# Patch API_URL: in Docker, nginx proxies API paths so we use
# same-origin (empty string) instead of http://localhost:3000
RUN sed -i \
    's|const API_URL = "http://localhost:3000"|const API_URL = ""|g' \
    config.js

# Remove SCSS source & node_modules from the artifact — not needed at runtime
RUN rm -rf node_modules styles/*.scss styles/main.css.map package*.json

# ── Stage 2: minimal nginx image ─────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default nginx page
RUN rm -f /usr/share/nginx/html/*

# Copy built frontend files
COPY --from=builder /build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Validate config at build time
RUN nginx -t

EXPOSE 80

HEALTHCHECK --interval=20s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/Loginpage/Login.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
