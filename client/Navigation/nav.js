$(document).ready(function () {
  loadNav();
});

function loadNav() {
  const role = localStorage.getItem("role");
  if (role === "student") {
    $("#nav__login").remove();
    $("#my-class-link").html("Khoá học của tôi");

    $("#my-page-link").html("Trang của tôi");
  } else if (role === "teacher") {
    $("#nav__login").remove();
    $("#my-class-link").html("Lớp học của tôi");
    $("#my-page-link").html("Trang của tôi");
  } else {
    $("#nav__user").remove();
  }
  $("#my-class-link").attr("href", "../MyCourses/myCourses.html");
  $("#my-page-link").attr("href", "../MyPage/myPage.html");
}
