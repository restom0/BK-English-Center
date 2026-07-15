/**
 * utils/auth.js
 * Xác thực phía client: kiểm tra token, phân quyền, redirect.
 * Thay thế logic lặp lại trong navigation.js và nhiều page scripts.
 */

/** Danh sách các trang yêu cầu đăng nhập */
const PROTECTED_PAGES = new Set([
  'Adminpage.html',
  'Attendstaffpage.html',
  'Attendstupage.html',
  'Attendteapage.html',
  'Fileteapage.html',
  'Infostaffpage.html',
  'Infoteapage.html',
  'Infostupage.html',
  'manageCoursePage.html',
  'Markstupage.html',
  'Paystaffpage.html',
  'Payteapage.html',
  'Paystupage.html',
  'Rateteapage.html',
  'Staffpage.html',
  'Stataccesspage.html',
  'Statfinancialpage.html',
  'Statclasspage.html',
  'MyCourses.html',
  'myCourses.html',
  'myPage.html',
  'MyPage.html',
]);

/** Trang đích sau khi đăng nhập theo role */
const ROLE_HOME = {
  student: 'my-courses',
  teacher: 'my-courses',
  staff: 'staff',
  admin: 'admin',
};

const ROLE_HOME_FALLBACK = {
  student: '../pages/public/my-courses/index.html',
  teacher: '../pages/public/my-courses/index.html',
  staff: '../pages/staff/dashboard/index.html',
  admin: '../pages/admin/dashboard/index.html',
};

function authRouteHref(route, fallback) {
  return typeof routeHref === 'function' ? routeHref(route) : fallback;
}

function roleHomeHref(role) {
  return authRouteHref(ROLE_HOME[role], ROLE_HOME_FALLBACK[role]);
}

/**
 * Bảo vệ trang hiện tại — redirect về Login nếu chưa đăng nhập.
 * Gọi ở đầu mỗi page script cần bảo vệ.
 */
function requireAuth() {
  const token = localStorage.getItem('role');
  if (!token) {
    window.location.replace(authRouteHref('login', '../pages/auth/login/index.html'));
  }
}

/**
 * Kiểm tra trang hiện tại có trong danh sách bảo vệ không,
 * nếu có và chưa login thì redirect.
 * Gọi 1 lần trong navigation.js thay vì danh sách path cứng.
 */
function guardCurrentPage() {
  const page = window.location.pathname.split('/').pop();
  if (PROTECTED_PAGES.has(page) && !localStorage.getItem('role')) {
    window.location.replace(authRouteHref('login', '../pages/auth/login/index.html'));
  }
}

/**
 * Nếu đã đăng nhập, chuyển hướng đến trang phù hợp với role.
 * Gọi trong Login.js để bỏ qua form login khi đã có token.
 */
function redirectIfLoggedIn() {
  const token = localStorage.getItem('role');
  const role = localStorage.getItem('role');
  if (token && role && ROLE_HOME[role]) {
    window.location.replace(roleHomeHref(role));
  }
}

/**
 * Redirect đến trang home của role hiện tại sau khi đăng nhập thành công.
 * @param {string} role
 */
function redirectAfterLogin(role) {
  const dest = roleHomeHref(role);
  if (dest) {
    window.location.replace(dest);
  } else {
    window.location.replace(authRouteHref('home', '../pages/public/home/index.html'));
  }
}

/**
 * Lấy token hiện tại từ localStorage.
 * @returns {string|null}
 */
function getToken() {
  // JWT is stored in an httpOnly cookie and cannot be read from JS.
  return null;
}

/**
 * Lấy role hiện tại.
 * @returns {string|null}
 */
function getRole() {
  return localStorage.getItem('role');
}

/**
 * Lấy thông tin user đã cache (object).
 * @returns {object|null}
 */
function getCachedUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
}

/**
 * Đăng xuất: xóa localStorage và redirect về Home.
 */
function logout() {
  localStorage.clear();
  window.location.replace(authRouteHref('home', '../pages/public/home/index.html'));
}
