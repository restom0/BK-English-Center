// =============================================================
// Unit tests — CSRF double-submit middleware
// Pure request/response logic: no DB, no network.
// =============================================================

'use strict';

const { csrfProtection, CSRF_COOKIE } = require('../../src/middleware/csrf');

function makeRes() {
  const res = { statusCode: 200, body: null, cookies: {} };
  res.cookie = jest.fn((name, value, options) => {
    res.cookies[name] = { value, options };
  });
  res.status = jest.fn((code) => {
    res.statusCode = code;
    return res;
  });
  res.json = jest.fn((payload) => {
    res.body = payload;
    return res;
  });
  return res;
}

function makeReq({ method = 'GET', cookies, headers = {} } = {}) {
  return {
    method,
    cookies,
    get: (name) => headers[String(name).toLowerCase()],
  };
}

describe('csrfProtection', () => {
  describe('safe methods', () => {
    it.each(['GET', 'HEAD', 'OPTIONS'])('issues a token and passes through on %s', (method) => {
      const req = makeReq({ method, cookies: {} });
      const res = makeRes();
      const next = jest.fn();

      csrfProtection(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      const issued = res.cookies[CSRF_COOKIE];
      expect(issued.value).toMatch(/^[a-f0-9]{64}$/); // 32 random bytes, hex
      // Must be readable by JS so the client can echo it back in a header.
      expect(issued.options.httpOnly).toBe(false);
      expect(issued.options.sameSite).toBe('lax');
    });

    it('does not re-issue when the client already has a token', () => {
      const req = makeReq({ method: 'GET', cookies: { [CSRF_COOKIE]: 'existing-token' } });
      const res = makeRes();
      const next = jest.fn();

      csrfProtection(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(res.cookie).not.toHaveBeenCalled();
    });

    it('tolerates a request with no cookies object at all', () => {
      const req = makeReq({ method: 'GET', cookies: undefined });
      const res = makeRes();
      const next = jest.fn();

      csrfProtection(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledTimes(1);
    });
  });

  describe('state-changing methods', () => {
    const token = 'a'.repeat(64);

    it('passes when the header matches the cookie', () => {
      const req = makeReq({
        method: 'POST',
        cookies: { [CSRF_COOKIE]: token },
        headers: { 'x-csrf-token': token },
      });
      const res = makeRes();
      const next = jest.fn();

      csrfProtection(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('rejects when the header is missing', () => {
      const req = makeReq({ method: 'POST', cookies: { [CSRF_COOKIE]: token } });
      const res = makeRes();
      const next = jest.fn();

      csrfProtection(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.statusCode).toBe(403);
      expect(res.body).toEqual({ check: false, msg: 'Invalid or missing CSRF token' });
    });

    it('rejects when the header does not match the cookie (same length)', () => {
      const req = makeReq({
        method: 'POST',
        cookies: { [CSRF_COOKIE]: token },
        headers: { 'x-csrf-token': 'b'.repeat(64) },
      });
      const res = makeRes();
      const next = jest.fn();

      csrfProtection(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.statusCode).toBe(403);
    });

    it('rejects when the header length differs (timing-safe guard)', () => {
      const req = makeReq({
        method: 'POST',
        cookies: { [CSRF_COOKIE]: token },
        headers: { 'x-csrf-token': 'short' },
      });
      const res = makeRes();
      const next = jest.fn();

      csrfProtection(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.statusCode).toBe(403);
    });

    it('rejects the first mutating request when no token was issued yet', () => {
      // Cookie is minted on this request, so the client cannot have echoed it.
      const req = makeReq({ method: 'DELETE', cookies: {} });
      const res = makeRes();
      const next = jest.fn();

      csrfProtection(req, res, next);

      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(next).not.toHaveBeenCalled();
      expect(res.statusCode).toBe(403);
    });

    it.each(['POST', 'PUT', 'PATCH', 'DELETE'])('guards %s', (method) => {
      const req = makeReq({ method, cookies: { [CSRF_COOKIE]: token } });
      const res = makeRes();
      const next = jest.fn();

      csrfProtection(req, res, next);

      expect(res.statusCode).toBe(403);
    });
  });
});
