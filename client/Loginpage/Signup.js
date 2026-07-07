function toggleAuthenticationCode() {
  if (
    $("#floating_roles").val() === "staff" ||
    $("#floating_roles").val() === "admin"
  ) {
    $("#authentication-code").removeClass("hidden");
  } else {
    $("#authentication-code").addClass("hidden");
  }
}

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
$(document).ready(function () {
  register();
  toggleAuthenticationCode();
});
function register() {
  $("#sendMail").click(function (e) {
    e.preventDefault();
    var email = $("#floating_email").val();
    var role = $("#floating_roles").val();
    if (!email) {
      Toast.fire({
        icon: "error",
        title: "Hãy nhập email",
      });
    } else if (!role) {
      Toast.fire({
        icon: "error",
        title: "Hãy nhập vai trò",
      });
    } else {
      $.ajax({
        type: "get",
        url: API_URL + "/sendMail?to=" + email + "&role=" + role,
        dataType: "JSON",
        success: function (res) {
          if (res.check === true) {
            Toast.fire({
              icon: "success",
              title: "Hãy kiểm tra hộp email của bạn",
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
    }
  });
  $("#register-button").click(function (e) {
    e.preventDefault();
    var username = $("#floating_loginname").val();
    var password = $("#floating_password").val();
    var repeatPassword = $("#floating_repeat_password").val();
    var name = $("#floating_name").val();
    var birthday = $("#floating_birthday").val();
    var gender = $("#gender").val();
    var address = $("#floating_address").val();
    var phone = $("#floating_phone").val();
    var email = $("#floating_email").val();
    var role = $("#floating_roles").val();
    var key = $("#floating_identified").val();
    if (!username || username == "") {
      Toast.fire({
        icon: "error",
        title: "Hãy nhập tài khoản",
      });
    } else if (!password || password == "") {
      Toast.fire({
        icon: "error",
        title: "Hãy nhập mật khẩu",
      });
    } else if (!repeatPassword || repeatPassword == "") {
      Toast.fire({
        icon: "error",
        title: "Hãy nhập mật khẩu lần 2",
      });
    } else if (!name || name == "") {
      Toast.fire({
        icon: "error",
        title: "Hãy nhập tên bạn",
      });
    } else if (!birthday || birthday == "") {
      Toast.fire({
        icon: "error",
        title: "Hãy nhập ngày sinh",
      });
    } else if (!gender || gender == "") {
      Toast.fire({
        icon: "error",
        title: "Hãy chọn giới tính",
      });
    } else if (!address || address == "") {
      Toast.fire({
        icon: "error",
        title: "Hãy nhập địa chỉ",
      });
    } else if (!phone || phone == "") {
      Toast.fire({
        icon: "error",
        title: "Hãy nhập số điện thoại",
      });
    } else if (!email || email == "") {
      Toast.fire({
        icon: "error",
        title: "Hãy nhập địa chỉ email",
      });
    } else if (!role || role == "") {
      Toast.fire({
        icon: "error",
        title: "Hãy chọn vai trò",
      });
    } else if (password !== repeatPassword) {
      Toast.fire({
        icon: "error",
        title: "Hai mật khẩu không giống nhau",
      });
    } else {
      $.ajax({
        type: "post",
        url: API_URL + "/users/user",
        headers: {
          Authorization: "Bearer " + key,
        },
        data: {
          username: username,
          userpassword: password,
          name: name,
          email: email,
          dob: birthday,
          sex: gender,
          address: address,
          phone: phone,
          role: role,
        },
        dataType: "JSON",
        success: function (res) {
          console.log(res);
          if (res.check === true) {
            Toast.fire({
              icon: "success",
              title: "Đăng ký thành công",
            }).then(() => {
              window.location.replace("./Login.html");
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
    }
  });
}
