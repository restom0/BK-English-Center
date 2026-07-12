let tableData = [];
let temp = [];
$.ajax({
  type: 'get',
  url: `${API_URL}/staffs/staff`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
  },
  dataType: 'JSON',
  success: function (res) {
    tableData = res.data;
  },
  error: function (jqXHR, textStatus, errorThrown) {
    if (jqXHR.status === 403) {
      window.location.replace('../HomePage/homePage.html');
    }
    Toast.fire({
      icon: 'error',
      title: jqXHR.responseJSON.msg,
    });
  },
});

$(document).ready(function () {
  loadData();
  loadAddData();
});

function loadData() {
  const str = '';
  $.ajax({
    type: 'get',
    url: `${API_URL}/staffs/showtimekeeping`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
    },
    dataType: 'JSON',
    success: function (res) {
      let str = '';
      temp = res.data;
      res.data.forEach((el, index) => {
        str += `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="modal" data-id-id=${el['id']} data-id=${index}>
                                    ${el['name']}
                                </span>
                            </th>
                            <td class="px-6 py-4">
                            ${el['month']}
                            </td>
                            <td class="px-6 py-4">
                            ${el['year']}
                            </td>
                            <td class="px-6 py-4">
                            ${el['attendDate']}
                            </td>
                            <td class="px-6 py-4">
                            <button data-tooltip-target="attend" data-id=${index}
                class="addCheck mx-auto p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="text-center w-6 h-6 text-gray-100 dark:text-white flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                </svg>
                <div id="attend" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        ${i18n.t('action.mark')}
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
            </button>
            <button data-tooltip-target="warning" data-email=${el['email']} data-id=${index}
                class="addWarn mx-auto p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span
                    class="material-symbols-outlined text-center w-6 h-6 text-gray-100 dark:text-white flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    priority_high
                </span>
                <div id="warning" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        ${i18n.t('action.warn')}
        <div class="tooltip-arrow" data-popper-arrow></div>
            </button>
            <button data-tooltip-target="update" type="button"
                    class="editBtn p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="${
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
        </td>
    </tr>`;
      });
      BkSecurity.setSafeHtml($('#student'), str);
      addCheck();
      addWarn();
      $('.modal').click(function (e) {
        e.preventDefault();
        const id = $(this).attr('data-id-id');

        $.ajax({
          type: 'get',
          url: `${API_URL}/staffs/timekeeping`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
          },
          data: {
            id: id,
          },
          dataType: 'JSON',
          success: function (res) {
            const dob = new Date(res.data[0].dateofbirth);
            dob.setMinutes(dob.getMinutes() - dob.getTimezoneOffset());
            let str = '';
            str += `<div class="mb-5 grid grid-cols-3 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="col-span-2" id="modal1">
            <form>
                <div>
                    <div class="gap-6 mb-6">
                        <label for="full_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.full_name')}</label>
                        <input disabled type="text" id="full_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=\"${i18n.t('placeholder.person_name')}\" value="${
                              res.data[0]['name']
                            }" required>
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.dob')}</label>
                        <input disabled type="date" id="dob"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value=${dob.toISOString().split('T')[0]}     required>
                    </div>
                    <div>
                        <label for="gender"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.gender')}</label>
                        <div class="flex">`;
            if (res.data[0]['sex'] === 'M') {
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
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${i18n.t('label.female')}</label>
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
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${i18n.t('label.female')}</label>
                        </div>`;
            }
            str += `
                        </div>
                    </div>
                </div>
                <div class="gap-6 mb-6">
                    <div>
                        <label for="address"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.address')}</label>
                        <input disabled type="text" id="address"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="" value="${res.data[0]['address']}"required>
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.phone')}</label>
                        <input disabled type="tel" id="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0912345678" value="${
                              res.data[0]['phone']
                            }"pattern="[0-9]{10}" required>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.email')}</label>
                        <input disabled type="email" id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="nguyenvana@company.com" value="${
                              res.data[0]['email']
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
        <div>
        <button type="submit"
                        class="w-full closeBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" style="margin-top:20vh">
                        <span
                            class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            ${i18n.t('action.cancel')}
                        </span>
                    </button>
        </div>
                </div></div>`;
            BkSecurity.setSafeHtml($('#modal'), str);
            $('#modal').removeClass('invisible opacity-0');
            $('#modal').addClass('opacity-100');
            $('#editModal').removeClass('opacity-100');
            $('#editModal').addClass('invisible opacity-0');
            setTimeout(function () {
              $('#editModal').empty();
            }, 200);
            $('.closeBtn').click(function (e) {
              $('#modal').removeClass('opacity-100');
              $('#modal').addClass('invisible opacity-0');
              $('.add').removeClass('hidden');
              setTimeout(function () {
                $('#modal').empty();
              }, 200);
            });
          },
        });
      });
      editModal();
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
    const id = $(this).attr('data-id');
    const now = new Date();
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
          url: `${API_URL}/staffs/timekeeping`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
          },
          data: {
            id: temp[id]['id'],
            month: temp[id]['month'],
            year: temp[id]['year'],
            attendDate: temp[id]['attendDate'] + 1,
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
              title: i18n.t('validate.old_attend'),
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
    const id = $(this).attr('data-id');
    const email = $(this).attr('data-email');
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
          url: `${API_URL}/sendWarning`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
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
function editModal() {
  $('.editBtn').click(function (e) {
    e.preventDefault();
    $('.addBtn').addClass('hidden');
    const id = $(this).attr('data-id');
    let str = '';
    str += `
            <div class="mb-5 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <form id="form">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="namePay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.full_name')}</label>
                        <input type="text" id="namePay" disabled
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=\"${i18n.t('placeholder.person_name')}\" value="${
                              temp[id]['name']
                            }"
                            required>
                    </div>
                    <div>
                        <label for="classPay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.year')}</label>
                        <input type="text" id="classPay"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="IELTS 1" value="${temp[id]['year']}" required>
                    </div>
                    <div>
                        <label for="class"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.month')}</label>
                        <input type="text" id="class"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="IELTS 1" value="${temp[id]['month']}" required>
                    </div>
                    <div>
                        <label for="pay"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.sessions')}</label>
                        <input type="text" id="pay"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                              temp[id]['attendDate']
                            }" required>
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
                    class="submitEditBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 hover:text-white">
                    <span
                        class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md  group-hover:bg-opacity-0">
                        ${i18n.t('action.change')}
                    </span>
                </button>
                </div>
            </div>
        </div>
        </div>
        `;
    BkSecurity.setSafeHtml($('#editModal'), str);
    $('#editModal').removeClass('invisible opacity-0');
    $('#editModal').addClass('opacity-100');
    $('#modal').removeClass('opacity-100');
    $('#modal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('#modal').empty();
    }, 200);
    $('.closeBtn').click(function (e) {
      $('#editModal').removeClass('opacity-100');
      $('#editModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('#editModal').empty();
      }, 200);
    });
    editDate(id);
  });
}
function editDate(id) {
  $('.submitEditBtn').click(function (e) {
    e.preventDefault();
    const dates = $('#pay').val();
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
            url: `${API_URL}/staffs/timekeeping`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
            },
            data: {
              id: temp[id]['id'],
              month: temp[id]['month'],
              year: temp[id]['year'],
              attendDate: dates,
            },
            dataType: 'JSON',
            success: function (res) {
              Toast.fire({
                icon: 'success',
                title: i18n.t('toast.edit_ok'),
              }).then(() => {
                $('#editModal').removeClass('opacity-100');
                $('#editModal').addClass('invisible opacity-0');
                setTimeout(function () {
                  $('#editModal').empty();
                }, 200);
                loadData();
              });
            },
            error: function (jqXHR, textStatus, errorThrown) {
              Toast.fire({
                icon: 'error',
                title: jqXHR.responseJSON.msg,
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
      $('#editModal').empty();
    }, 200);
  });
}
function loadAddData() {
  $('.add').click(function (e) {
    e.preventDefault();

    let str = '';
    str += `
            <div class="mb-5 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <form id="addForm">
                <div class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.staff')}</label>
                <select id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>${i18n.t('select.staff')}</option>`;
    tableData.forEach((el) => {
      str += `<option value=${el.id}>${el.name}</option>`;
    });
    str += `

                </select>
                </div>
                    <div>
                        <label for="month"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.month')}</label>
                        <input type="text" id="month"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="mm"
                            required>
                    </div>
                    <div>
                        <label for="year"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.year')}</label>
                        <input type="text" id="year"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="yyyy"
                            required>
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
                <button form="addForm" type="submit"
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
    BkSecurity.setSafeHtml($('#modal'), str);
    $('#modal').removeClass('invisible opacity-0');
    $('#modal').addClass('opacity-100');
    $('.add').addClass('hidden');
    addData();
    $('.closeBtn').click(function (e) {
      $('#modal').removeClass('opacity-100');
      $('#modal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('#modal').empty();
        $('.add').removeClass('hidden');
      }, 200);
    });
  });
}
function addData() {
  $('.submitAddBtn').click(function (e) {
    e.preventDefault();
    $('.add').addClass('hidden');
    const name = $('#name').val();
    const month = $('#month').val();
    const year = $('#year').val();
    //let attendDate = $("#attendDate").val();
    if (name === '' || month === '' || year === '') {
      Toast.fire({
        icon: 'error',
        title: i18n.t('toast.fill_all'),
      });
      //$(".add").removeClass("hidden");
    } else {
      $.ajax({
        type: 'post',
        url: `${API_URL}/staffs/timekeeping`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
        },
        data: {
          id: name,
          month: month,
          year: year,
        },
        dataType: 'JSON',
        success: function (res) {
          Toast.fire({
            icon: 'success',
            title: i18n.t('toast.add_ok'),
          }).then(() => {
            $('#modal').removeClass('opacity-100');
            $('#modal').addClass('invisible opacity-0');
            setTimeout(function () {
              $('#modal').empty();
              $('.add').removeClass('hidden');
            }, 200);
            loadData();
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          Toast.fire({
            icon: 'error',
            title: jqXHR.responseJSON.msg,
          });
        },
      });
    }
  });
}
