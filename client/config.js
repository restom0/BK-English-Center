// =============================================================
// Client global configuration — BK English Center
// Static dev servers use the local Express API. Deployed builds use
// same-origin /api paths proxied by nginx or Vercel.
// =============================================================

function bkResolveApiUrl() {
  const host = window.location.hostname;
  const port = window.location.port;
  const isLoopback = host === 'localhost' || host === '127.0.0.1' || host === '[::1]';

  if (window.location.protocol === 'file:') {
    return 'http://localhost:3000';
  }

  if (isLoopback) {
    if (!port || port === '80' || port === '443') return '/api';
    if (port === '3000') return '';
    return 'http://localhost:3000';
  }

  return '/api';
}

const API_URL = bkResolveApiUrl();

// Google OAuth Client ID — set to your own from Google Cloud Console.
// In production this is patched by the Dockerfile build step:
//   sed -i 's|GOOGLE_CLIENT_ID_PLACEHOLDER|'"$GOOGLE_CLIENT_ID"'|g' config.js
const GOOGLE_CLIENT_ID = 'GOOGLE_CLIENT_ID_PLACEHOLDER';

// Client-side route map for static HTML pages.
const BK_ROUTES = Object.freeze({
  '/': 'HomePage/homePage.html',
  '/home': 'HomePage/homePage.html',
  home: 'HomePage/homePage.html',
  '/courses': 'CoursesPage/coursesPage.html',
  courses: 'CoursesPage/coursesPage.html',
  '/course-detail': 'CoursesPageDetail/CoursesPageDetail.html',
  'course-detail': 'CoursesPageDetail/CoursesPageDetail.html',
  '/contact': 'ContactPage/contact.html',
  contact: 'ContactPage/contact.html',
  '/login': 'Loginpage/Login.html',
  login: 'Loginpage/Login.html',
  '/signup': 'Loginpage/Signup.html',
  signup: 'Loginpage/Signup.html',
  '/forgot-password': 'Loginpage/ForgotPass.html',
  'forgot-password': 'Loginpage/ForgotPass.html',
  '/choose-actor': 'Loginpage/ChooseActor.html',
  'choose-actor': 'Loginpage/ChooseActor.html',
  '/my-courses': 'MyCourses/myCourses.html',
  'my-courses': 'MyCourses/myCourses.html',
  '/my-page': 'MyPage/myPage.html',
  'my-page': 'MyPage/myPage.html',
  '/admin': 'Adminpage/Adminpage.html',
  admin: 'Adminpage/Adminpage.html',
  '/staff': 'Staffpage/Staffpage.html',
  staff: 'Staffpage/Staffpage.html',
  '/stat-financial': 'Statfinancialpage/Statfinancialpage.html',
  'stat-financial': 'Statfinancialpage/Statfinancialpage.html',
  '/stat-access': 'Stataccesspage/Stataccesspage.html',
  'stat-access': 'Stataccesspage/Stataccesspage.html',
  '/stat-class': 'Statclasspage/Statclasspage.html',
  'stat-class': 'Statclasspage/Statclasspage.html',
  '/manage-courses': 'manageCoursePage/manageCoursePage.html',
  'manage-courses': 'manageCoursePage/manageCoursePage.html',
  '/staff-info': 'Infostaffpage/Infostaffpage.html',
  'staff-info': 'Infostaffpage/Infostaffpage.html',
  '/staff-attendance': 'Attendstaffpage/Attendstaffpage.html',
  'staff-attendance': 'Attendstaffpage/Attendstaffpage.html',
  '/staff-pay': 'Paystaffpage/Paystaffpage.html',
  'staff-pay': 'Paystaffpage/Paystaffpage.html',
  '/student-info': 'Infostupage/Infostupage.html',
  'student-info': 'Infostupage/Infostupage.html',
  '/student-attendance': 'Attendstupage/Attendstupage.html',
  'student-attendance': 'Attendstupage/Attendstupage.html',
  '/student-marks': 'Markstupage/Markstupage.html',
  'student-marks': 'Markstupage/Markstupage.html',
  '/student-pay': 'Paystupage/Paystupage.html',
  'student-pay': 'Paystupage/Paystupage.html',
  '/teacher-info': 'Infoteapage/Infoteapage.html',
  'teacher-info': 'Infoteapage/Infoteapage.html',
  '/teacher-attendance': 'Attendteapage/Attendteapage.html',
  'teacher-attendance': 'Attendteapage/Attendteapage.html',
  '/teacher-rate': 'Rateteapage/Rateteapage.html',
  'teacher-rate': 'Rateteapage/Rateteapage.html',
  '/teacher-pay': 'Payteapage/Payteapage.html',
  'teacher-pay': 'Payteapage/Payteapage.html',
  '/teacher-files': 'Fileteapage/Fileteapage.html',
  'teacher-files': 'Fileteapage/Fileteapage.html',
});

