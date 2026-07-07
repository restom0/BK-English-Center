# Server — BK English Center API

Express 4 REST API backed by MySQL 8. Handles authentication, course management, attendance, payments, and email delivery.

---

## Directory structure

```
server/
├── index.js                  # App entry point — Express setup, routes, error handler
├── routes/                   # Route definitions (mounted in index.js)
│   ├── index.js              # Central router — registers all sub-routers
│   ├── user.js               # /users  (public)
│   ├── course.js             # /courses  (public)
│   ├── mail.js               # / (OTP email, public)
│   ├── admin.js              # /admins  (protected)
│   ├── class.js              # /classes  (protected)
│   ├── staff.js              # /staffs  (protected)
│   ├── student.js            # /students  (protected)
│   ├── teacher.js            # /teachers  (protected)
│   ├── file.js               # /files  (protected)
│   ├── email.js              # /emails  (protected)
│   ├── log.js                # /logs  (protected)
│   ├── registerlog.js        # /register-logs  (protected)
│   ├── sponsor.js            # /sponsors  (protected)
│   ├── studentjoinclass.js   # /studentjoinclasses  (protected)
│   └── teacherjoinclass.js   # /teacherjoinclasses  (protected)
│
└── src/
    ├── config/
    │   └── database/         # MySQL2 connection pool (promise-based)
    ├── controllers/          # Request handlers (thin — delegate to models)
    ├── models/               # DB query logic (one file per table)
    └── middleware/
        ├── useApiKey.js      # JWT verification + OTP/email helpers
        ├── usePassword.js    # bcrypt hash/compare helpers
        ├── logRequestMethod.js
        └── logRequestTime.js
```

> **Note:** `routes/` lives at the server root rather than inside `src/`. This is a known structural inconsistency — a future refactor should move it to `src/routes/` to keep all source code under `src/`.

---

## Authentication

Authentication uses **JWT** (Bearer tokens, 8-hour expiry). Tokens are created by `POST /users/login` and must be sent in the `Authorization: Bearer <token>` header for all protected routes.

The `requireApiKey` middleware in `src/middleware/useApiKey.js` verifies the token and attaches the decoded payload to `req.user`.

**Route visibility:**

| Prefix                | Auth required | Typical caller       |
|-----------------------|---------------|----------------------|
| `/users`              | No            | Login / register     |
| `/courses`            | No            | Public course list   |
| `/` (mail)            | No            | OTP email requests   |
| All other prefixes    | Yes (JWT)     | Authenticated users  |

---

## API route summary

| Method | Path                        | Description                         |
|--------|-----------------------------|-------------------------------------|
| POST   | /users/login                | Login → returns JWT                 |
| POST   | /users/register             | Create new user account             |
| GET    | /courses                    | List all courses                    |
| POST   | /                           | Send OTP email                      |
| GET    | /admins/…                   | Admin management endpoints          |
| GET    | /staffs/…                   | Staff management                    |
| GET    | /teachers/…                 | Teacher management                  |
| GET    | /students/…                 | Student management                  |
| GET    | /classes/…                  | Class management                    |
| GET    | /files/…                    | Teacher file management             |
| GET    | /logs/…                     | Activity logs                       |
| GET    | /register-logs/…            | Course registration logs            |
| GET    | /sponsors/…                 | Sponsor management                  |
| GET    | /emails/…                   | Email record management             |
| GET    | /studentjoinclasses/…       | Student–class enrolment             |
| GET    | /teacherjoinclasses/…       | Teacher–class assignment            |

---

## npm scripts

| Script       | What it does                                              |
|--------------|-----------------------------------------------------------|
| `start`      | `node index.js` — production start                       |
| `dev`        | `nodemon index.js` — watch mode, auto-restart            |
| `lint`       | Prettier check across `src/**`, `routes/**`, `index.js`  |
| `lint:fix`   | Prettier auto-format (same scope as `lint`)              |
| `format`     | Legacy: Prettier write on `src/**` only                  |

```bash
npm install
npm run dev        # development
npm run lint       # check formatting (used by CI)
npm run lint:fix   # auto-fix formatting
```

---

## Environment variables

Copy `.env.example` to `.env` and fill in all values:

```
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=bk_english
DB_USER=root
DB_PASS=secret

JWT_SECRET=change_this_secret_in_production
CORS_ORIGIN=http://localhost:5500

MAIL_USER=your@gmail.com
MAIL_PASS=your_app_password
```

---

## Rate limiting

300 requests per 15 minutes per IP (applied globally via `express-rate-limit`). Adjust `limiter` in `index.js` for production traffic patterns.

---

## Middleware notes

- **`useApiKey.js`** — mixed concerns by design: JWT token creation/verification lives alongside nodemailer OTP helpers and in-memory OTP counter. The OTP counter resets on server restart — **migrate to Redis or a DB column before production**.
- **`usePassword.js`** — bcrypt with default salt rounds. Adjust rounds for your hardware if login latency becomes an issue.
- **`logRequestMethod.js` / `logRequestTime.js`** — lightweight Morgan-style logging middleware kept for learning purposes.

---

## Known issues / tech debt

| Issue | Location | Suggested fix |
|-------|----------|---------------|
| `routes/` outside `src/` | `server/routes/` | Move to `server/src/routes/` |
| Mixed JWT + mail concerns | `src/middleware/useApiKey.js` | Split into `useAuth.js` + `mailService.js` |
| In-memory OTP counter | `src/middleware/useApiKey.js` | Redis or DB-backed store |
| `src/config/database` missing `.js` | `src/config/database/` | Confirm entry file is `index.js` |
| Old `readme.txt.txt` | `server/readme.txt.txt` | Delete or rename to `NOTES.md` |
| Unused Express generator files | `src/bin/www`, `public/stylesheets/style.css` | Delete if not referenced |
