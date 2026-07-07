// =============================================================
// BK English Center — Express application entry point
// =============================================================

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');

const env = require('./src/config/env');
const swaggerSpec = require('./src/config/swagger');
const i18n = require('./src/middleware/i18n');

const app = express();

// ── CORS ──────────────────────────────────────────────────────
app.use(
  cors({
    origin: env.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

// ── HTTP logger ───────────────────────────────────────────────
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

// ── Rate limiting — 300 req / 15 min / IP ─────────────────────
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { check: false, msg: 'Too many requests, please try again later' },
  })
);

// ── Body parsing ──────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ── i18n — must come before routes ───────────────────────────
app.use(i18n);

// ── Swagger UI — available at /api-docs ───────────────────────
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'BK English Center API Docs',
    swaggerOptions: { persistAuthorization: true },
  })
);

// Raw OpenAPI JSON (useful for code-gen tools)
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// ── Routes ────────────────────────────────────────────────────
const route = require('./routes');
route(app);

// ── Global error handler ──────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  const msg = req.t ? req.t('server.error') : 'Internal server error';
  res.status(500).json({ check: false, msg });
});

// ── Start ─────────────────────────────────────────────────────
// Only listen when run directly (`node index.js`), so tests can
// import `app` into supertest without binding a port.
if (require.main === module) {
  app.listen(env.port, () => {
    console.log(`✅  Server running on port ${env.port} [${env.nodeEnv}]`);
    console.log(`📖  API docs: http://localhost:${env.port}/api-docs`);
  });
}

module.exports = app;
