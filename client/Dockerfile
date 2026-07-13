# =============================================================
# Frontend Dockerfile -- BK English Center Client
# Stage 1: compile SCSS -> CSS
# Stage 2: nginx:alpine serving static files
# =============================================================

# ── Stage 1: build CSS ────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /build

# Install only sass (devDependency)
COPY package*.json ./
RUN npm ci

# Copy frontend source explicitly; keep repo metadata and local-only files out.
COPY config.js ./
COPY Adminpage ./Adminpage
COPY api ./api
COPY Attendstaffpage ./Attendstaffpage
COPY Attendstupage ./Attendstupage
COPY Attendteapage ./Attendteapage
COPY components ./components
COPY ContactPage ./ContactPage
COPY CoursesPage ./CoursesPage
COPY CoursesPageDetail ./CoursesPageDetail
COPY Fileteapage ./Fileteapage
COPY HomePage ./HomePage
COPY i18n ./i18n
COPY img ./img
COPY Infostaffpage ./Infostaffpage
COPY Infostupage ./Infostupage
COPY Infoteapage ./Infoteapage
COPY js ./js
COPY Loginpage ./Loginpage
COPY manageCoursePage ./manageCoursePage
COPY Markstupage ./Markstupage
COPY MyCourses ./MyCourses
COPY MyPage ./MyPage
COPY Navigation ./Navigation
COPY pages ./pages
COPY Paystaffpage ./Paystaffpage
COPY Paystupage ./Paystupage
COPY Payteapage ./Payteapage
COPY Rateteapage ./Rateteapage
COPY Staffpage ./Staffpage
COPY Stataccesspage ./Stataccesspage
COPY Statclasspage ./Statclasspage
COPY Statfinancialpage ./Statfinancialpage
COPY styles ./styles
COPY utils ./utils

# Compile SCSS to compressed CSS
RUN npm run build:css


# Remove SCSS source & node_modules from the artifact — not needed at runtime
RUN rm -rf node_modules styles/*.scss styles/main.css.map package*.json

# ── Stage 2: minimal nginx image ─────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default nginx page
RUN rm -f /usr/share/nginx/html/* \
  && chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx

# Copy built frontend files
COPY --from=builder /build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Validate config at build time
RUN chown -R root:root /usr/share/nginx/html /etc/nginx/conf.d/default.conf \
  && chmod -R go-w /usr/share/nginx/html /etc/nginx/conf.d/default.conf \
  && nginx -t

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=20s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/Loginpage/Login.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
