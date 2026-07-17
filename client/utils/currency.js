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
const BkCurrency = (function () {
  'use strict';

  // ── Language → currency config ─────────────────────────────────────
  const LANG_CONFIG = {
    vi: { code: 'VND', locale: 'vi-VN' },
    en: { code: 'USD', locale: 'en-US' },
    es: { code: 'EUR', locale: 'es-ES' },
    fr: { code: 'EUR', locale: 'fr-FR' },
    de: { code: 'EUR', locale: 'de-DE' },
    it: { code: 'EUR', locale: 'it-IT' },
    ca: { code: 'EUR', locale: 'ca-ES' },
  };

  let _rates = {}; // { USD: 0.000041, EUR: 0.000038 }  (rate per 1 VND)
  let _lang = 'vi';
  let _fetched = false; // have we successfully fetched at least once?
  let _fetching = null; // ongoing fetch Promise

  // ── Fetch exchange rates from frankfurter.app ──────────────────────
  /** Fetch currency exchange rates. */
  function _fetchRates() {
    // Build unique currency codes (exclude VND itself)
    const targets = [];
    Object.values(LANG_CONFIG).forEach(function (cfg) {
      if (cfg.code !== 'VND' && !targets.includes(cfg.code)) {
        targets.push(cfg.code);
      }
    });

    const url = `https://api.frankfurter.app/latest?from=VND&to=${targets.join(',')}`;
    _fetching = fetch(url, { cache: 'no-store' })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (data?.rates) {
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
  /** Convert VND amount to selected currency. */
  function _convert(vndAmount) {
    const cfg = LANG_CONFIG[_lang] || LANG_CONFIG['vi'];
    if (cfg.code === 'VND') return vndAmount;
    const rate = _rates[cfg.code];
    if (!rate) return vndAmount; // fallback: show raw VND if no rate yet
    return vndAmount * rate;
  }

  // ── Format a VND amount as a locale-aware currency string ──────────
  /** Format amount in selected currency. */
  function format(vndAmount) {
    const num = Number.parseFloat(vndAmount);
    if (Number.isNaN(num)) return '';

    const cfg = LANG_CONFIG[_lang] || LANG_CONFIG['vi'];

    if (cfg.code === 'VND') {
      return `${num.toLocaleString('vi-VN')} VND`;
    }

    // If rates not yet loaded, show VND as fallback
    if (!_fetched || !_rates[cfg.code]) {
      return `${num.toLocaleString('vi-VN')} VND`;
    }

    const converted = _convert(num);
    try {
      return new Intl.NumberFormat(cfg.locale, {
        style: 'currency',
        currency: cfg.code,
        maximumFractionDigits: 2,
      }).format(converted);
    } catch (error) {
      console.warn('[BkCurrency] Intl.NumberFormat failed; using fallback format.', error);
      return `${converted.toFixed(2)} ${cfg.code}`;
    }
  }

  // ── Re-render all [data-vnd] elements in DOM ───────────────────────
  /** Apply currency formatting to marked elements. */
  function _applyAll() {
    document.querySelectorAll('[data-vnd]').forEach(function (el) {
      const raw = Number.parseFloat(el.dataset.vnd);
      if (!Number.isNaN(raw)) el.textContent = format(raw);
    });
  }

  // ── Public: change language, fetch rates if needed, re-render ──────
  /** Set active language. */
  function setLang(lang) {
    _lang = lang;
    const cfg = LANG_CONFIG[lang] || LANG_CONFIG['vi'];

    if (cfg.code === 'VND') {
      // No fetch needed for VND
      _applyAll();
      return Promise.resolve();
    }

    // Fetch if not yet fetched (or refetch for fresh data)
    const fetchPromise = _fetching || _fetchRates();
    return fetchPromise.then(function () {
      _applyAll();
    });
  }

  // ── Public: init (called on page load) ────────────────────────────
  /** Initialize component behavior. */
  function init() {
    _lang = typeof i18n !== 'undefined' ? i18n.getLang() : 'vi';
    const cfg = LANG_CONFIG[_lang] || LANG_CONFIG['vi'];
    if (cfg.code !== 'VND') {
      return _fetchRates().then(_applyAll);
    }
    return Promise.resolve();
  }

  return { format: format, setLang: setLang, init: init };
})();

window.BkCurrency = BkCurrency;

// ── Auto-hook into i18n language changes ─────────────────────────────
document.addEventListener('i18n:changed', function (e) {
  if (e.detail?.lang) {
    BkCurrency.setLang(e.detail.lang);
  }
});
