// =============================================================
// CSRF protection — double-submit cookie pattern
//
// A readable `csrfToken` cookie is issued on the first request. For
// state-changing methods the client must echo that value back in the
// `X-CSRF-Token` header (client/config.js does this globally). Because
// a cross-site attacker cannot read the cookie, they cannot forge the
// header — so the request is rejected.
// =============================================================

'use strict';

const { randomBytes, timingSafeEqual } = require('node:crypto');

const CSRF_COOKIE = 'csrfToken';
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

// Sign-in is the bootstrap request. The login page is static and never calls
// the API, so a first-time visitor has no CSRF cookie yet and requiring the
// header here would make signing in impossible. The credentials themselves
// authenticate this route and there is no session to hijack at that point.
const CSRF_EXEMPT_PATHS = new Set(['/users/login']);

function cookieOptions() {
  return {
    httpOnly: false, // must be readable by JS to echo into the header
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    path: '/',
  };
}

function csrfProtection(req, res, next) {
  let token = req.cookies?.[CSRF_COOKIE];
  if (!token) {
    token = randomBytes(32).toString('hex');
    res.cookie(CSRF_COOKIE, token, cookieOptions());
  }

  if (SAFE_METHODS.has(req.method)) return next();
  if (CSRF_EXEMPT_PATHS.has(req.path)) return next();

  const header = req.get('x-csrf-token') || '';
  const a = Buffer.from(header);
  const b = Buffer.from(token);
  if (a.length > 0 && a.length === b.length && timingSafeEqual(a, b)) {
    return next();
  }

  return res.status(403).json({ check: false, msg: 'Invalid or missing CSRF token' });
}

module.exports = { csrfProtection, CSRF_COOKIE };
