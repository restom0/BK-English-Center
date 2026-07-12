let tableData = [];
let teacher = [];
let temp = [];
$.ajax({
  type: 'get',
  url: `${API_URL}/teachers`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
  },
  dataType: 'JSON',
  success: function (res) {
    tableData = res.data;
  },
});
$.ajax({
  type: 'get',
  url: `${API_URL}/teacherjoinclasses`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
  },
  dataType: 'JSON',
  success: function (res) {
    teacher = res.data;
  },
});
$(document).ready(function () {
  loadData();
});
const count = 0;
function loadData() {
  let str = '';
  $.ajax({
    type: 'get',
    url: `${API_URL}/files`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
    },
    dataType: 'JSON',
    success: function (res) {
      temp = res.data;
      (res?.data ?? []).forEach((el, index) => {
        const x = new Object();
        tableData.forEach((item, y) => {
          if (item.id === el.idTeacher) {
            x.email = item.email;
            x.id = y;
            return;
          }
        });
        str += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span class="studentModal" data-id=${x.id}>
                        ${el['TeacherName']}
                    </span>
                </th>
                <td class="px-6 py-4">
                ${el['ClassName']}
                </td>
                <td class="px-6 py-4">
                ${el['fileName']}
                </td>
                <td class="px-6 py-4">
                ${el['filetype']}
                </td>
                <td class="px-6 py-4">
                ${el['fileAmount']}
                </td>
                <td class="px-6 py-4">
                `;
        if (el['fileStatus'] == -1) {
          str += i18n.t('status.not_available');
        } else if (el['fileStatus'] == 0) {
          str += i18n.t('status.available');
        } else if (el['fileStatus'] == 1) {
          str += i18n.t('status.received');
        }
        str += `
                </td>
                <td class="px-6 py-4 flex justify-center">
                <button data-email=${x.email} data-id=${index} data-tooltip-target="notification"
                    class="addWarn flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" `;
        if (el['fileStatus'] == 1) {
          str += 'disabled';
        }
        str += `>
                    <svg class="w-6 h-6 text-gray-500 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 18 19">
                        <path
                            d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                    </svg>
                    <div id="notification" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        ${i18n.t('action.notify_salary')}
        <div class="tooltip-arrow" data-popper-arrow></div>
                </button>
            <button type="button" data-tooltip-target="update"
                class="editBtn flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="${
                  index
                }">
                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 18">
                    <path
                        d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                    <path
                        d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                </svg>
                <div id="update" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        ${i18n.t('action.edit')}
        <div class="tooltip-arrow" data-popper-arrow></div>
            </button>
            <button type="button" data-tooltip-target="delete"
                        class="deleteBtn flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="${
                          index
                        }">
                        <svg class="w-5 h-5 text-gray-500 hover:text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
          </svg>
          <div id="delete" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            ${i18n.t('action.delete')}
            <div class="tooltip-arrow" data-popper-arrow></div>
                    </button>
                </td>
            </tr>`;
        BkSecurity.setSafeHtml('#teacher', str);
      });
      addWarn();
      addModal();
      editModal();
      deleteModal();
      loadStudentModal();
    },
  });
}
function loadStudentModal() {
  $('.studentModal').click(function (e) {
    e.preventDefault();
    let str = '';
    const id = $(this).attr('data-id');
    const dob = new Date(tableData[id].dateofbirth);
    dob.setMinutes(dob.getMinutes() - dob.getTimezoneOffset());
    tableData[id].dateofbirth = dob;
    str += `
        <div class="grid grid-cols-3 gap-4 p-6 mb-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="col-span-2" id="modal1">
        <form>
            <div>
                <div class="gap-6 mb-6">
                    <label for="full_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                          'label.full_name'
                        )}</label>
                    <input disabled type="text" id="full_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=\"${i18n.t('placeholder.person_name')}\" value="${
                          tableData[id]['name']
                        }" required>
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                      'label.dob'
                    )}</label>
                    <input disabled type="date" id="dob"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value=${tableData[id].dateofbirth.toISOString().split('T')[0]}     required>
                </div>
                <div>
                    <label for="gender"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                          'label.gender'
                        )}</label>
                    <div class="flex">`;
    if (tableData[id]['sex'] === 'M') {
      str += `<div class="flex items-center mt-3 mr-4">
                        <input disabled id="inline-radio" type="radio" value="M" name="inline-radio-group"
                            checked class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-radio"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                    </div>
                    <div class="flex items-center mt-3 mr-4">
                        <input disabled id="inline-2-radio" type="radio" value="F" name="inline-radio-group"
                            class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-2-radio"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${i18n.t(
                              'label.female'
                            )}</label>
                    </div>`;
    } else {
      str += `<div class="flex items-center mt-3 mr-4">
                        <input disabled id="inline-radio" type="radio" value="M" name="inline-radio-group"
                             class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-radio"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                    </div>
                    <div class="flex items-center mt-3 mr-4">
                        <input disabled id="inline-2-radio" type="radio" value="F" name="inline-radio-group"
                        checked class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-2-radio"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${i18n.t(
                              'label.female'
                            )}</label>
                    </div>`;
    }
    str += `
                    </div>
                </div>
            </div>
            <div class="gap-6 mb-6">
                <div>
                    <label for="address"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                          'label.address'
                        )}</label>
                    <input disabled type="text" id="address"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" value="${tableData[id]['address']}"required>
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                      'label.phone'
                    )}</label>
                    <input disabled type="tel" id="phone"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0912345678" value="${
                          tableData[id]['phone']
                        }"pattern="[0-9]{10}" required>
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                      'label.email'
                    )}</label>
                    <input disabled type="email" id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="nguyenvana@company.com" value="${
                          tableData[id]['email']
                        }" required>
                </div>
            </div>
        </form>
    </div>
        <div>
        <div>
                <label for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                    <div class="flex flex-col items-center justify-center pt-5 pb-6"style="margin-top: 12vh;" >
                        <img src="https://th.bing.com/th/id/OIP.CVdkzge14K0HJZWZg5DiMQHaHn?pid=ImgDet&rs=1" alt="">
                    </div>
                    <input disabled id="dropzone-file" type="file" class="hidden" />
                </label>
                <button type="submit"
                    class="w-full closeBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" style="margin-top:13vh">
                    <span
                        class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        ${i18n.t('action.cancel')}
                    </span>
                </button>
            </div></div>`;
    BkSecurity.setSafeHtml($('#studentModal'), str);
    $('#studentModal').removeClass('invisible opacity-0');
    $('#studentModal').addClass('opacity-100');
    $('.editModal').removeClass('opacity-100');
    $('.editModal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('.editModal').empty();
    }, 200);
    $('.closeBtn').click(function (e) {
      $('#studentModal').removeClass('opacity-100');
      $('#studentModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('#studentModal').empty();
      }, 200);
    });
  });
}
function addWarn() {
  $('.addWarn').click(function (e) {
    e.preventDefault();
    const id = $(this).attr('data-id');
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.notify_book', { name: tableData[id]['name'] }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'get',
          url: `${API_URL}/sendFile`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
          },
          data: {
            to: tableData[id]['email'],
          },
          dataType: 'JSON',
          success: function (res) {
            Toast.fire({
              icon: 'success',
              title: i18n.t('outcome.notified_ok', { name: tableData[id]['name'] }),
            });
          },
        });
      }
    });
  });
}
function addModal() {
  $('.addBtn').click(function (e) {
    e.preventDefault();
    $('.addBtn').addClass('hidden');
    let str = '';
    str += `
            <div class="gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <form id="form">
                <div class="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <label for="namePay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                              'label.full_name'
                            )}</label>
                            <select id="namePay" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>${i18n.t('select.teacher')}</option>`;
    teacher.forEach((el) => {
      if (el.status !== 1) {
        str += `<option value=${el.idTeacher}>${el.name}</option>`;
      }
    });
    str += `

                            </select>
                    </div>
                    <div>
                        <label for="classPay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                              'label.class'
                            )}</label>
                            <select id="classPay" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>${i18n.t('select.class_alt')}</option>`;
    teacher.forEach((el) => {
      if (el.status !== 1) {
        str += `<option value=${el.idClass}>${el.className}</option>`;
      }
    });
    str += `

                            </select>
                    </div>
                    <div>
                        <label for="pay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                              'label.document'
                            )}</label>
                        <input type="text" id="pay"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cambridge" required>
                    </div>
                    <div>
                        <label for="bookType"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                              'label.doc_type'
                            )}</label>
                        <input type="text" id="bookType"
                            class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ${i18n.t('placeholder.book')} required>
                    </div>
                    <div>
                        <label for="bookNums"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                              'label.quantity'
                            )}</label>
                        <input type="text" id="bookNums"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required>
                    </div>
                    <div>
                    <label for="bookStatus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                      'label.status'
                    )}</label>
                    <select id="bookStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                      <option value="" selected>${i18n.t('select.status')}</option>
                      <option value="-1">${i18n.t('status.not_available')}</option>
                      <option value="0">${i18n.t('status.available')}</option>
                      <option value="1">${i18n.t('status.received')}</option>
                    </select>
                    </div>
                </div>
                </form>
        <div style="margin-top: 4vh;">
            <div class="w-full flex justify-between">
                <button type="submit"
                    class="closeBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span
                        class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        ${i18n.t('action.cancel')}
                    </span>
                </button>
                <button form="form" type="submit"
                    class="submitAddBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 hover:text-white">
                    <span
                        class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        ${i18n.t('action.add')}
                    </span>
                </button>
                </div>
            </div>
        </div>
        </div>
        `;
    BkSecurity.setSafeHtml($('.editModal'), str);
    $('.editModal').removeClass('invisible opacity-0');
    $('.editModal').addClass('opacity-100');
    $('#studentModal').removeClass('opacity-100');
    $('#studentModal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('#studentModal').empty();
    }, 200);
    $('.closeBtn').click(function (e) {
      $('.editModal').removeClass('opacity-100');
      $('.editModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('.editModal').empty();
        $('.addBtn').removeClass('hidden');
      }, 200);
    });
    addBook();
  });
}
function addBook() {
  $('.submitAddBtn').click(function (e) {
    e.preventDefault();
    const name = $('#namePay').val();
    const bookName = $('#pay').val();
    const bookClass = $('#classPay').val();
    const bookType = $('#bookType').val();
    const bookNums = $('#bookNums').val();
    const status = $('#bookStatus').val();
    if (!name || name == '') {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.select_teacher'),
      });
    } else if (bookName == '') {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.enter_book'),
      });
    } else if (bookClass == '') {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.select_class'),
      });
    } else if (bookNums == '') {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.select_qty'),
      });
    } else if (bookStatus == '') {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.select_status'),
      });
    } else if (name === bookClass) {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.select_status'),
      });
    } else {
      $.ajax({
        type: 'post',
        url: `${API_URL}/files/file`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
        },
        data: {
          idTeacher: name,
          idClass: bookClass,
          fileName: bookName,
          filetype: bookType,
          fileAmount: bookNums,
          fileStatus: status,
        },
        dataType: 'JSON',
        success: function (res) {
          Toast.fire({
            icon: 'success',
            title: i18n.t('toast.add_ok'),
          }).then(() => {
            $('.editModal').removeClass('opacity-100');
            $('.editModal').addClass('invisible opacity-0');
            setTimeout(function () {
              $('.editModal').empty();
              $('.addBtn').removeClass('hidden');
            }, 200);
            loadData();
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          Toast.fire({
            icon: 'error',
            title: jqXHR.responseJSON?.msg ?? 'Lỗi kết nối máy chủ',
          });
        },
      });
    }
  });
  $('.closeBtn').click(function (e) {
    $('.editModal').removeClass('opacity-100');
    $('.editModal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('.editModal').empty();
      $('.addBtn').removeClass('hidden');
    }, 200);
  });
}
function editModal() {
  $('.editBtn').click(function (e) {
    e.preventDefault();
    $('.addBtn').addClass('hidden');
    const id = $(this).attr('data-id');
    let str = '';
    str += `
            <div class="gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <form id="form">
                <div class="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <label for="namePay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                              'label.full_name'
                            )}</label>
                        <input type="text" id="namePay" disabled
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=\"${i18n.t('placeholder.person_name')}\" value="${
                              temp[id]['TeacherName']
                            }"
                            required>
                    </div>
                    <div>
                        <label for="classPay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                              'label.class'
                            )}</label>
                        <input type="text" id="classPay" disabled
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="IELTS 1" value="${temp[id]['ClassName']}" required>
                    </div>
                    <div>
                        <label for="pay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                              'label.document'
                            )}</label>
                        <input type="text" id="pay"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                              temp[id]['fileName']
                            }" required>
                    </div>
                    <div>
                        <label for="bookType"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                              'label.doc_type'
                            )}</label>
                        <input type="text" id="bookType"
                            class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                              temp[id]['filetype']
                            }" required>
                    </div>
                    <div>
                        <label for="bookNums"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                              'label.quantity'
                            )}</label>
                        <input type="text" id="bookNums"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                              temp[id]['fileAmount']
                            }" required>
                    </div>
                    <div>
                    <label for="bookStatus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                      'label.status'
                    )}</label>
                    <select id="bookStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                      <option value="">${i18n.t('select.status')}</option>
                      <option value="-1"`;
    if (temp[id]['fileStatus'] == -1) {
      str += 'selected';
    }
    str += `>${i18n.t('status.not_available')}</option>
                      <option value="0"`;
    if (temp[id]['fileStatus'] == 0) {
      str += 'selected';
    }
    str += `>${i18n.t('status.available')}</option>
                      <option value="1"`;
    if (temp[id]['fileStatus'] == 1) {
      str += 'selected';
    }
    str += `>${i18n.t('status.received')}</option>
                    </select>
                    </div>
                </div>
                </form>
        <div style="margin-top: 4vh;">
            <div class="w-full flex justify-between">
                <button type="submit"
                    class="closeBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span
                        class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        ${i18n.t('action.cancel')}
                    </span>
                </button>
                <button form="form" type="submit" data-id=${temp[id].id}
                    class="submitEditBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 hover:text-white">
                    <span
                        class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        ${i18n.t('action.change')}
                    </span>
                </button>
                </div>
            </div>
        </div>
        </div>
        `;
    BkSecurity.setSafeHtml($('.editModal'), str);
    $('.editModal').removeClass('invisible opacity-0');
    $('.editModal').addClass('opacity-100');
    $('#studentModal').removeClass('opacity-100');
    $('#studentModal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('#studentModal').empty();
    }, 200);
    $('.closeBtn').click(function (e) {
      $('.editModal').removeClass('opacity-100');
      $('.editModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('.editModal').empty();
        $('.addBtn').removeClass('hidden');
      }, 200);
    });
    editBook(id);
  });
}
function editBook(id) {
  $('.submitEditBtn').click(function (e) {
    e.preventDefault();
    const bookName = $('#pay').val();
    const bookType = $('#bookType').val();
    const bookNums = $('#bookNums').val();
    const status = $('#bookStatus').val();
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.editing', { name: temp[id]['TeacherName'] }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'patch',
          url: `${API_URL}/files/file`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
          },
          data: {
            id: $(this).attr('data-id'),
            fileName: bookName,
            filetype: bookType,
            fileAmount: bookNums,
            fileStatus: status,
          },
          dataType: 'JSON',
          success: function (res) {
            Toast.fire({
              icon: 'success',
              title: i18n.t('toast.edit_ok'),
            }).then(() => {
              $('.editModal').removeClass('opacity-100');
              $('.editModal').addClass('invisible opacity-0');
              setTimeout(function () {
                $('.editModal').empty();
                $('.addBtn').removeClass('hidden');
              }, 200);
              loadData();
            });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            Toast.fire({
              icon: 'error',
              title: jqXHR.responseJSON?.msg ?? 'Lỗi kết nối máy chủ',
            });
          },
        });
      }
    });
  });
  $('.closeBtn').click(function (e) {
    $('.editModal').removeClass('opacity-100');
    $('.editModal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('.editModal').empty();
      $('.addBtn').removeClass('hidden');
    }, 200);
  });
}
function deleteModal() {
  $('.deleteBtn').click(function (e) {
    e.preventDefault();
    const id = $(this).attr('data-id');
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.deleting', { name: tableData[id]['name'] }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        Toast.fire({
          icon: 'success',
          title: i18n.t('toast.delete_ok'),
        }).then(() => {
          tableData.splice(id, 1);
          loadData();
        });
      }
    });
  });
}
