$(document).ready(function () {
  loadNav();
});

function loadNav() {
  const role = localStorage.getItem('role');
  if (role === 'student') {
    $('#nav__login').remove();
    BkSecurity.setSafeHtml($('#my-class-link'), 'Khoá học của tôi');

    BkSecurity.setSafeHtml($('#my-page-link'), 'Trang của tôi');
  } else if (role === 'teacher') {
    $('#nav__login').remove();
    BkSecurity.setSafeHtml($('#my-class-link'), 'Lớp học của tôi');
    BkSecurity.setSafeHtml($('#my-page-link'), 'Trang của tôi');
  } else {
    $('#nav__user').remove();
  }
  $('#my-class-link').attr(
    'href',
    typeof routeHref === 'function' ? routeHref('my-courses') : '../pages/public/my-courses/index.html'
  );
  $('#my-page-link').attr(
    'href',
    typeof routeHref === 'function' ? routeHref('my-page') : '../pages/public/my-page/index.html'
  );
}
