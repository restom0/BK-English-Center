/**
 * Navigation.js
 * - Bảo vệ các trang yêu cầu đăng nhập
 * - Hiển thị thông tin user trên nav
 * - Xử lý modal thông tin cá nhân & đăng xuất
 *
 * Yêu cầu (theo thứ tự load):
 *   sweetalert2 → config.js → utils/toast.js → utils/date.js → utils/auth.js → navigation.js
 */

/* ── 1. Bảo vệ trang ─────────────────────────────────────────────── */
guardCurrentPage(); // định nghĩa trong utils/auth.js

/* ── 2. Thông tin user sau khi DOM sẵn sàng ─────────────────────── */
$(document).ready(function () {
  getNavInfo();
  bindSignout();
  injectLangSwitcher();
});

function getNavInfo() {
  if (!getToken()) return; // utils/auth.js

  apiRequest({ type: 'get', url: '/users/info' })
    .then(function (res) {
      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));

      // Header chips
      $('#title-name').html(user.name);
      $('#title-email').html(user.email);

      // Sidebar / dropdown
      const role = getRole();
      const DEFAULT_AVT =
        'https://th.bing.com/th/id/OIP.CVdkzge14K0HJZWZg5DiMQHaHn?pid=ImgDet&rs=1';

      if (role === 'student' || role === 'teacher') {
        $('#user-name').html(user.name);
        $('#user-role').html(role === 'student' ? 'Học viên' : 'Giảng viên');
        $('#user-avt').attr('src', user.image || DEFAULT_AVT);
      }

      bindUserModal(user);
    })
    .fail(function () {
      localStorage.clear();
      window.location.replace('../Loginpage/Login.html');
    });
}

/* ── 3. Modal thông tin cá nhân ──────────────────────────────────── */
/**
 * Một hàm duy nhất bind click #userinfo.
 * Populate #userModal nếu tồn tại (Tailwind layout), ngược lại #userModal1 (Bootstrap layout).
 */
function bindUserModal(user) {
  $('#userinfo').on('click', function (e) {
    e.preventDefault();

    const dob     = toLocalDate(user.dateofbirth); // utils/date.js
    const isMale  = user.sex === 'M';
    const DEFAULT_AVT =
      'https://th.bing.com/th/id/OIP.CVdkzge14K0HJZWZg5DiMQHaHn?pid=ImgDet&rs=1';
    const avatarSrc = user.image || DEFAULT_AVT;

    // ── Tailwind modal ─────────────────────────────────────────────
    if ($('#userModal').length) {
      $('#userModal').html(`
        <div class="col-span-2">
          <form>
            <div class="gap-6 mb-6">
              <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
              <input type="text" id="full_name" disabled
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Nguyễn Văn A" value="${user.name}" required>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Năm sinh</label>
                <input type="date" id="dob" disabled
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value="${dob}" required>
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giới tính</label>
                <div class="flex gap-4 mt-3">
                  <label class="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-300">
                    <input disabled ${isMale ? 'checked' : ''} type="radio" value="M" name="gender-group"
                      class="w-4 h-4 text-blue-600">
                    Nam
                  </label>
                  <label class="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-300">
                    <input disabled ${!isMale ? 'checked' : ''} type="radio" value="F" name="gender-group"
                      class="w-4 h-4 text-blue-600">
                    Nữ
                  </label>
                </div>
              </div>
            </div>
            <div class="gap-6 mb-6">
              <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
              <input disabled type="text" id="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value="${user.address}" required>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                <input disabled type="tel" id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="0912345678" pattern="[0-9]{10}" value="${user.phone}" required>
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ email</label>
                <input type="email" id="email" disabled
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="nguyenvana@company.com" value="${user.email}" required>
              </div>
            </div>
          </form>
        </div>
        <div style="margin-top:2vh;">
          <div class="flex flex-col items-center justify-center w-full h-64 border border-dashed border-gray-300 rounded-lg bg-gray-50 mb-10">
            <img src="${avatarSrc}" alt="avatar" class="max-h-56 object-cover">
            <input disabled id="dropzone-file" type="file" class="hidden">
          </div>
        </div>
      `);
      return;
    }

    // ── Bootstrap modal ────────────────────────────────────────────
    if ($('#userModal1').length) {
      $('#userModal1').html(`
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-auto">
              <form>
                <div class="mb-4">
                  <label for="full_name" class="form-label">Họ và tên</label>
                  <input type="text" id="full_name" disabled class="form-control" value="${user.name}" required>
                </div>
                <div class="row mb-4">
                  <div class="col">
                    <label for="dob" class="form-label">Năm sinh</label>
                    <input type="date" id="dob" disabled class="form-control" value="${dob}" required>
                  </div>
                  <div class="col">
                    <label class="form-label">Giới tính</label>
                    <div class="form-check">
                      <input disabled ${isMale ? 'checked' : ''} type="radio" value="M" name="gender-group" class="form-check-input">
                      <label class="form-check-label">Nam</label>
                    </div>
                    <div class="form-check">
                      <input disabled ${!isMale ? 'checked' : ''} type="radio" value="F" name="gender-group" class="form-check-input">
                      <label class="form-check-label">Nữ</label>
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <label for="address" class="form-label">Địa chỉ</label>
                  <input disabled type="text" id="address" class="form-control" value="${user.address}" required>
                </div>
                <div class="row mb-4">
                  <div class="col">
                    <label for="phone" class="form-label">Số điện thoại</label>
                    <input disabled type="tel" id="phone" class="form-control" pattern="[0-9]{10}" value="${user.phone}" required>
                  </div>
                  <div class="col">
                    <label for="email" class="form-label">Địa chỉ email</label>
                    <input type="email" id="email" disabled class="form-control" value="${user.email}" required>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-sm-4 ml-auto mr-auto">
              <div class="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                <img src="${avatarSrc}" alt="avatar" class="img-fluid">
                <input disabled id="dropzone-file" type="file" class="d-none">
              </div>
            </div>
          </div>
        </div>
      `);
    }
  });
}

