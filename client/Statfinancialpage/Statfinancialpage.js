/**
 * Statfinancialpage.js
 * Thống kê tài chính: doanh thu, chi trả, tài trợ.
 * Yêu cầu: config.js, utils/toast.js, utils/date.js loaded trước.
 */

var data        = [];
var sponsorData = [];

$(document).ready(function () {
  loadIncome();
  loadOutcome();
  loadSponsor();
  loadAddData();
});

/* ── Bảng tổng hợp (dùng chung data[]) ──────────────────────────── */
function loadData() {
  var total = 0;
  var str = data.map(function (el, index) {
    var statusHtml = el.status === 1 ? '<b style="color:green">' + i18n.t('status.completed') + '</b>' : '<b style="color:red">' + i18n.t('status.not_completed') + '</b>';
    if (el.status === 1) {
      total += (el.type === 'Chi trả') ? -el.amount : el.amount;
    }
    return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td class="px-6 py-4">${index + 1}</td>
      <td class="px-6 py-4">${el.name}</td>
      <td class="px-6 py-4">${el.type}</td>
      <td class="px-6 py-4">${BkCurrency.format(el.amount)}</td>
      <td class="px-6 py-4">${statusHtml}</td>
    </tr>`;
  }).join('');
  $('#listAll').html(str);
  $('#total').html(BkCurrency.format(total));
}

/* ── Doanh thu ───────────────────────────────────────────────────── */
function loadIncome() {
  apiRequest({ type: 'get', url: '/admins/income' })
    .then(function (res) {
      var total = 0;
      var str = res.data.map(function (el, index) {
        data.push({
          name:   el.name + ' ' + i18n.t('outcome.in_class', {class: el.className}).replace('{class}', el.className),
          type:   'Doanh thu',
          amount: el.pay,
          status: el.status,
        });
        if (el.status === 1) total += el.pay;

        var statusHtml = el.status === 1 ? '<b style="color:green">' + i18n.t('status.completed') + '</b>' : '<b style="color:red">' + i18n.t('status.not_completed') + '</b>';
        return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4">${index + 1}</td>
          <td class="px-6 py-4">${el.name}</td>
          <td class="px-6 py-4">${el.className}</td>
          <td class="px-6 py-4">${BkCurrency.format(el.pay)}</td>
          <td class="px-6 py-4">${statusHtml}</td>
        </tr>`;
      }).join('');
      $('#income').html(str);
      $('#totalIncome').html(BkCurrency.format(total));
      loadData();
    });
}