function bkSplitHref(href) {
  let path = String(href || '/');
  let hash = '';
  let query = '';
  const hashIndex = path.indexOf('#');
  if (hashIndex !== -1) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }
  const queryIndex = path.indexOf('?');
  if (queryIndex !== -1) {
    query = path.slice(queryIndex);
    path = path.slice(0, queryIndex);
  }
  return { path: path, query: query, hash: hash };
}

function bkCleanRoutePath(path) {
  let clean = String(path || '/').replaceAll('\\', '/');
  while (clean.startsWith('./')) clean = clean.slice(2);
  while (clean.startsWith('../')) clean = clean.slice(3);
  while (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);
  return clean || '/';
}

function bkStripLeadingSlashes(path) {
  let clean = String(path || '');
  while (clean.startsWith('/')) clean = clean.slice(1);
  return clean;
}

function bkEnsureTrailingSlash(path) {
  let clean = String(path || '/');
  while (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);
  return clean.endsWith('/') ? clean : `${clean}/`;
}

function bkFindRouteTarget(route) {
  const parts = bkSplitHref(route);
  const key = bkCleanRoutePath(parts.path);
  const direct = BK_ROUTES[key] || BK_ROUTES[key.toLowerCase()];
  if (direct) return direct;

  const clean = bkStripLeadingSlashes(key);
  const lower = clean.toLowerCase();
  const routeValues = Object.keys(BK_ROUTES).map(function (routeKey) {
    return BK_ROUTES[routeKey];
  });
  for (const routeValue of routeValues) {
    if (routeValue.toLowerCase() === lower) return routeValue;
  }
  return clean;
}

function bkIsRoutableHref(href) {
  if (!href || href === '#') return false;
  if (/^(https?:|mailto:|tel:|javascript:|data:|\/\/)/i.test(href)) return false;

  const parts = bkSplitHref(href);
  const key = bkCleanRoutePath(parts.path);
  if (BK_ROUTES[key] || BK_ROUTES[key.toLowerCase()]) return true;

  const clean = bkStripLeadingSlashes(key).toLowerCase();
  return Object.keys(BK_ROUTES).some(function (routeKey) {
    return BK_ROUTES[routeKey].toLowerCase() === clean;
  });
}

function bkClientBasePath() {
  const path = window.location.pathname.replaceAll('\\', '/');
  const lower = path.toLowerCase();
  const marker = '/client/';
  const markerIndex = lower.indexOf(marker);
  if (markerIndex !== -1) {
    return path.slice(0, markerIndex + marker.length);
  }
  return '/';
}

function bkBuildQuery(params) {
  if (!params) return '';
  const search = new URLSearchParams();
  Object.keys(params).forEach(function (key) {
    const value = params[key];
    if (value !== undefined && value !== null) search.set(key, value);
  });
  return search.toString();
}