/* ── 4. Language switcher ────────────────────────────────────────── */
function injectLangSwitcher() {
  if (typeof i18n === 'undefined') return;

  var current = i18n.getLang();
  var langs   = i18n.getLanguages();

  var buttons = Object.entries(langs).map(function (entry) {
    var code = entry[0], label = entry[1];
    var active = code === current ? ' active' : '';
    return `<button data-lang="${code}" class="bk-lang-btn${active}" title="${label}">${code.toUpperCase()}</button>`;
  }).join('');

  var switcher = `<div id="bk-lang-switcher" class="bk-lang-switcher" style="margin-left:12px;">${buttons}</div>`;

  // Bootstrap navbar: inject after .form-inline
  if ($('.form-inline').length) {
    if (!$('#bk-lang-switcher').length) {
      $('.form-inline').after(switcher);
    }
  }
  // Flowbite sidebar: inject into sidebar bottom (ul.space-y-2 footer)
  else if ($('[data-drawer-target], .sidebar, aside').length) {
    if (!$('#bk-lang-switcher').length) {
      $('body').append(
        `<div id="bk-lang-switcher" class="bk-lang-switcher"
          style="position:fixed;bottom:16px;right:16px;z-index:100;">${buttons}</div>`
      );
    }
  }

  // Bind click
  $(document).on('click', '.bk-lang-btn', function () {
    var lang = $(this).attr('data-lang');
    i18n.setLang(lang);
    $('.bk-lang-btn').removeClass('active');
    $(`.bk-lang-btn[data-lang="${lang}"]`).addClass('active');
  });

  // Re-render on lang change
  $(document).on('i18n:changed', function () {
    var cur = i18n.getLang();
    $('.bk-lang-btn').removeClass('active');
    $(`.bk-lang-btn[data-lang="${cur}"]`).addClass('active');
  });
}

/* ── 5. Đăng xuất ────────────────────────────────────────────────── */
function bindSignout() {
  $('#signout').on('click', function (e) {
    e.preventDefault();
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: 'Bạn đang đăng xuất',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then(function (result) {
      if (result.isConfirmed) {
        toastSuccess('Đăng xuất thành công').then(function () {
          logout(); // utils/auth.js
        });
      }
    });
  });
}