/* ── Chi trả ─────────────────────────────────────────────────────── */
function loadOutcome() {
  apiRequest({ type: 'get', url: '/admins/outcome' })
    .then(function (res) {
      var total = 0;
      var str = res.data.map(function (el, index) {
        var label = el.className === '0' ? el.name : el.name + ' ' + i18n.t('outcome.in_class', {class: el.className}).replace('{class}', el.className);
        data.push({ name: label, type: 'Chi trả', amount: el.prize, status: el.status });
        if (el.status === '0') total += el.prize;  // note: original comparison kept as-is

        var statusHtml = el.status === 1 ? '<b style="color:green">' + i18n.t('status.completed') + '</b>' : '<b style="color:red">' + i18n.t('status.not_completed') + '</b>';
        var classDisplay = el.className === '0' ? i18n.t('label.staff') : el.className;
        return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4">${index + 1}</td>
          <td class="px-6 py-4">${el.name}</td>
          <td class="px-6 py-4">${classDisplay}</td>
          <td class="px-6 py-4">${BkCurrency.format(el.prize)}</td>
          <td class="px-6 py-4">${statusHtml}</td>
        </tr>`;
      }).join('');
      $('#outcome').html(str);
      $('#totalOutcome').html(BkCurrency.format(total));
      loadData();
    });
}

/* ── Tài trợ ─────────────────────────────────────────────────────── */
function loadSponsor() {
  apiRequest({ type: 'get', url: '/sponsors' })
    .then(function (res) {
      var total = 0;
      sponsorData = res.data;
      var str = res.data.map(function (el, index) {
        data.push({ name: el.name, type: 'Tài trợ', amount: el.amount, status: el.status });
        if (el.status === 1) total += el.amount;

        var statusHtml = el.status === 1 ? '<b style="color:green">' + i18n.t('status.completed') + '</b>' : '<b style="color:red">' + i18n.t('status.not_completed') + '</b>';
        return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4">${index + 1}</td>
          <td class="px-6 py-4">${el.name}</td>
          <td class="px-6 py-4">${BkCurrency.format(el.amount)}</td>
          <td class="px-6 py-4">${statusHtml}</td>
          <td class="px-6 py-4 flex justify-center">
            <button type="button" data-id="${index}" data-value="${el.id}"
              class="editBtn flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
              <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
              </svg>
            </button>
            <button type="button" data-id="${index}" data-value="${el.id}"
              class="deleteBtn flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 group">
              <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
              </svg>
            </button>
          </td>
        </tr>`;
      }).join('');
      $('#sponsor').html(str);
      $('#totalSponsor').html(BkCurrency.format(total));
      loadData();
      loadEditData();
      deleteData();
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

/* ── Thêm tài trợ ────────────────────────────────────────────────── */
function loadAddData() {
  $('.add').on('click', function (e) {
    e.preventDefault();
    $('#modal').html(`
      <div class="mb-5 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <form id="addForm">
          <div class="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label for="sponsorInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` + i18n.t('label.sponsor') + `</label>
              <input type="text" id="sponsorInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" placeholder="IELTS" required>
            </div>
            <div>
              <label for="amountInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` + i18n.t('label.amount') + `</label>
              <input type="text" id="amountInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" placeholder="1000000" required>
            </div>
            <div>
              <label for="statusInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` + i18n.t('label.status') + `</label>
              <select id="statusInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" required>
                <option value="">` + i18n.t('select.status') + `</option>
                <option value="0">` + i18n.t('status.not_completed') + `</option>
                <option value="1">` + i18n.t('status.completed') + `</option>
              </select>
            </div>
          </div>
        </form>
        <div class="w-full flex justify-between mt-4">
          <button class="closeBtn px-5 py-2.5 text-sm font-medium text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100">` + i18n.t('action.cancel') + `</button>
          <button form="addForm" type="submit" class="submitAddBtn px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">` + i18n.t('action.add') + `</button>
        </div>
      </div>
    `);
    $('#modal').removeClass('invisible opacity-0').addClass('opacity-100');
    $('.add').addClass('hidden');
    $('.closeBtn').on('click', closeModal);
    addData();
  });
}

function addData() {
  $('.submitAddBtn').on('click', function (e) {
    e.preventDefault();
    var name   = $('#sponsorInput').val().trim();
    var amount = Number($('#amountInput').val());
    var status = Number($('#statusInput').val());
    if (!name || !amount || $('#statusInput').val() === '') {
      toastError(i18n.t('toast.fill_all'));
      return;
    }
    apiRequest({ type: 'post', url: '/sponsors/sponsor', data: { name, amount, status } })
      .then(function () {
        toastSuccess(i18n.t('toast.add_ok')).then(function () {
          closeModal();
          loadSponsor();
        });
      })
      .fail(function (jqXHR) {
        toastError(getErrorMsg(jqXHR));
      });
  });
}

/* ── Sửa tài trợ ─────────────────────────────────────────────────── */
function loadEditData() {
  $('.editBtn').on('click', function (e) {
    e.preventDefault();
    $('.add').addClass('hidden');
    var id        = $(this).attr('data-id');
    var sponsorid = $(this).attr('data-value');
    var sp        = sponsorData[id];
    $('#modal').html(`
      <div class="mt-5 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <form id="editForm">
          <div class="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label for="editName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` + i18n.t('label.sponsor') + `</label>
              <input type="text" id="editName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" value="${sp.name}" required>
            </div>
            <div>
              <label for="editAmount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` + i18n.t('label.amount') + `</label>
              <input type="text" id="editAmount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" value="${sp.amount}" required>
            </div>
            <div>
              <label for="editStatus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` + i18n.t('label.status') + `</label>
              <select id="editStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" required>
                <option value="">` + i18n.t('select.status') + `</option>
                <option value="0" ${sp.status === 0 ? 'selected' : ''}>` + i18n.t('status.not_completed') + `</option>
                <option value="1" ${sp.status === 1 ? 'selected' : ''}>` + i18n.t('status.completed') + `</option>
              </select>
            </div>
          </div>
        </form>
        <div class="w-full flex justify-between mt-4">
          <button class="closeBtn px-5 py-2.5 text-sm font-medium text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100">` + i18n.t('action.cancel') + `</button>
          <button form="editForm" type="submit" class="submitEditBtn px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">` + i18n.t('action.change') + `</button>
        </div>
      </div>
    `);
    $('#modal').removeClass('invisible opacity-0').addClass('opacity-100');
    $('.closeBtn').on('click', closeModal);
    editData(id, sponsorid);
  });
}

function editData(id, sponsorid) {
  $('.submitEditBtn').on('click', function (e) {
    e.preventDefault();
    var name   = $('#editName').val().trim();
    var amount = Number($('#editAmount').val());
    var status = Number($('#editStatus').val());
    if (!name || !amount || $('#editStatus').val() === '') {
      toastError(i18n.t('toast.fill_all'));
      return;
    }
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.editing', {name: sponsorData[id]['name']}),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
      cancelButtonText: i18n.t('action.cancel'),
    }).then(function (result) {
      if (!result.isConfirmed) return;
      apiRequest({ type: 'patch', url: '/sponsors/sponsor', data: { name, amount, status, id: sponsorid } })
        .then(function () {
          toastSuccess(i18n.t('toast.edit_ok')).then(function () {
            closeModal();
            loadSponsor();
            loadData();
          });
        })
        .fail(function (jqXHR) {
          toastError(getErrorMsg(jqXHR));
        });
    });
  });
}

/* ── Xóa tài trợ ─────────────────────────────────────────────────── */
function deleteData() {
  $('.deleteBtn').on('click', function (e) {
    e.preventDefault();
    var id        = $(this).attr('data-id');
    var sponsorid = $(this).attr('data-value');
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.deleting', {name: sponsorData[id]['name']}),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
      cancelButtonText: i18n.t('action.cancel'),
    }).then(function (result) {
      if (!result.isConfirmed) return;
      apiRequest({ type: 'delete', url: '/sponsors/sponsor?id=' + sponsorid })
        .then(function () {
          toastSuccess(i18n.t('toast.delete_ok')).then(function () {
            loadSponsor();
          });
        })
        .fail(function (jqXHR) {
          toastError(getErrorMsg(jqXHR));
        });
    });
  });
}
