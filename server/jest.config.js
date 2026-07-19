// =============================================================
// Jest configuration — BK English Center server
// Plain CommonJS: no Babel transform. jest.mock() calls are placed
// before the app require in each test, so hoisting is not needed.
// =============================================================

module.exports = {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/test/**/*.test.js'],
  // Redis/rate-limit background timers are unref'd, but be safe on CI.
  forceExit: true,
  clearMocks: true,

  // ── Coverage ──────────────────────────────────────────────
  // Only measure code a test can actually reach. Bootstrap modules
  // open real connections (Prisma/Redis) or just build the Swagger
  // spec, so they are reported separately rather than skewing the gate.
  collectCoverageFrom: ['src/**/*.js', '!src/config/**'],
  coverageReporters: ['text', 'lcov'],

  // Regression ratchet. Integration tests are skipped without a database,
  // so these are the floor for a DB-less run; CI (with Postgres) is higher.
  coverageThreshold: {
    global: {
      statements: 17,
      branches: 8,
      functions: 12,
      lines: 18,
    },
  },
};
