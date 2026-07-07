/**
 * Stataccesspage.js
 * Quản lý log truy cập, log đăng ký, và danh sách email cho phép.
 * Yêu cầu: config.js, utils/toast.js, utils/date.js loaded trước.
 */

$(document).ready(function () {
  loadLog();
  loadRegisterLog();
  loadEmailLog();
});

/* ── Log truy cập ────────────────────────────────────────────────── */
function loadLog() {
  apiRequest({ type: 'get', url: '/logs' })
    .then(function (res) {
      var str = (res?.data ?? [])
        .map(function (el) {
          var statusHtml = el.status
            ? '<b style="color:green">' + i18n.t('status.success') + '</b>'
            : '<b style="color:red">' + i18n.t('status.failed') + '</b>';
          return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${el.username}</th>
          <td class="px-6 py-4">${el.role}</td>
          <td class="px-6 py-4">${el.action}</td>
          <td class="px-6 py-4">${formatDate(el.date)}</td>
          <td class="px-6 py-4 flex justify-center">${statusHtml}</td>
        </tr>`;
        })
        .join('');
      $('#access-list').html(str);
    })
    .fail(function (jqXHR) {
      toastError(getErrorMsg(jqXHR));
    });
}

/* ── Log đăng ký ─────────────────────────────────────────────────── */
function loadRegisterLog() {
  apiRequest({ type: 'get', url: '/register-logs' })
    .then(function (res) {
      var str = (res?.data ?? [])
        .map(function (el) {
          return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${el.username}</th>
          <td class="px-6 py-4">${el.role}</td>
          <td class="px-6 py-4">${el.email}</td>
          <td class="px-6 py-4">${formatDate(el.date)}</td>
        </tr>`;
        })
        .join('');
      $('#register-list').html(str);
    })
    .fail(function (jqXHR) {
      toastError(getErrorMsg(jqXHR));
    });
}

/* ── Danh sách email được phép ───────────────────────────────────── */
var temp = [];

function loadEmailLog() {
  apiRequest({ type: 'get', url: '/emails' })
    .then(function (res) {
      temp = res.data;
      var str = (res?.data ?? [])
        .map(function (el, index) {
          return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4">${el.email}</td>
          <td class="px-6 py-4">${el.role}</td>
          <td class="px-6 py-4 flex justify-center">
            <button type="button" data-id="${index}" class="editBtn flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
              <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
              </svg>
            </button>
            <button type="button" data-id="${index}" class="deleteBtn flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 group">
              <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
              </svg>
            </button>
          </td>
        </tr>`;
        })
        .join('');
      $('#email-list').html(str);
      loadAddData();
      loadEditData();
      deleteData();
    })
    .fail(function (jqXHR) {
      toastError(getErrorMsg(jqXHR));
    });
}

/* ── Helper: đóng modal ──────────────────────────────────────────── */
function closeModal() {
  $('#modal').removeClass('opacity-100').addClass('invisible opacity-0');
  setTimeout(function () {
    $('#modal').html('');
    $('.add').removeClass('hidden');
  }, 200);
}

/* ── Thêm email ──────────────────────────────────────────────────── */
function loadAddData() {
  $('.add').on('click', function (e) {
    e.preventDefault();
    $('#modal').html(
      `
      <div class="mb-5 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <form id="addForm">
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label for="emailInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="text" id="emailInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="nguyenvana@gmail.com" required>
            </div>
            <div>
              <label for="roleInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
        i18n.t('label.role') +
        `</label>
              <input type="text" id="roleInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="staff" required>
            </div>
          </div>
        </form>
        <div class="w-full flex justify-between mt-4">
          <button class="closeBtn inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100">` +
        i18n.t('action.cancel') +
        `</button>
          <button form="addForm" type="submit" class="submitAddBtn inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">` +
        i18n.t('action.add') +
        `</button>
        </div>
      </div>
    `
    );
    $('#modal').removeClass('invisible opacity-0').addClass('opacity-100');
    $('.add').addClass('hidden');

    $('.closeBtn').on('click', closeModal);
    addData();
  });
}

function addData() {
  $('.submitAddBtn').on('click', function (e) {
    e.preventDefault();
    var email = $('#emailInput').val().trim();
    var role = $('#roleInput').val().trim();
    if (!email || !role) {
      toastError(i18n.t('toast.fill_all'));
      return;
    }
    apiRequest({ type: 'post', url: '/emails/email', data: { email, role } })
      .then(function () {
        toastSuccess(i18n.t('toast.add_ok')).then(function () {
          closeModal();
          loadEmailLog();
        });
      })
      .fail(function (jqXHR) {
        toastError(getErrorMsg(jqXHR));
      });
  });
}

/* ── Sửa email ───────────────────────────────────────────────────── */
function loadEditData() {
  $('.editBtn').on('click', function (e) {
    e.preventDefault();
    $('.add').addClass('hidden');
    var id = $(this).attr('data-id');
    $('#modal').html(
      `
      <div class="mt-5 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <form id="editForm">
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label for="editEmailInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="text" id="editEmailInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" value="${temp[id]['email']}" required>
            </div>
            <div>
              <label for="editRoleInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
        i18n.t('label.role') +
        `</label>
              <input type="text" id="editRoleInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" value="${temp[id]['role']}" required>
            </div>
          </div>
        </form>
        <div class="w-full flex justify-between mt-4">
          <button class="closeBtn inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100">` +
        i18n.t('action.cancel') +
        `</button>
          <button form="editForm" type="submit" class="submitEditBtn inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">` +
        i18n.t('action.change') +
        `</button>
        </div>
      </div>
    `
    );
    $('#modal').removeClass('invisible opacity-0').addClass('opacity-100');
    $('.closeBtn').on('click', closeModal);
    editData(id);
  });
}

function editData(id) {
  $('.submitEditBtn').on('click', function (e) {
    e.preventDefault();
    var email = $('#editEmailInput').val().trim();
    var role = $('#editRoleInput').val().trim();
    if (!email || !role) {
      toastError(i18n.t('toast.fill_all'));
      return;
    }
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.editing', { name: temp[id]['email'] }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
      cancelButtonText: i18n.t('action.cancel'),
    }).then(function (result) {
      if (!result.isConfirmed) return;
      apiRequest({ type: 'patch', url: '/emails/email', data: { id: temp[id].id, email, role } })
        .then(function () {
          toastSuccess(i18n.t('toast.edit_ok')).then(function () {
            closeModal();
            loadEmailLog();
          });
        })
        .fail(function (jqXHR) {
          toastError(getErrorMsg(jqXHR));
        });
    });
  });
}

/* ── Xóa email ───────────────────────────────────────────────────── */
function deleteData() {
  $('.deleteBtn').on('click', function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.deleting', { name: temp[id]['email'] }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
      cancelButtonText: i18n.t('action.cancel'),
    }).then(function (result) {
      if (!result.isConfirmed) return;
      apiRequest({ type: 'delete', url: '/emails/email?id=' + temp[id]['id'] })
        .then(function () {
          toastSuccess(i18n.t('toast.delete_ok')).then(function () {
            loadEmailLog();
          });
        })
        .fail(function (jqXHR) {
          toastError(getErrorMsg(jqXHR));
        });
    });
  });
}