function routeHref(route, params) {
  const raw = String(route || '/');
  if (/^(https?:|mailto:|tel:|javascript:|data:|\/\/)/i.test(raw) || raw === '#') {
    return raw;
  }

  const parts = bkSplitHref(raw);
  const target = bkStripLeadingSlashes(bkFindRouteTarget(parts.path));
  const base = bkEnsureTrailingSlash(bkClientBasePath());
  const extraQuery = bkBuildQuery(params);
  let query = parts.query;
  if (extraQuery) query += query ? `&${extraQuery}` : `?${extraQuery}`;

  return base + target + query + parts.hash;
}

function goToRoute(route, params) {
  window.location.assign(routeHref(route, params));
}

function bindRouteLinks(root) {
  const scope = root || document;
  scope.querySelectorAll('a[href], a[data-route]').forEach(function (link) {
    const route = link.dataset.route || link.getAttribute('href');
    if (bkIsRoutableHref(route)) {
      link.setAttribute('href', routeHref(route));
    }
  });
}

const BkRouter = {
  routes: BK_ROUTES,
  href: routeHref,
  go: goToRoute,
  bind: bindRouteLinks,
};

window.BK_ROUTES = BK_ROUTES;
window.BkRouter = BkRouter;
window.routeHref = routeHref;

