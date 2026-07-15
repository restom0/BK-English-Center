// =============================================================
// Theme Switcher — BK English Center
// Light / Dark mode via CSS custom properties on <html>.
// Preference persisted to localStorage as 'bkec-theme'.
// =============================================================

(function ThemeManager() {
  'use strict';

  const STORAGE_KEY = 'bkec-theme';
  const THEMES = new Set(['light', 'dark']);

  // ── Apply a theme ──────────────────────────────────────────

  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);

    // Sync all switcher buttons on the page
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const icon = btn.querySelector('.theme-icon');
      if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
      btn.setAttribute('title', btn.getAttribute('aria-label'));
    });
  }

  // ── Read stored preference or system preference ────────────

  function resolve() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && THEMES.has(stored)) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // ── Toggle ─────────────────────────────────────────────────

  function toggle() {
    const current = document.documentElement.dataset.theme || 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  }

  // ── Wire up button clicks ──────────────────────────────────

  function bindButtons() {
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', toggle);
    });
  }

  // ── Init ───────────────────────────────────────────────────

  function init() {
    apply(resolve());
    bindButtons();

    // Handle dynamically added buttons (e.g. nav loaded via AJAX)
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-theme-toggle]')) toggle();
    });

    // React to OS-level preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        apply(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Expose globally so pages can call ThemeManager.toggle() etc.
  window.ThemeManager = { init, toggle, apply, resolve };

  // Auto-apply as early as possible (before DOMContentLoaded) to prevent flash
  apply(resolve());

  document.addEventListener('DOMContentLoaded', () => {
    bindButtons();
  });
})();
