// classData: flat array (mỗi phần tử đã có countStudent từ server)
let classData;
let courseData;

$(document).ready(function () {
  loadData();
  loadAddData();
});

function loadData() {
  // Load courses cho dropdown
  apiRequest({
    type: 'get',
    url: '/courses',
    success: function (res) {
      courseData = res.data;
    },
  });

  // Load classes - API giờ trả flat array, mỗi class có countStudent sẵn
  apiRequest({
    type: 'get',
    url: '/classes',
    success: function (res) {
      classData = res.data;
      const rows = res.data.map(function (el, index) {
        return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4">${el.name}</td>
          <td class="px-6 py-4">${el.courseName}</td>
          <td class="px-6 py-4">${el.countStudent}</td>
          <td class="px-6 py-4">${el.maxStudent}</td>
          <td class="px-6 py-4">${el.schedule}</td>
          <td class="px-6 py-4">${el.address}</td>
          <td class="px-6 py-4">${formatDate(el.startDate)}</td>
          <td class="px-6 py-4">${formatDate(el.endDate)}</td>
          <td class="px-6 py-4 flex justify-center">
            <button type="button" data-id="${index}" data-tooltip-target="update"
              class="editBtn flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
              </svg>
              <div id="update" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                ${i18n.t('action.edit')}<div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </button>
            <button type="button" data-tooltip-target="delete"
              class="deleteBtn flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="${index}">
              <svg class="w-5 h-5 text-gray-500 hover:text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
              </svg>
              <div id="delete" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                ${i18n.t('action.delete')}<div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </button>
          </td>
        </tr>`;
      });
      BkSecurity.setSafeHtml($('#class'), rows.join(''));
      loadEditData();
      deleteData();
    },
    error: function (jqXHR) {
      Toast.fire({
        icon: 'error',
        title: jqXHR.responseJSON?.msg || i18n.t('validate.load_error'),
      });
    },
  });
}

function buildCourseOptions(selectedName) {
  return courseData
    .map(function (el) {
      const selected = el.name === selectedName ? 'selected' : '';
      return `<option value="${el.id}" ${selected}>${el.name}</option>`;
    })
    .join('');
}

function loadAddData() {
  $('.addModal').click(function (e) {
    e.preventDefault();
    $('.addModal').addClass('hidden');
    const str = `
      <div class="gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <form id="addForm">
          <div class="grid gap-6 mb-6 md:grid-cols-4">
            <div>
              <label for="className" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.class_name')}</label>
              <input type="text" id="className" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="IELTS1" required>
            </div>
            <div>
              <label for="courseName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.course')}</label>
              <select id="courseName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">${i18n.t('select.course')}</option>
                ${buildCourseOptions('')}
              </select>
            </div>
            <div>
              <label for="maxStudent" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.max_students')}</label>
              <input type="number" id="maxStudent" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="30" required>
            </div>
            <div>
              <label for="schedule" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.schedule')}</label>
              <input type="text" id="schedule" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" ${i18n.t('placeholder.schedule')} required>
            </div>
            <div>
              <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.branch')}</label>
              <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" ${i18n.t('placeholder.branch')} required>
            </div>
            <div>
              <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.start_date')}</label>
              <input type="date" id="startDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
            </div>
            <div>
              <label for="endDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.end_date')}</label>
              <input type="date" id="endDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
            </div>
          </div>
        </form>
        <div class="mt-6 w-full flex justify-between">
          <button class="closeBtn px-5 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">${i18n.t('action.cancel')}</button>
          <button form="addForm" type="submit" class="submitAddBtn px-5 py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600">${i18n.t('action.add')}</button>
        </div>
      </div>`;
    BkSecurity.setSafeHtml($('#addModal'), str);
    $('#addModal').removeClass('invisible opacity-0').addClass('opacity-100');

    $('.closeBtn').click(function () {
      closeModal('#addModal');
    });
    addData();
  });
}

function addData() {
  $('.submitAddBtn').click(function (e) {
    e.preventDefault();
    const payload = {
      name: $('#className').val(),
      idCourse: $('#courseName').val(),
      schedule: $('#schedule').val(),
      maxStudent: Number.parseInt($('#maxStudent').val(), 10),
      startDate: new Date($('#startDate').val()),
      endDate: new Date($('#endDate').val()),
      address: $('#address').val(),
    };
    if (
      Object.values(payload).some(function (v) {
        return !v;
      })
    ) {
      Toast.fire({ icon: 'error', title: i18n.t('toast.fill_all') });
      return;
    }
    apiRequest({
      type: 'post',
      url: '/classes/class',
      data: payload,
      success: function () {
        Toast.fire({ icon: 'success', title: i18n.t('toast.add_ok') }).then(function () {
          closeModal('#addModal');
          loadData();
        });
      },
      error: function (jqXHR) {
        Toast.fire({ icon: 'error', title: jqXHR.responseJSON?.msg });
      },
    });
  });
}

function loadEditData() {
  $('.editBtn').click(function (e) {
    e.preventDefault();
    const id = Number.parseInt($(this).attr('data-id'), 10);
    const cls = classData[id];
    const startdate = toLocalDate(cls.startDate);
    const enddate = toLocalDate(cls.endDate);

    const str = `
      <div class="mt-5 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <form id="editForm">
          <div class="grid gap-6 mb-6 md:grid-cols-4">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.class_name')}</label>
              <input type="text" id="className" data-value="${cls.name}"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value="${cls.name}" required>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.course')}</label>
              <select id="courseName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                ${buildCourseOptions(cls.courseName)}
              </select>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.max_students')}</label>
              <input type="number" id="maxStudent" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value="${cls.maxStudent}" required>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.schedule')}</label>
              <input type="text" id="schedule" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value="${cls.schedule}" required>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.branch')}</label>
              <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value="${cls.address}" required>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.start_date')}</label>
              <input type="date" id="startDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value="${startdate}" required>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.end_date')}</label>
              <input type="date" id="endDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value="${enddate}" required>
            </div>
          </div>
        </form>
        <div class="mt-6 w-full flex justify-between">
          <button class="closeBtn px-5 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">${i18n.t('action.cancel')}</button>
          <button form="editForm" type="submit" class="submitEditBtn px-5 py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600">${i18n.t('action.save')}</button>
        </div>
      </div>`;

    BkSecurity.setSafeHtml($('#editModal'), str)
      .removeClass('invisible opacity-0')
      .addClass('opacity-100');
    $('.closeBtn').click(function () {
      closeModal('#editModal');
    });
    editData(id);
  });
}

function editData(id) {
  $('.submitEditBtn').click(function (e) {
    e.preventDefault();
    const cls = classData[id];
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('outcome.class_edit', { name: cls.name, course: cls.courseName }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then(function (result) {
      if (!result.isConfirmed) return;
      apiRequest({
        type: 'patch',
        url: '/classes/class',
        data: {
          name: $('#className').val(),
          idCourse: $('#courseName').val(),
          schedule: $('#schedule').val(),
          maxStudent: Number.parseInt($('#maxStudent').val(), 10),
          startDate: $('#startDate').val(),
          endDate: $('#endDate').val(),
          address: $('#address').val(),
          oldname: $('#className').attr('data-value'),
        },
        success: function () {
          Toast.fire({ icon: 'success', title: i18n.t('toast.edit_ok') }).then(function () {
            closeModal('#editModal');
            loadData();
          });
        },
        error: function (jqXHR) {
          Toast.fire({ icon: 'error', title: jqXHR.responseJSON?.msg });
        },
      });
    });
  });
}

function deleteData() {
  $('.deleteBtn').click(function (e) {
    e.preventDefault();
    const id = Number.parseInt($(this).attr('data-id'), 10);
    const cls = classData[id];
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('outcome.class_delete', { name: cls.name, course: cls.courseName }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then(function (result) {
      if (!result.isConfirmed) return;
      apiRequest({
        type: 'delete',
        url: `/classes/class?name=${encodeURIComponent(cls.name)}`,
        success: function () {
          Toast.fire({ icon: 'success', title: i18n.t('toast.delete_ok') }).then(function () {
            loadData();
          });
        },
        error: function (jqXHR) {
          Toast.fire({ icon: 'error', title: jqXHR.responseJSON?.msg });
        },
      });
    });
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(date) {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function toLocalDate(dateStr) {
  const d = new Date(dateStr);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
}

function closeModal(selector) {
  $(selector).removeClass('opacity-100').addClass('invisible opacity-0');
  setTimeout(function () {
    $('.addModal').removeClass('hidden');
    $(selector).empty();
  }, 200);
}
