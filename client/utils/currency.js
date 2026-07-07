/**
 * BkCurrency — real-time VND → locale currency converter
 *
 * Uses frankfurter.app (free, no API key) for live exchange rates.
 * Integrates with the i18n module: call BkCurrency.setLang(lang) whenever
 * the UI language changes and all [data-vnd] elements will re-render.
 *
 * Usage in JS:
 *   BkCurrency.format(el.amount)   // returns formatted string for current locale
 *
 * Usage in HTML templates:
 *   `<span data-vnd="${amount}">${BkCurrency.format(amount)}</span>`
 */
var BkCurrency = (function () {
  'use strict';

  // ── Language → currency config ─────────────────────────────────────
  var LANG_CONFIG = {
    vi: { code: 'VND', locale: 'vi-VN' },
    en: { code: 'USD', locale: 'en-US' },
    es: { code: 'EUR', locale: 'es-ES' },
    fr: { code: 'EUR', locale: 'fr-FR' },
    de: { code: 'EUR', locale: 'de-DE' },
    it: { code: 'EUR', locale: 'it-IT' },
    ca: { code: 'EUR', locale: 'ca-ES' },
  };

  var _rates = {}; // { USD: 0.000041, EUR: 0.000038 }  (rate per 1 VND)
  var _lang = 'vi';
  var _fetched = false; // have we successfully fetched at least once?
  var _fetching = null; // ongoing fetch Promise

  // ── Fetch exchange rates from frankfurter.app ──────────────────────
  function _fetchRates() {
    // Build unique currency codes (exclude VND itself)
    var targets = [];
    Object.values(LANG_CONFIG).forEach(function (cfg) {
      if (cfg.code !== 'VND' && targets.indexOf(cfg.code) === -1) {
        targets.push(cfg.code);
      }
    });

    var url = 'https://api.frankfurter.app/latest?from=VND&to=' + targets.join(',');
    _fetching = fetch(url, { cache: 'no-store' })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (data && data.rates) {
          _rates = data.rates;
          _fetched = true;
        }
        _fetching = null;
      })
      .catch(function () {
        _fetching = null;
        // silent: keep showing VND if network fails
      });
    return _fetching;
  }

  // ── Convert a VND amount to the current currency ───────────────────
  function _convert(vndAmount) {
    var cfg = LANG_CONFIG[_lang] || LANG_CONFIG['vi'];
    if (cfg.code === 'VND') return vndAmount;
    var rate = _rates[cfg.code];
    if (!rate) return vndAmount; // fallback: show raw VND if no rate yet
    return vndAmount * rate;
  }

  // ── Format a VND amount as a locale-aware currency string ──────────
  function format(vndAmount) {
    var num = parseFloat(vndAmount);
    if (isNaN(num)) return '';

    var cfg = LANG_CONFIG[_lang] || LANG_CONFIG['vi'];

    if (cfg.code === 'VND') {
      return num.toLocaleString('vi-VN') + ' ₫';
    }

    // If rates not yet loaded, show VND as fallback
    if (!_fetched || !_rates[cfg.code]) {
      return num.toLocaleString('vi-VN') + ' ₫';
    }

    var converted = _convert(num);
    try {
      return new Intl.NumberFormat(cfg.locale, {
        style: 'currency',
        currency: cfg.code,
        maximumFractionDigits: 2,
      }).format(converted);
    } catch (e) {
      return converted.toFixed(2) + ' ' + cfg.code;
    }
  }

  // ── Re-render all [data-vnd] elements in DOM ───────────────────────
  function _applyAll() {
    document.querySelectorAll('[data-vnd]').forEach(function (el) {
      var raw = parseFloat(el.getAttribute('data-vnd'));
      if (!isNaN(raw)) el.textContent = format(raw);
    });
  }

  // ── Public: change language, fetch rates if needed, re-render ──────
  function setLang(lang) {
    _lang = lang;
    var cfg = LANG_CONFIG[lang] || LANG_CONFIG['vi'];

    if (cfg.code === 'VND') {
      // No fetch needed for VND
      _applyAll();
      return Promise.resolve();
    }

    // Fetch if not yet fetched (or refetch for fresh data)
    var fetchPromise = _fetching || _fetchRates();
    return fetchPromise.then(function () {
      _applyAll();
    });
  }

  // ── Public: init (called on page load) ────────────────────────────
  function init() {
    _lang = typeof i18n !== 'undefined' ? i18n.getLang() : 'vi';
    var cfg = LANG_CONFIG[_lang] || LANG_CONFIG['vi'];
    if (cfg.code !== 'VND') {
      return _fetchRates().then(_applyAll);
    }
    return Promise.resolve();
  }

  return { format: format, setLang: setLang, init: init };
})();

// ── Auto-hook into i18n language changes ─────────────────────────────
document.addEventListener('i18n:changed', function (e) {
  if (e.detail && e.detail.lang) {
    BkCurrency.setLang(e.detail.lang);
  }
});