const BkSecurity = (function () {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const ALLOWED_TAGS = {
    a: 1,
    b: 1,
    br: 1,
    button: 1,
    div: 1,
    em: 1,
    form: 1,
    h1: 1,
    h2: 1,
    h3: 1,
    h4: 1,
    h5: 1,
    h6: 1,
    hr: 1,
    i: 1,
    img: 1,
    input: 1,
    label: 1,
    li: 1,
    ol: 1,
    option: 1,
    p: 1,
    path: 1,
    select: 1,
    small: 1,
    span: 1,
    strong: 1,
    svg: 1,
    table: 1,
    tbody: 1,
    td: 1,
    textarea: 1,
    th: 1,
    thead: 1,
    tr: 1,
    ul: 1,
  };
  const SVG_TAGS = { svg: 1, path: 1 };
  const ALLOWED_ATTRS = {
    alt: 1,
    checked: 1,
    class: 1,
    colspan: 1,
    d: 1,
    disabled: 1,
    fill: 1,
    for: 1,
    height: 1,
    href: 1,
    id: 1,
    max: 1,
    maxlength: 1,
    min: 1,
    name: 1,
    placeholder: 1,
    pattern: 1,
    readonly: 1,
    rel: 1,
    required: 1,
    role: 1,
    rows: 1,
    rowspan: 1,
    scope: 1,
    selected: 1,
    src: 1,
    step: 1,
    style: 1,
    target: 1,
    title: 1,
    type: 1,
    value: 1,
    viewbox: 1,
    width: 1,
    xmlns: 1,
  };
  const SAFE_STYLE_PROPS = {
    color: 1,
    display: 1,
    'font-size': 1,
    'font-weight': 1,
    margin: 1,
    'margin-left': 1,
    'max-width': 1,
    'text-align': 1,
  };

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function isAllowedAttr(name) {
    const cleanName = String(name || '').toLowerCase();
    if (cleanName.startsWith('on')) return false;
    if (cleanName.startsWith('data-')) return true;
    if (cleanName.startsWith('aria-')) return true;
    return Boolean(ALLOWED_ATTRS[cleanName]);
  }

  function isSafeUrl(value) {
    const clean = String(value || '').trim();
    if (!clean) return true;
    return /^(https?:|mailto:|tel:|\/|\.\/|\.\.\/|#)/i.test(clean);
  }

  function sanitizeStyle(value) {
    const declarations = String(value || '').split(';');
    const safe = [];
    declarations.forEach(function (declaration) {
      const pair = declaration.split(':');
      if (pair.length < 2) return;
      const property = pair.shift().trim().toLowerCase();
      const cssValue = pair.join(':').trim();
      if (!SAFE_STYLE_PROPS[property]) return;
      if (/url\s*\(|expression\s*\(|javascript:/i.test(cssValue)) return;
      safe.push(`${property}: ${cssValue}`);
    });
    return safe.join('; ');
  }

  function createCleanElement(tagName) {
    if (SVG_TAGS[tagName]) return document.createElementNS(SVG_NS, tagName);
    return document.createElement(tagName);
  }

  function cleanNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(node.textContent || '');
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return document.createDocumentFragment();
    }

    const tagName = node.tagName.toLowerCase();
    if (!ALLOWED_TAGS[tagName]) {
      return document.createTextNode(node.textContent || '');
    }

    const clean = createCleanElement(tagName);
    Array.prototype.slice.call(node.attributes).forEach(function (attr) {
      const attrName = attr.name;
      const attrKey = attrName.toLowerCase();
      let attrValue = attr.value;
      if (!isAllowedAttr(attrKey)) return;
      if ((attrKey === 'href' || attrKey === 'src') && !isSafeUrl(attrValue)) return;
      if (attrKey === 'style') {
        attrValue = sanitizeStyle(attrValue);
        if (!attrValue) return;
      }
      clean.setAttribute(attrName, attrValue);
    });
    if (clean.tagName.toLowerCase() === 'a' && clean.getAttribute('target') === '_blank') {
      clean.setAttribute('rel', 'noopener noreferrer');
    }

    Array.prototype.slice.call(node.childNodes).forEach(function (child) {
      clean.appendChild(cleanNode(child));
    });
    return clean;
  }

  function sanitizeHtml(html) {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(String(html ?? ''), 'text/html');
    const fragment = document.createDocumentFragment();
    Array.prototype.slice.call(parsed.body.childNodes).forEach(function (node) {
      fragment.appendChild(cleanNode(node));
    });
    return fragment;
  }

  function targetsFor(target) {
    if (!target) return [];
    if (target.jquery) return target.toArray();
    if (typeof target === 'string')
      return Array.prototype.slice.call(document.querySelectorAll(target));
    if (target.nodeType === Node.ELEMENT_NODE) return [target];
    if (typeof target.length === 'number') return Array.prototype.slice.call(target);
    return [];
  }

  function setSafeHtml(target, html) {
    targetsFor(target).forEach(function (element) {
      while (element.firstChild) element.firstChild.remove();
      element.appendChild(sanitizeHtml(html));
    });
  }

  function setText(target, value) {
    targetsFor(target).forEach(function (element) {
      element.textContent = String(value ?? '');
    });
  }

  return {
    escapeHtml: escapeHtml,
    sanitizeHtml: sanitizeHtml,
    setSafeHtml: setSafeHtml,
    setText: setText,
  };
})();

window.BkSecurity = BkSecurity;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    bindRouteLinks(document);
  });
} else {
  bindRouteLinks(document);
}

// ── Auth helpers ──────────────────────────────────────────────

/** The JWT now lives in an httpOnly cookie and is not readable from JS. */
function getToken() {
  return null;
}

/** Build Authorization header object (legacy; auth now rides the httpOnly cookie) */
function authHeader() {
  return { Authorization: `Bearer ${getToken()}` };
}

/** Read a non-HttpOnly cookie by name (used for the CSRF token). */
function readCookie(name) {
  const m = new RegExp(`(?:^|; )${name}=([^;]*)`).exec(document.cookie);
  return m ? decodeURIComponent(m[1]) : '';
}

// ── Global AJAX policy ────────────────────────────────────────
// 1. Send cookies (httpOnly JWT + CSRF token) with every request.
// 2. Echo the CSRF token in a header on state-changing requests.
if (window.jQuery) {
  const SAFE_METHODS = { GET: 1, HEAD: 1, OPTIONS: 1 };
  jQuery.ajaxSetup({
    xhrFields: { withCredentials: true },
    beforeSend: function (xhr, settings) {
      const method = (settings.type || 'GET').toUpperCase();
      if (!SAFE_METHODS[method]) {
        xhr.setRequestHeader('X-CSRF-Token', readCookie('csrfToken'));
      }
    },
  });
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
