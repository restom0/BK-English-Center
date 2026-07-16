$(document).ready(function () {
  loadData();
});
let tableData = [];

function handleStaffProfileEditSuccess() {
  Toast.fire({
    icon: 'success',
    title: i18n.t('toast.edit_ok'),
  }).then(() => {
    $('#modal').removeClass('opacity-100');
    $('#modal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('#modal').empty();
    }, 200);
    loadData();
  });
}

function editData() {
  $('.edit').click(function (e) {
    e.preventDefault();
    const id = $(this).data('id');
    const idStaff = $(this).attr('data-id-id');
    const dob = new Date(tableData[id].dateofbirth);
    dob.setMinutes(dob.getMinutes() - dob.getTimezoneOffset());
    let str = '';
    str += `
    <div class="grid grid-cols-3 gap-4 p-6 mb-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="col-span-2">
    <form>
        <div>
            <div class="gap-6 mb-6">
                <label for="full_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                      'label.full_name'
                    )}</label>
                <input type="text" id="full_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="${i18n.t('placeholder.person_name')}" value="${
                      tableData[id]['name']
                    }" required>
            </div>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                  'label.dob'
                )}</label>
                <input type="date" id="dob"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value=${dob.toISOString().split('T')[0]}     required>
            </div>
            <div>
                <label for="gender"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                      'label.gender'
                    )}</label>
                <div class="flex">`;
    if (tableData[id]['sex'] === 'M') {
      str += `<div class="flex items-center mt-3 mr-4">
                    <input id="inline-radio" type="radio" value="M" name="inline-radio-group"
                        checked class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="inline-radio"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                </div>
                <div class="flex items-center mt-3 mr-4">
                    <input id="inline-2-radio" type="radio" value="F" name="inline-radio-group"
                        class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="inline-2-radio"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${i18n.t(
                          'label.female'
                        )}</label>
                </div>`;
    } else {
      str += `<div class="flex items-center mt-3 mr-4">
                    <input id="inline-radio" type="radio" value="M" name="inline-radio-group"
                         class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="inline-radio"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                </div>
                <div class="flex items-center mt-3 mr-4">
                    <input id="inline-2-radio" type="radio" value="F" name="inline-radio-group"
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
                <input type="text" id="address"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="" value="${tableData[id]['address']}"required>
            </div>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                  'label.phone'
                )}</label>
                <input type="tel" id="phone"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0912345678" value="${
                      tableData[id]['phone']
                    }"pattern="[0-9]{10}" required>
            </div>
            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                  'label.email'
                )}</label>
                <input type="email" id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="nguyenvana@company.com" value="${tableData[id]['email']}" required>
            </div>
        </div>
    </form>
</div>
<div class="hidden container1" style="margin-top: 9vh;">
    <label for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mb-10">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <img src="https://th.bing.com/th/id/OIP.CVdkzge14K0HJZWZg5DiMQHaHn?pid=ImgDet&rs=1" alt="">
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
    </label>

    <div class="w-full grid grid-cols-2 gap-4">
    <div>
    <button type="submit"
                    class="w-full closeBtn mt-10 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span
                        class="w-full px-5 py-2.5 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        ${i18n.t('action.cancel')}
                    </span>
                </button>
    </div>
    <div>
    <button id="submitEditBtn"
            class="w-full inline-flex items-center mt-10 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 hover:text-white">
            <span
                class="w-full px-5 py-2.5 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                ${i18n.t('action.change')}
            </span>
        </button>
    </div>
    </div>
    </div>
</div>`;
    BkSecurity.setSafeHtml($('#modal'), str);
    $('#modal').removeClass('invisible opacity-0');
    $('#modal').addClass('opacity-100');
    editData();
    $('.closeBtn').click(function (e) {
      $('#modal').removeClass('opacity-100');
      $('#modal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('#modal').empty();
      }, 200);
    });
    const elements = document.getElementsByClassName('container1');
    for (const element of elements) {
      element.classList.remove('hidden');
    }
    $('#submitEditBtn').click(function (e) {
      e.preventDefault();
      const fullName = $('#full_name').val();
      const dob = $('#dob').val();
      const gender = $("input[name='inline-radio-group']:checked").val();
      const address = $('#address').val();
      const phone = $('#phone').val();
      const email = $('#email').val();
      Swal.fire({
        title: i18n.t('confirm.title'),
        text: i18n.t('confirm.editing', { name: tableData[id]['name'] }),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: i18n.t('action.confirm'),
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: 'patch',
            url: `${API_URL}/staffs/staff`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
            },
            data: {
              id: idStaff,
              name: fullName,
              sex: gender,
              dayofbirth: dob,
              phone: phone,
              address: address,
              email: email,
            },
            dataType: 'JSON',
            success: handleStaffProfileEditSuccess,
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
  });
}
function loadData() {
  $.ajax({
    type: 'get',
    url: `${API_URL}/staffs/staff`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
    },
    dataType: 'JSON',
    success: function (res) {
      let str = '';
      tableData = res.data;
      (res?.data ?? []).forEach((el, index) => {
        str += `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${el['name']}
        </th>
        <td class="px-6 py-4">
        ${el['sex'] == 'M' ? i18n.t('label.male') : i18n.t('label.female')}
        </td>
        <td class="px-6 py-4">
        ${formatDate(new Date(el['dateofbirth']))}
        </td>
        <td class="px-6 py-4">
        ${el['address']}
        </td>
        <td class="px-6 py-4">
        ${el['phone']}
        </td>
        <td class="px-6 py-4">
        ${el['email']}
        </td>
        <td class="px-6 py-4">
            <button type="button" data-tooltip-target="update" data-id-id="${el['id']}"
                class="edit flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="${
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
        </td ></tr> `;
      });
      BkSecurity.setSafeHtml('#student', str);
      editData();
    },
  });
}
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
