// =============================================================
// Client global configuration — BK English Center
// In Docker, API_URL is patched to "" by the Dockerfile build step
// so all requests use same-origin paths (proxied by nginx).
// =============================================================

const API_URL = 'http://localhost:3000';

// Google OAuth Client ID — set to your own from Google Cloud Console.
// In production this is patched by the Dockerfile build step:
//   sed -i 's|GOOGLE_CLIENT_ID_PLACEHOLDER|'"$GOOGLE_CLIENT_ID"'|g' config.js
const GOOGLE_CLIENT_ID = 'GOOGLE_CLIENT_ID_PLACEHOLDER';

// ── Auth helpers ──────────────────────────────────────────────

/** Get the stored JWT token */
function getToken() {
  return localStorage.getItem('apitoken');
}

/** Build Authorization header object */
function authHeader() {
  return { Authorization: 'Bearer ' + getToken() };
}

/**
 * Authenticated AJAX helper (wraps jQuery.ajax)
 * @param {object} options - jQuery AJAX options (type, url, data, success, error)
 */
function apiRequest(options) {
  return $.ajax({
    ...options,
    url: API_URL + options.url,
    headers: { ...authHeader(), ...(options.headers || {}) },
    dataType: options.dataType || 'JSON',
  });
}

// ── Google One-Tap login ──────────────────────────────────────

/**
 * Initialise Google One-Tap / Sign-In button.
 * Call this after the Google Identity Services script has loaded.
 *
 * @param {string} buttonContainerId  – id of the <div> to render the button in
 * @param {function} onCredential     – callback(credentialResponse) after sign-in
 */
function initGoogleLogin(buttonContainerId, onCredential) {
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'GOOGLE_CLIENT_ID_PLACEHOLDER') {
    console.warn('[Google Login] GOOGLE_CLIENT_ID not set — button hidden.');
    const el = document.getElementById(buttonContainerId);
    if (el) el.style.display = 'none';
    return;
  }

  /* global google */
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: onCredential,
  });

  google.accounts.id.renderButton(document.getElementById(buttonContainerId), {
    theme: 'outline',
    size: 'large',
    locale: navigator.language || 'en',
  });
}
