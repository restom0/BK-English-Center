var count = 0; // attendance toggle counter

var tableData = [];
var temp = [];
var nullClass = [];
$.ajax({
  type: 'get',
  url: API_URL + '/students',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('apitoken'),
  },
  dataType: 'JSON',
  success: function (res) {
    tableData = res.data;
  },
});

$(document).ready(function () {
  loadData();
  addModal();
});

function loadData() {
  $.ajax({
    type: 'get',
    url: API_URL + '/studentjoinclasses/date',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('apitoken'),
    },
    dataType: 'JSON',
    success: function (res) {
      nullClass = res.data;
    },
  });
  var str = '';
  $.ajax({
    type: 'get',
    url: API_URL + '/studentjoinclasses',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('apitoken'),
    },
    dataType: 'JSON',
    success: function (res) {
      var str = '';
      temp = res.data;
      (res?.data ?? []).forEach((el, index) => {
        let x = new Object();
        tableData.forEach((item, y) => {
          if (item.id === el.idStudent) {
            x.email = item.email;
            x.id = y;
            return;
          }
        });
        str +=
          `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <span class="modal" data-id=` +
          x.id +
          `>
                                ` +
          el['name'] +
          `
                            </span>
                        </th>
                        <td class="px-6 py-4">
                        ` +
          el['className'] +
          `
                        </td>
                        <td class="px-6 py-4">
                        `;
        if (el['status'] == 1) {
          str += i18n.t('status.studied');
        }
        if (el['status'] == 0) {
          str += i18n.t('status.studying');
        } else if (el['status'] == -1) {
          str += i18n.t('status.not_studied');
        }
        str +=
          `
                        </td><td class="px-6 py-4">
                        ` +
          el['teacherName'] +
          `
                        </td>
                        <td class="px-6 py-4">
                        ` +
          el['attendDate'] +
          `
                        </td>
                        <td class="px-6 py-4 ">
                        `;
        if (el['status'] == 1) {
          str +=
            `<button data-tooltip-target="attend" disabled data-id=` +
            index +
            `
            class="addCheck mx-auto p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="text-center w-6 h-6 text-gray-100 dark:text-white flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
            </svg>
            <div id="attend" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    ` +
            i18n.t('action.mark') +
            `
    <div class="tooltip-arrow" data-popper-arrow></div>
        </button>
        <button data-tooltip-target="warning" disabled
            class="mx-auto p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span
                class="material-symbols-outlined text-center w-6 h-6 text-gray-100 dark:text-white flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                priority_high
            </span>
            <div id="warning" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    ` +
            i18n.t('action.warn') +
            `
    <div class="tooltip-arrow" data-popper-arrow></div>
        </button>
        <button data-tooltip-target="update" type="button"
                class="editBtn p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="` +
            index +
            `">
                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 18">
                    <path
                        d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                    <path
                        d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                </svg>
                <div id="update" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    ` +
            i18n.t('action.edit') +
            `
    <div class="tooltip-arrow" data-popper-arrow></div>
            </button>
    </td>
</tr>`;
        } else {
          str +=
            `<button data-tooltip-target="attend" data-id=` +
            index +
            `
            class="addCheck mx-auto p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="text-center w-6 h-6 text-gray-100 dark:text-white flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
            </svg>
            <div id="attend" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    ` +
            i18n.t('action.mark') +
            `
    <div class="tooltip-arrow" data-popper-arrow></div>
</div>
        </button>
        <button data-tooltip-target="warning" data-email=` +
            x.email +
            ` data-id=` +
            index +
            `
            class="addWarn mx-auto p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span
                class="material-symbols-outlined text-center w-6 h-6 text-gray-100 dark:text-white flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                priority_high
            </span>
            <div id="warning" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    ` +
            i18n.t('action.warn') +
            `
    <div class="tooltip-arrow" data-popper-arrow></div>
        </button>
        <button data-tooltip-target="update" type="button"
                class="editBtn p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="` +
            index +
            `">
                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 18">
                    <path
                        d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                    <path
                        d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                </svg>
                <div id="update" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    ` +
            i18n.t('action.edit') +
            `
    <div class="tooltip-arrow" data-popper-arrow></div>
            </button>
    </td>
</tr>`;
        }
      });
      $('#student').html(str);
      addCheck();
      addWarn();
      editModal();
      $('.modal').click(function (e) {
        e.preventDefault();
        var str = '';
        var id = $(this).attr('data-id');
        let dob = new Date(tableData[id].dateofbirth);
        dob.setMinutes(dob.getMinutes() - dob.getTimezoneOffset());
        tableData[id].dateofbirth = dob;
        str +=
          `<div class="mb-5 grid grid-cols-3 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="col-span-2" id="modal1">
            <form>
                <div>
                    <div class="gap-6 mb-6">
                        <label for="full_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
          i18n.t('label.full_name') +
          `</label>
                        <input disabled type="text" id="full_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=\"${i18n.t('placeholder.person_name')}\" value="` +
          tableData[id]['name'] +
          `" required>
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
          i18n.t('label.dob') +
          `</label>
                        <input disabled type="date" id="dob"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value=` +
          tableData[id].dateofbirth.toISOString().split('T')[0] +
          `     required>
                    </div>
                    <div>
                        <label for="gender"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
          i18n.t('label.gender') +
          `</label>
                        <div class="flex">`;
        if (tableData[id]['sex'] === 'M') {
          str +=
            `<div class="flex items-center mt-3 mr-4">
                            <input disabled id="inline-radio" type="radio" value="M" name="inline-radio-group"
                                checked class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="inline-radio"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                        </div>
                        <div class="flex items-center mt-3 mr-4">
                            <input disabled id="inline-2-radio" type="radio" value="F" name="inline-radio-group"
                                class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="inline-2-radio"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">` +
            i18n.t('label.female') +
            `</label>
                        </div>`;
        } else {
          str +=
            `<div class="flex items-center mt-3 mr-4">
                            <input disabled id="inline-radio" type="radio" value="M" name="inline-radio-group"
                                 class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="inline-radio"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                        </div>
                        <div class="flex items-center mt-3 mr-4">
                            <input disabled id="inline-2-radio" type="radio" value="F" name="inline-radio-group"
                            checked class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="inline-2-radio"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">` +
            i18n.t('label.female') +
            `</label>
                        </div>`;
        }
        str +=
          ` 
                        </div>
                    </div>
                </div>
                <div class="gap-6 mb-6">
                    <div>
                        <label for="address"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
          i18n.t('label.address') +
          `</label>
                        <input disabled type="text" id="address"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="" value="` +
          tableData[id]['address'] +
          `"required>
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
          i18n.t('label.phone') +
          `</label>
                        <input disabled type="tel" id="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0912345678" value="` +
          tableData[id]['phone'] +
          `"pattern="[0-9]{10}" required>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
          i18n.t('label.email') +
          `</label>
                        <input disabled type="email" id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="nguyenvana@company.com" value="` +
          tableData[id]['email'] +
          `" required>
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
        <div>
        <button type="submit"
                        class="w-full closeBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" style="margin-top:20vh">
                        <span
                            class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            ` +
          i18n.t('action.cancel') +
          `
                        </span>
                    </button>
        </div>
                </div></div>`;
        $('#modal').html(str);
        $('#modal').removeClass('invisible opacity-0');
        $('#modal').addClass('opacity-100');
        $('#editModal').removeClass('opacity-100');
        $('#editModal').addClass('invisible opacity-0');
        setTimeout(function () {
          $('#editModal').html('');
        }, 200);
        $('.closeBtn').click(function (e) {
          $('#modal').removeClass('opacity-100');
          $('#modal').addClass('invisible opacity-0');
          setTimeout(function () {
            $('#modal').html('');
          }, 200);
        });
      });
    },
  });
}
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day} /${month}/${year} `;
}

function addCheck() {
  $('.addCheck').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.marking', { name: temp[id]['name'] }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'patch',
          url: API_URL + '/studentjoinclasses/date',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('apitoken'),
          },
          data: {
            id: temp[id].id,
            idClass: temp[id].idClass,
            attendDate: temp[id].attendDate + 1,
          },
          dataType: 'JSON',
          success: function (res) {
            Toast.fire({
              icon: 'success',
              title: i18n.t('outcome.marked_ok', { name: temp[id]['name'] }),
            }).then(() => {
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
}
function addWarn() {
  $('.addWarn').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var email = tableData[id]['email'];
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.warning_msg', { name: tableData[id]['name'] }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'get',
          url: API_URL + '/sendWarning',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('apitoken'),
          },
          data: {
            to: email,
          },
          dataType: 'JSON',
          success: function (res) {
            Toast.fire({
              icon: 'success',
              title: i18n.t('outcome.warned_ok', { name: tableData[id]['name'] }),
            });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            Toast.fire({
              icon: 'error',
              title: i18n.t('toast.send_fail'),
            });
          },
        });
      }
    });
  });
}
function addModal() {
  $('.add').click(function (e) {
    e.preventDefault();
    $('.add').addClass('hidden');
    var id = $(this).attr('data-id');
    var str = '';
    str +=
      `
            <div class="gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <form id="form">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
      i18n.t('label.full_name') +
      `</label>
                            <select id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>` +
      i18n.t('select.student') +
      `</option>`;
    tableData.forEach((el) => {
      str += `<option value=` + el.id + `>` + el.name + `</option>`;
    });
    str +=
      `
                            
                            </select>
                    </div>
                    <div>
                        <label for="class"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
      i18n.t('label.class') +
      `</label>
                            <select id="class" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>` +
      i18n.t('select.class_alt') +
      `</option>`;
    nullClass.forEach((el) => {
      str += `<option value=` + el.id + `>` + el.name + `</option>`;
    });
    str +=
      `
                            
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
                        ` +
      i18n.t('action.cancel') +
      `
                    </span>
                </button>
                <button form="form" type="submit"
                    class="submitAddBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 hover:text-white">
                    <span
                        class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        ` +
      i18n.t('action.add') +
      `
                    </span>
                </button>
                </div>
            </div>
        </div>
        </div>
        `;
    $('#editModal').html(str);
    $('#editModal').removeClass('invisible opacity-0');
    $('#editModal').addClass('opacity-100');
    $('#modal').removeClass('opacity-100');
    $('#modal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('#modal').html('');
    }, 200);
    $('.closeBtn').click(function (e) {
      $('#editModal').removeClass('opacity-100');
      $('#editModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('#editModal').html('');
      }, 200);
    });
    addDate();
  });
}
function addDate() {
  $('.submitAddBtn').click(function (e) {
    e.preventDefault();
    var name = $('#name').val();
    var className = $('#class').val();
    if (!name || name === '') {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.enter_name'),
      });
    }
    if (!className || className === '') {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.enter_class'),
      });
    } else {
      $.ajax({
        type: 'post',
        url: API_URL + '/studentjoinclasses/class',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('apitoken'),
        },
        data: {
          idStudent: name,
          idClass: className,
        },
        dataType: 'JSON',
        success: function (res) {
          Toast.fire({
            icon: 'success',
            title: i18n.t('toast.add_ok'),
          }).then(() => {
            loadData();
            $('#editModal').removeClass('opacity-100');
            $('#editModal').addClass('invisible opacity-0');
            setTimeout(function () {
              $('.add').removeClass('hidden');
              $('#editModal').html('');
            }, 200);
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
    $('#editModal').removeClass('opacity-100');
    $('#editModal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('.add').removeClass('hidden');
      $('#editModal').html('');
    }, 200);
  });
}
function editModal() {
  $('.editBtn').click(function (e) {
    e.preventDefault();
    $('.add').addClass('hidden');
    var id = $(this).attr('data-id');
    var str = '';
    str +=
      `
            <div class="gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <form id="form">
                <div class="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <label for="namePay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
      i18n.t('label.full_name') +
      `</label>
                        <input type="text" id="namePay" disabled
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=\"${i18n.t('placeholder.person_name')}\" value="` +
      temp[id]['name'] +
      `"
                            required>
                    </div>
                    <div>
                        <label for="classPay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
      i18n.t('label.class') +
      `</label>
                        <input disabled type="text" id="classPay"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="IELTS 1" value="` +
      temp[id]['className'] +
      `" required>
                    </div>
                    <div>
                        <label for="pay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
      i18n.t('label.sessions') +
      `</label>
                        <input type="text" id="pay"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="` +
      temp[id]['attendDate'] +
      `" required>
                    </div>
                    <div>
                        <label for="status"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">` +
      i18n.t('label.status') +
      `</label>
                            <select id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="-1" ` +
      (temp[id]['status'] === -1 ? 'selected' : '') +
      `>` +
      i18n.t('status.not_studied') +
      `</option>
                            <option value="0" ` +
      (temp[id]['status'] === 0 ? 'selected' : '') +
      `>` +
      i18n.t('status.studying') +
      `</option>
                            <option value="1" ` +
      (temp[id]['status'] === 1 ? 'selected' : '') +
      `>` +
      i18n.t('status.studied') +
      `</option>
                            
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
                        ` +
      i18n.t('action.cancel') +
      `
                    </span>
                </button>
                <button form="form" type="submit"
                    class="submitEditBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 hover:text-white">
                    <span
                        class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        ` +
      i18n.t('action.change') +
      `
                    </span>
                </button>
                </div>
            </div>
        </div>
        </div>
        `;
    $('#editModal').html(str);
    $('#editModal').removeClass('invisible opacity-0');
    $('#editModal').addClass('opacity-100');
    $('#modal').removeClass('opacity-100');
    $('#modal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('#modal').html('');
    }, 200);
    $('.closeBtn').click(function (e) {
      $('#editModal').removeClass('opacity-100');
      $('#editModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('#editModal').html('');
      }, 200);
    });
    editDate(id);
  });
}
function editDate(id) {
  $('.submitEditBtn').click(function (e) {
    e.preventDefault();
    var dates = $('#pay').val();
    var status = $('#status').val();
    if (dates < 0) {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.invalid_date'),
      });
    } else {
      Swal.fire({
        title: i18n.t('confirm.title'),
        text: i18n.t('confirm.editing', { name: temp[id]['name'] }),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: i18n.t('action.confirm'),
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: 'patch',
            url: API_URL + '/studentjoinclasses/date',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('apitoken'),
            },
            data: {
              id: temp[id].id,
              idClass: temp[id].idClass,
              attendDate: dates,
              status: status,
            },
            dataType: 'JSON',
            success: function (res) {
              Toast.fire({
                icon: 'success',
                title: i18n.t('toast.edit_ok'),
              }).then(() => {
                loadData();
                $('#editModal').removeClass('opacity-100');
                $('#editModal').addClass('invisible opacity-0');
                setTimeout(function () {
                  $('.add').removeClass('hidden');
                  $('#editModal').html('');
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
    }
  });
  $('.closeBtn').click(function (e) {
    $('#editModal').removeClass('opacity-100');
    $('#editModal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('.add').removeClass('hidden');
      $('#editModal').html('');
    }, 200);
  });
}
