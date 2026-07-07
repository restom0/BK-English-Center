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
  student: '../MyCourses/myCourses.html',
  teacher: '../MyCourses/myCourses.html',
  staff: '../Staffpage/Staffpage.html',
  admin: '../Adminpage/Adminpage.html',
};

/**
 * Bảo vệ trang hiện tại — redirect về Login nếu chưa đăng nhập.
 * Gọi ở đầu mỗi page script cần bảo vệ.
 */
function requireAuth() {
  const token = localStorage.getItem('apitoken');
  if (!token) {
    window.location.replace('../Loginpage/Login.html');
  }
}

/**
 * Kiểm tra trang hiện tại có trong danh sách bảo vệ không,
 * nếu có và chưa login thì redirect.
 * Gọi 1 lần trong navigation.js thay vì danh sách path cứng.
 */
function guardCurrentPage() {
  const page = window.location.pathname.split('/').pop();
  if (PROTECTED_PAGES.has(page) && !localStorage.getItem('apitoken')) {
    window.location.replace('../Loginpage/Login.html');
  }
}

/**
 * Nếu đã đăng nhập, chuyển hướng đến trang phù hợp với role.
 * Gọi trong Login.js để bỏ qua form login khi đã có token.
 */
function redirectIfLoggedIn() {
  const token = localStorage.getItem('apitoken');
  const role = localStorage.getItem('role');
  if (token && role && ROLE_HOME[role]) {
    window.location.replace(ROLE_HOME[role]);
  }
}

/**
 * Redirect đến trang home của role hiện tại sau khi đăng nhập thành công.
 * @param {string} role
 */
function redirectAfterLogin(role) {
  const dest = ROLE_HOME[role];
  if (dest) {
    window.location.replace(dest);
  } else {
    window.location.replace('../HomePage/homePage.html');
  }
}

/**
 * Lấy token hiện tại từ localStorage.
 * @returns {string|null}
 */
function getToken() {
  return localStorage.getItem('apitoken');
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
  window.location.replace('../HomePage/homePage.html');
}
