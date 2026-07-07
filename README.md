# BK English Center — DACNPM_RANG

Full-stack management system for an English language learning center.
Built with **Vanilla JS + SCSS** on the client and **Node.js / Express + Prisma** on the server, backed by **PostgreSQL**, cached with **Redis**, and containerised with **Docker Compose**.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Tech Stack](#tech-stack)
3. [Quick Start (Docker)](#quick-start-docker)
4. [Local Development](#local-development)
5. [Environment Variables](#environment-variables)
6. [Database](#database)
7. [API Documentation](#api-documentation)
8. [Project Structure](#project-structure)
9. [Features](#features)
10. [Scripts Reference](#scripts-reference)

---

## Architecture

```
Browser
  │
  ▼
┌─────────────────────────────────────────┐
│  nginx (port 80)                        │
│  ├─  /          → static files (client) │
│  └─  /api/*     → backend:3000          │
└─────────────────────────────────────────┘
         │                  │
         ▼                  ▼
   ┌──────────┐      ┌──────────────┐
   │  Static  │      │  Express API │
   │  Files   │      │  + Prisma    │
   │ (nginx)  │      │  + ioredis   │
   └──────────┘      └──────┬───────┘
                            │
              ┌─────────────┴──────────────┐
              ▼                            ▼
       ┌────────────┐              ┌──────────────┐
       │ PostgreSQL │              │    Redis 7   │
       │    16      │              │  (cache/OTP) │
       └────────────┘              └──────────────┘
```

---

## Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | Vanilla JS, SCSS design system, Alpine.js, Bootstrap 5, Flowbite |
| Backend   | Node.js 22, Express 4, Prisma 5 ORM |
| Database  | PostgreSQL 16 |
| Cache     | Redis 7 (ioredis) |
| Auth      | JWT (jsonwebtoken), bcrypt, Google OAuth (One-Tap) |
| Email     | Nodemailer + Gmail SMTP |
| API Docs  | Swagger UI (swagger-jsdoc + swagger-ui-express) |
| i18n      | Custom middleware — 7 locales: en, vi, fr, de, es, ca, it |
| Container | Docker, Docker Compose |
| CI/CD     | GitHub Actions |

---

## Quick Start (Docker)

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) 24+
- `docker compose` plugin

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-org/DACNPM_RANG.git
cd DACNPM_RANG

# 2. Copy and edit environment variables
cp server/.env.example .env
#    → Fill in: POSTGRES_PASSWORD, JWT_SECRET, MAIL_USER, MAIL_PASS
#      Optionally: GOOGLE_CLIENT_ID, REDIS_URL

# 3. Build and start all services
docker compose up --build -d

# 4. (Optional) Seed the database with demo data
docker compose exec backend npm run db:seed

# 5. Open the app
open http://localhost
# API docs at http://localhost/api-docs
```

> **First run note:** Prisma migrations run automatically on backend startup via `prisma migrate deploy`. The database schema is created fresh on a clean volume.

### Default demo credentials (after seeding)

| Role    | Username    | Password      |
|---------|-------------|---------------|
| Admin   | `admin01`   | `Admin@1234`  |
| Staff   | `staff01`   | `Staff@1234`  |
| Teacher | `teacher01` | `Teacher@1234`|
| Student | `student001`| `Student@1234`|

---

## Local Development

### Prerequisites

- Node.js 22+
- PostgreSQL 16 running locally (or use Docker for just the DB)
- Redis 7 running locally (or use Docker)

### Backend

```bash
cd server
cp ../.env.example .env          # edit DATABASE_URL, REDIS_URL, etc.
npm install
npx prisma generate              # generate Prisma client
npx prisma migrate dev           # run migrations (creates DB schema)
npm run db:seed                  # optional: populate with demo data
npm run dev                      # start with nodemon on :3000
```

### Frontend

```bash
cd client
npm install                      # installs sass
npm run build:css                # compile SCSS → styles/main.css
# serve statically (e.g. VS Code Live Server, or:)
npx serve . -p 5500
```

### Run only the DB + Redis via Docker (dev convenience)

```bash
docker compose up postgres redis -d
# Then run backend + frontend locally as above
```

---

## Environment Variables

Copy `server/.env.example` to `.env` in the **root** of the repo (Docker Compose reads it from there).

| Variable            | Required | Default         | Description |
|---------------------|----------|-----------------|-------------|
| `DATABASE_URL`      | ✅        | —               | Prisma PostgreSQL connection string |
| `REDIS_URL`         | ✅        | —               | Redis connection string |
| `JWT_SECRET`        | ✅        | —               | At least 32 random characters |
| `JWT_EXPIRES_IN`    | —        | `28800`         | Token lifetime in seconds (8 h) |
| `MAIL_USER`         | ✅ (prod) | —               | Gmail address for SMTP |
| `MAIL_PASS`         | ✅ (prod) | —               | Gmail App Password (16 chars) |
| `CORS_ORIGIN`       | —        | `http://localhost:5500` | Allowed CORS origin |
| `GOOGLE_CLIENT_ID`  | —        | —               | Google OAuth Client ID for One-Tap login |
| `CACHE_TTL`         | —        | `300`           | Redis cache TTL in seconds |
| `NODE_ENV`          | —        | `development`   | `production` disables verbose logs |
| `PORT`              | —        | `3000`          | Express listen port |
| `POSTGRES_USER`     | —        | `bkec`          | Docker Compose DB user |
| `POSTGRES_PASSWORD` | ✅        | —               | Docker Compose DB password |
| `POSTGRES_DB`       | —        | `bkec`          | Docker Compose DB name |

---

## Database

### Schema (Prisma)

The Prisma schema is at `server/prisma/schema.prisma`. Key entities:

| Model             | Description |
|-------------------|-------------|
| `User`            | Auth table — username, password hash, role |
| `Student`         | Student profile (linked to User 1:1) |
| `Teacher`         | Teacher profile |
| `Staff`           | Staff profile |
| `Admin`           | Admin profile |
| `Course`          | Course catalogue |
| `Class`           | Scheduled class instance of a course |
| `StudentJoinClass`| Enrolment + grades + payment status |
| `TeacherJoinClass`| Teacher assignment + attendance + payment |
| `ManageStaff`     | Monthly attendance + salary records |
| `TeacherHasFile`  | Teaching material tracking |
| `Email`           | Allowed registration email whitelist |
| `Sponsor`         | Sponsor records |
| `Log`             | Activity audit log |
| `RegisterLog`     | Account registration log |

All mutable entities (Course, Class, Student, Teacher, Staff, Admin, Sponsor, StudentJoinClass, TeacherJoinClass) carry a `version Int @default(1)` field that **must be incremented** on every UPDATE by the service layer.

### Migrations

```bash
# Create a new migration after schema changes
cd server
npx prisma migrate dev --name describe_your_change

# Apply migrations in production (also runs automatically on container start)
npx prisma migrate deploy
```

### Seeding

```bash
npm run db:seed
# Seeds: 10 admins, 20 staff, 40 teachers, 120 students,
#        10 courses, 30 classes, enrolments, sponsors, email whitelist, logs.
```

---

## API Documentation

Interactive Swagger UI is available at:

- **Docker:** `http://localhost/api-docs`
- **Local dev:** `http://localhost:3000/api-docs`

Raw OpenAPI JSON: `/api-docs.json`

### Authentication

All protected endpoints require:

```
Authorization: Bearer <jwt_token>
```

Obtain a token via `GET /users/login?username=...&userpassword=...`.

### i18n

The API responds in the language requested via the `Accept-Language` header:

```
Accept-Language: fr          → French responses
Accept-Language: vi          → Vietnamese responses
Accept-Language: en          → English (default)
```

Supported locales: `en`, `vi`, `fr`, `de`, `es`, `ca`, `it`.

### Redis Cache

List and detail endpoints are cached in Redis with a 5-minute TTL (configurable via `CACHE_TTL`). Cache is invalidated automatically on any Create/Update/Delete operation for that entity.

---

## Project Structure

```
DACNPM_RANG/
├── .env.example              ← copy to .env (root)
├── docker-compose.yml        ← PostgreSQL + Redis + backend + frontend
├── README.md
│
├── client/                   ← Static frontend (nginx)
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── config.js             ← API_URL + GOOGLE_CLIENT_ID
│   ├── styles/
│   │   ├── main.css          ← compiled output (committed)
│   │   ├── main.scss
│   │   ├── _variables.scss   ← design tokens
│   │   ├── _base.scss        ← reset + utilities + dark theme + skeleton
│   │   ├── _components.scss  ← reusable UI components
│   │   ├── _mobile.scss      ← responsive overrides
│   │   └── pages/            ← page-specific partials
│   ├── js/
│   │   ├── theme.js          ← dark/light theme switcher
│   │   ├── skeleton.js       ← skeleton loading + fun facts
│   │   ├── config.js         ← shared API helpers
│   │   ├── i18n/             ← client-side locale JSON files
│   │   └── pages/            ← feature JS files mirroring pages/
│   └── pages/                ← HTML pages (stakeholder/function/index.html)
│       ├── admin/
│       ├── auth/
│       ├── public/
│       ├── staff/
│       ├── student/
│       └── teacher/
│
└── server/                   ← Express API
    ├── Dockerfile
    ├── .env.example
    ├── package.json
    ├── index.js              ← app entry (CORS, i18n, Swagger, routes)
    ├── prisma/
    │   ├── schema.prisma     ← PostgreSQL schema + entity versioning
    │   └── seed.js           ← demo data seeder
    ├── routes/               ← Express route files (15 modules)
    └── src/
        ├── config/
        │   ├── env.js        ← centralized env vars
        │   ├── prisma.js     ← Prisma client singleton
        │   ├── redis.js      ← ioredis client + cache helpers
        │   └── swagger.js    ← OpenAPI spec
        ├── controllers/      ← HTTP handlers (14 controllers)
        ├── services/         ← business logic + Redis cache layer
        ├── models/           ← MySQL2 query functions (legacy, kept for migration)
        ├── middleware/
        │   ├── i18n.js       ← Accept-Language → req.t() helper
        │   ├── useApiKey.js  ← JWT auth + OTP + mail dispatch
        │   └── usePassword.js← bcrypt helpers
        └── locales/          ← translation JSON files (en, vi, fr, de, es, ca, it)
```

---

## Features

### Client

- **SCSS design system** — centralized tokens (colors, spacing, typography, shadows)
- **Dark / light theme** — `theme.js` persists preference to `localStorage`, zero flash
- **Skeleton loading** — animated shimmer overlay with random English fun facts
- **Google Login** — One-Tap button, reads `GOOGLE_CLIENT_ID` from `config.js`
- **i18n** — 7 language JSON files, label keys in all page JS
- **Responsive** — mobile-first CSS overrides for tables, modals, forms, nav
- **Page structure** — `pages/{stakeholder}/{function}/index.html` (depth-3)

### Server

- **Prisma + PostgreSQL** — type-safe ORM, auto-migrations on startup
- **Entity versioning** — `version` field increments on every update
- **Redis cache** — 5-min TTL on list/detail reads, invalidated on CUD
- **Swagger UI** — full OpenAPI 3.0 docs at `/api-docs`
- **i18n** — 7-language `req.t()` middleware based on `Accept-Language`
- **JWT auth** — 8-hour tokens, role-based route guards
- **Rate limiting** — 300 req / 15 min / IP
- **OTP registration** — email whitelist + one-time token via Nodemailer
- **Seed script** — 100+ realistic records per table

### DevOps

- **Docker Compose** — single `docker compose up --build` starts everything
- **Multi-stage Dockerfiles** — minimal production images, non-root users
- **GitHub Actions CI** — lint + build on push/PR

---

## Scripts Reference

### Backend (`cd server`)

| Script               | Description |
|----------------------|-------------|
| `npm start`          | Production server |
| `npm run dev`        | Development server with nodemon |
| `npm run db:generate`| Regenerate Prisma client after schema changes |
| `npm run db:migrate` | Apply migrations (production) |
| `npm run db:seed`    | Populate database with demo data |
| `npm run db:studio`  | Open Prisma Studio (visual DB browser) |
| `npm run lint`       | Check formatting (prettier) |
| `npm run lint:fix`   | Auto-fix formatting |

### Frontend (`cd client`)

| Script               | Description |
|----------------------|-------------|
| `npm run build:css`  | Compile SCSS → `styles/main.css` |
| `npm run watch:css`  | Watch + recompile on change |

### Docker Compose (root)

| Command                              | Description |
|--------------------------------------|-------------|
| `docker compose up --build -d`       | Build + start all services in background |
| `docker compose logs -f`             | Stream logs from all services |
| `docker compose exec backend sh`     | Shell into the API container |
| `docker compose exec backend npm run db:seed` | Seed demo data |
| `docker compose down -v`             | Stop and remove containers + volumes |

---

## Contributing

1. Fork the repo and create a feature branch.
2. Run `npm run lint:fix` before committing.
3. Open a PR — GitHub Actions will run linting automatically.
