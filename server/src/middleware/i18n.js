// =============================================================
// i18n middleware
// Reads Accept-Language header, loads the matching locale file,
// and attaches a t(key) translation helper to req/res.
//
// Supported: en (default), vi, fr, de, es, ca, it
// Fallback chain: requested → en
// =============================================================

'use strict';

const path = require('path');
const fs = require('fs');

const LOCALES_DIR = path.join(__dirname, '../locales');
const SUPPORTED = ['en', 'vi', 'fr', 'de', 'es', 'ca', 'it'];
const DEFAULT = 'en';

// Load all locale files into memory at startup
const translations = {};
for (const lang of SUPPORTED) {
  const file = path.join(LOCALES_DIR, `${lang}.json`);
  translations[lang] = JSON.parse(fs.readFileSync(file, 'utf8'));
}

/**
 * Resolve the best matching locale from an Accept-Language header.
 * e.g. "fr-CH, fr;q=0.9, en;q=0.8" → "fr"
 */
const resolveLocale = (acceptLanguage = '') => {
  const candidates = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q = '1'] = part.trim().split(';q=');
      return { lang: tag.split('-')[0].toLowerCase(), q: parseFloat(q) };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of candidates) {
    if (SUPPORTED.includes(lang)) return lang;
  }
  return DEFAULT;
};

/**
 * Deeply get a nested key like "auth.wrongPassword" from a locale object.
 */
const getKey = (obj, keyPath) => {
  return keyPath.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), obj);
};

/**
 * Express middleware — attaches req.t(key) translation helper.
 */
const i18nMiddleware = (req, res, next) => {
  const locale = resolveLocale(req.headers['accept-language']);
  const dict = translations[locale] || translations[DEFAULT];

  /**
   * Translate a dot-separated key with optional interpolation.
   * t('auth.wrongPassword')
   * t('user.greeting', { name: 'Alice' }) → replaces {{name}}
   */
  req.t = (key, vars = {}) => {
    let msg = getKey(dict, key) || getKey(translations[DEFAULT], key) || key;
    for (const [k, v] of Object.entries(vars)) {
      msg = msg.replace(new RegExp(`{{${k}}}`, 'g'), v);
    }
    return msg;
  };

  // Also expose on res so controllers can call res.t() if preferred
  res.t = req.t;
  res.locale = locale;
  next();
};

module.exports = i18nMiddleware;
