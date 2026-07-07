'use strict';

// Unit tests for the i18n middleware — pure, no DB/network.

const i18n = require('../../src/middleware/i18n');

// Run the middleware with the given request headers, capture req/res.
function run(headers = {}) {
  const req = { headers };
  const res = {};
  let nextCalled = false;
  i18n(req, res, () => {
    nextCalled = true;
  });
  return { req, res, nextCalled };
}

describe('i18n middleware', () => {
  test('calls next() and attaches a t() helper', () => {
    const { req, nextCalled } = run();
    expect(nextCalled).toBe(true);
    expect(typeof req.t).toBe('function');
  });

  test('defaults to English when no Accept-Language header', () => {
    expect(run().res.locale).toBe('en');
  });

  test('resolves the best supported locale from Accept-Language', () => {
    expect(run({ 'accept-language': 'fr-CH, fr;q=0.9, en;q=0.8' }).res.locale).toBe('fr');
    expect(run({ 'accept-language': 'de-DE,de;q=0.8' }).res.locale).toBe('de');
    expect(run({ 'accept-language': 'vi' }).res.locale).toBe('vi');
  });

  test('falls back to English for unsupported locales', () => {
    expect(run({ 'accept-language': 'zz-ZZ' }).res.locale).toBe('en');
  });

  test('t() returns the key itself for an unknown key', () => {
    expect(run().req.t('this.key.does.not.exist')).toBe('this.key.does.not.exist');
  });

  test('t() resolves a known key to its localized string', () => {
    expect(run().req.t('server.error')).toBe('Internal server error');
  });

  test('t() with vars never throws and returns a string', () => {
    expect(typeof run().req.t('server.error', { name: 'Alice' })).toBe('string');
  });
});
