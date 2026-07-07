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
};
