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

// Client-side route map for static HTML pages.
var BK_ROUTES = Object.freeze({
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
  var path = String(href || '/');
  var hash = '';
  var query = '';
  var hashIndex = path.indexOf('#');
  if (hashIndex !== -1) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }
  var queryIndex = path.indexOf('?');
  if (queryIndex !== -1) {
    query = path.slice(queryIndex);
    path = path.slice(0, queryIndex);
  }
  return { path: path, query: query, hash: hash };
}

function bkCleanRoutePath(path) {
  var clean = String(path || '/').replace(/\\/g, '/');
  clean = clean.replace(/^(\.\/|\.\.\/)+/, '');
  if (clean.length > 1) clean = clean.replace(/\/+$/, '');
  return clean || '/';
}

function bkFindRouteTarget(route) {
  var parts = bkSplitHref(route);
  var key = bkCleanRoutePath(parts.path);
  var direct = BK_ROUTES[key] || BK_ROUTES[key.toLowerCase()];
  if (direct) return direct;

  var clean = key.replace(/^\/+/, '');
  var lower = clean.toLowerCase();
  var routeValues = Object.keys(BK_ROUTES).map(function (routeKey) {
    return BK_ROUTES[routeKey];
  });
  for (var i = 0; i < routeValues.length; i += 1) {
    if (routeValues[i].toLowerCase() === lower) return routeValues[i];
  }
  return clean;
}

function bkIsRoutableHref(href) {
  if (!href || href === '#') return false;
  if (/^(https?:|mailto:|tel:|javascript:|data:|\/\/)/i.test(href)) return false;

  var parts = bkSplitHref(href);
  var key = bkCleanRoutePath(parts.path);
  if (BK_ROUTES[key] || BK_ROUTES[key.toLowerCase()]) return true;

  var clean = key.replace(/^\/+/, '').toLowerCase();
  return Object.keys(BK_ROUTES).some(function (routeKey) {
    return BK_ROUTES[routeKey].toLowerCase() === clean;
  });
}

function bkClientBasePath() {
  var path = window.location.pathname.replace(/\\/g, '/');
  var lower = path.toLowerCase();
  var marker = '/client/';
  var markerIndex = lower.indexOf(marker);
  if (markerIndex !== -1) {
    return path.slice(0, markerIndex + marker.length);
  }
  return '/';
}

function bkBuildQuery(params) {
  if (!params) return '';
  var search = new URLSearchParams();
  Object.keys(params).forEach(function (key) {
    var value = params[key];
    if (value !== undefined && value !== null) search.set(key, value);
  });
  return search.toString();
}

function routeHref(route, params) {
  var raw = String(route || '/');
  if (/^(https?:|mailto:|tel:|javascript:|data:|\/\/)/i.test(raw) || raw === '#') {
    return raw;
  }

  var parts = bkSplitHref(raw);
  var target = bkFindRouteTarget(parts.path).replace(/^\/+/, '');
  var base = bkClientBasePath().replace(/\/?$/, '/');
  var extraQuery = bkBuildQuery(params);
  var query = parts.query;
  if (extraQuery) query += query ? '&' + extraQuery : '?' + extraQuery;

  return base + target + query + parts.hash;
}

function goToRoute(route, params) {
  window.location.assign(routeHref(route, params));
}

function bindRouteLinks(root) {
  var scope = root || document;
  scope.querySelectorAll('a[href], a[data-route]').forEach(function (link) {
    var route = link.getAttribute('data-route') || link.getAttribute('href');
    if (bkIsRoutableHref(route)) {
      link.setAttribute('href', routeHref(route));
    }
  });
}

var BkRouter = {
  routes: BK_ROUTES,
  href: routeHref,
  go: goToRoute,
  bind: bindRouteLinks,
};

window.BK_ROUTES = BK_ROUTES;
window.BkRouter = BkRouter;
window.routeHref = routeHref;

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
  return { Authorization: 'Bearer ' + getToken() };
}

/** Read a non-HttpOnly cookie by name (used for the CSRF token). */
function readCookie(name) {
  const m = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
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
