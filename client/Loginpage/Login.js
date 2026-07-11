if (localStorage.getItem("role")) {
  redirectAfterLogin(localStorage.getItem("role"));
}
$(document).ready(function () {
  login();
});
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function login() {
  $("#login-button").click(function (e) {
    e.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();
    const info = {
      username: username,
      userpassword: password,
    };
    $.ajax({
      type: "get",
      url: API_URL + "/users/user",
      data: info,
      dataType: "JSON",
      success: function (res) {
        if (res.check === true) {
          Toast.fire({
            icon: "success",
            title: "Đăng nhập thành công",
          }).then(() => {
            localStorage.setItem("role", res.role);
            redirectAfterLogin(res.role);
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        Toast.fire({
          icon: "error",
          title: jqXHR.responseJSON.msg,
        });
      },
    });
  });
}
