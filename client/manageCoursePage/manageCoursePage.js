let courseData;
$(document).ready(function () {
  loadData();
  loadAddData();
});
function loadData() {
  $.ajax({
    type: 'get',
    url: `${API_URL}/courses`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
    },
    dataType: 'JSON',
    success: function (res) {
      courseData = res.data;
      res.data.forEach((el, index) => {
        str += `<tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="px-6 py-4">
            ${el['name']}
        </td>
        <td class="px-6 py-4">
        ${BkCurrency.format(el['paidStudent'])}
        </td>
        <td class="px-6 py-4">
        ${BkCurrency.format(el['prizeStudent'])}
        </td>
        <td class="px-6 py-4">
        ${BkCurrency.format(el['paidTeacher'])}
        </td>
        <td class="px-6 py-4">
        ${BkCurrency.format(el['prizeTeacher'])}
        </td>
        <td class="px-6 py-4">
        ${el['maxAttendDate']} buổi
        </td>
        <td class="px-6 py-4 flex justify-center">
<button type="button" data-modal-target="extralarge-modal" data-modal-toggle="extralarge-modal" data-id=${
          index
        } data-tooltip-target="detail"
                class="detailBtn flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
    </svg>
                <div id="detail" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    ${i18n.t('action.detail')}
                    <div class="tooltip-arrow" data-popper-arrow></div>
            </button>
            <button type="button" data-id=${index} data-tooltip-target="update"
                class="editBtn flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 18">
                    <path
                        d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                    <path
                        d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                </svg>
                <div id="update" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    ${i18n.t('action.edit')}
                    <div class="tooltip-arrow" data-popper-arrow></div>
            </button>
            <button type="button" data-tooltip-target="delete"
                class="deleteBtn flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                data-id=${index}>
                <svg class="w-5 h-5 text-gray-500 hover:text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 18 20">
                    <path
                        d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                </svg>
                <div id="delete" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    ${i18n.t('action.delete')}
                    <div class="tooltip-arrow" data-popper-arrow></div>
            </button>
        </td>
        </tr>`;
      });
      BkSecurity.setSafeHtml($('#course'), str);
      loadEditData();
      loadDetailData();
      deleteData();
    },
  });
  let str = '';
}
function loadDetailData() {
  $('.detailBtn').click(function (e) {
    e.preventDefault();
    const id = $(this).attr('data-id');
    BkSecurity.setSafeHtml($('#nameCourse'), courseData[id].name);
    let str = '';
    str += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td class="px-6 py-4">
          ${courseData[id].imgintro}
      </td>
      <td class="px-6 py-4">
      ${courseData[id].short}
      </td>
      <td class="px-6 py-4">
      ${courseData[id].img}
      </td>
      <td class="px-6 py-4">
      ${courseData[id].intro}
      </td>
      <td class="px-6 py-4">
      ${courseData[id].description}
      </td>
  </tr>`;
    BkSecurity.setSafeHtml($('#detail1'), str);
  });
}
function loadAddData() {
  $('.addModal').click(function (e) {
    e.preventDefault();
    $('.addModal').addClass('hidden');
    let str = '';
    str += `
            <div class="mb-5 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <form id="addForm">
                <div class="grid gap-6 mb-6 md:grid-cols-4">
                    <div>
                        <label for="courseName"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.class_name')}</label>
                        <input type="text" id="courseName"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="IELTS"
                            required>
                    </div>
                    <div>
                        <label for="imgintro"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.intro_img')}</label>
                        <input type="text" id="imgintro"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="...." required>
                    </div>
                    <div>
                        <label for="short"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.short_desc')}</label>
                        <input type="text" id="short"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="...." required>
                    </div>
                    <div>
                        <label for="img"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.desc_img')}</label>
                        <input type="text" id="img"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="...." required>
                    </div>
                    <div>
                        <label for="intro"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.intro')}</label>
                        <input type="text" id="intro"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="...." required>
                    </div>
                    <div>
                        <label for="description"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.description')}</label>
                        <input type="text" id="description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="...." required>
                    </div>
                    <div>
                        <label for="fee"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.tuition')}</label>
                        <input type="text" id="fee"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1000000"
                            required>
                    </div>
                    <div>
                        <label for="prizeStudent"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.scholarship')}</label>
                        <input type="text" id="prizeStudent"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1000000" required>
                    </div>
                    <div>
                        <label for="salary"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.salary')}</label>
                        <input type="text" id="salary"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1000000"
                            required>
                    </div>
                    <div>
                        <label for="prizeTeacher"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.bonus')}</label>
                        <input type="text" id="prizeTeacher"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1000000" required>
                    </div>
                    <div>
                        <label for="time"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.duration')}</label>
                        <input type="number" id="time"
                            class="disabled bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ${i18n.t('placeholder.duration')} required>
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
    BkSecurity.setSafeHtml($('#addModal'), str);
    $('#addModal').removeClass('invisible opacity-0');
    $('#addModal').addClass('opacity-100');
    $('#editModal').addClass('invisible opacity-0');
    $('#editModal').removeClass('opacity-100');
    setTimeout(function () {
      $('#editModal').empty();
    }, 200);
    $('.closeBtn').click(function (e) {
      $('#addModal').removeClass('opacity-100');
      $('#addModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('.addModal').removeClass('hidden');
        $('#addModal').empty();
      }, 200);
    });
    addData();
  });
}
function addData() {
  $('.submitAddBtn').click(function (e) {
    e.preventDefault();
    const courseName = $('#courseName').val();
    const intro = $('#intro').val();
    const imgintro = $('#imgintro').val();
    const img = $('#img').val();
    const short = $('#short').val();
    const description = $('#description').val();
    const fee = $('#fee').val();
    const salary = $('#salary').val();
    const prizeStudent = $('#prizeStudent').val();
    const prizeTeacher = $('#prizeTeacher').val();
    const time = $('#time').val();
    if (
      !courseName ||
      !fee ||
      !prizeStudent ||
      !prizeTeacher ||
      !intro ||
      !imgintro ||
      !img ||
      !short ||
      !salary ||
      !description ||
      !time
    ) {
      Toast.fire({
        icon: 'error',
        title: i18n.t('toast.fill_all'),
      });
      return;
    }
    $.ajax({
      type: 'post',
      url: `${API_URL}/courses/course`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
      },
      data: {
        name: courseName,
        intro: intro,
        img: img,
        imgintro: imgintro,
        short: short,
        description: description,
        paidStudent: Number(fee),
        prizeStudent: Number(prizeStudent),
        paidTeacher: Number(salary),
        prizeTeacher: Number(prizeTeacher),
        maxAttendDate: Number(time),
      },
      dataType: 'JSON',
      success: function (res) {
        Toast.fire({
          icon: 'success',
          title: i18n.t('toast.add_course_ok'),
        }).then(() => {
          $('#addModal').removeClass('opacity-100');
          $('#addModal').addClass('invisible opacity-0');
          setTimeout(function () {
            $('.addModal').removeClass('hidden');
            $('#addModal').empty();
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
  });
}
function loadEditData() {
  $('.editBtn').click(function (e) {
    e.preventDefault();
    const id = $(this).attr('data-id');
    let str = '';
    str += `
      <div class="mb-5 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <form id="addForm">
          <div class="grid gap-6 mb-6 md:grid-cols-4">
              <div>
                  <label for="courseName"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.class_name')}</label>
                  <input type="text" id="courseName"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                        courseData[id].name
                      }" data-value="${courseData[id].name}"
                      placeholder="IELTS"
                      required>
              </div>
              <div>
                  <label for="imgintro"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.intro_img')}</label>
                  <input type="text" id="imgintro"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                        courseData[id].imgintro
                      }"
                      placeholder="...." required>
              </div>
              <div>
                  <label for="short"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.short_desc')}</label>
                  <input type="text" id="short"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                        courseData[id].short
                      }"
                      placeholder="...." required>
              </div>
              <div>
                  <label for="img"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.desc_img')}</label>
                  <input type="text" id="img"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                        courseData[id].img
                      }"
                      placeholder="...." required>
              </div>
              <div>
                  <label for="intro"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.intro')}</label>
                  <input type="text" id="intro"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                        courseData[id].intro
                      }"
                      placeholder="...." required>
              </div>
              <div>
                  <label for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.description')}</label>
                  <textarea id="description"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                        courseData[id].description
                      }"
                       placeholder="...." required></textarea>
              </div>
              <div>
                  <label for="fee"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.tuition')}</label>
                  <input type="text" id="fee"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                        courseData[id].paidStudent
                      }"
                      placeholder="1000000"
                      required>
              </div>
              <div>
                  <label for="prizeStudent"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.scholarship')}</label>
                  <input type="text" id="prizeStudent"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                        courseData[id].prizeStudent
                      }"
                      placeholder="1000000" required>
              </div>
              <div>
                  <label for="salary"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.salary')}</label>
                  <input type="text" id="salary"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                        courseData[id].paidTeacher
                      }"
                      placeholder="1000000"
                      required>
              </div>
              <div>
                  <label for="prizeTeacher"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.bonus')}</label>
                  <input type="text" id="prizeTeacher"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                        courseData[id].prizeTeacher
                      }"
                      placeholder="1000000" required>
              </div>
              <div>
                  <label for="time"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t('label.duration')}</label>
                  <input type="number" id="time"
                      class="disabled bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${
                        courseData[id].maxAttendDate
                      }" ${i18n.t('placeholder.duration')} required>
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
    BkSecurity.setSafeHtml($('#editModal'), str);
    $('#editModal').removeClass('invisible opacity-0');
    $('#editModal').addClass('opacity-100');
    $('#addModal').addClass('invisible opacity-0');
    $('#addModal').removeClass('opacity-100');
    setTimeout(function () {
      $('#addModal').empty();
    }, 200);
    $('.closeBtn').click(function (e) {
      $('#editModal').removeClass('opacity-100');
      $('#editModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('.addModal').removeClass('hidden');
        $('#editModal').empty();
      }, 200);
    });
    editData(id);
  });
}
function editData(id) {
  $('.submitEditBtn').click(function (e) {
    e.preventDefault();
    const oldName = $('#courseName').attr('data-value');
    const courseName = $('#courseName').val();
    const intro = $('#intro').val();
    const imgintro = $('#imgintro').val();
    const img = $('#img').val();
    const short = $('#short').val();
    const description = $('#description').val();
    const fee = $('#fee').val();
    const salary = $('#salary').val();
    const prizeStudent = $('#prizeStudent').val();
    const prizeTeacher = $('#prizeTeacher').val();
    const time = $('#time').val();
    if (
      !courseName ||
      !fee ||
      !prizeStudent ||
      !prizeTeacher ||
      !intro ||
      !imgintro ||
      !img ||
      !short ||
      !salary ||
      !description ||
      !time
    ) {
      Toast.fire({
        icon: 'error',
        title: i18n.t('toast.fill_all'),
      });
      return;
    }
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.editing', { name: courseData[id]['name'] }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'patch',
          url: `${API_URL}/courses/course`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
          },
          data: {
            oldname: oldName,
            name: courseName,
            intro: intro,
            img: img,
            imgintro: imgintro,
            short: short,
            description: description,
            paidStudent: Number(fee),
            prizeStudent: Number(prizeStudent),
            paidTeacher: Number(salary),
            prizeTeacher: Number(prizeTeacher),
            maxAttendDate: Number(time),
          },
          dataType: 'JSON',
          success: function (res) {
            Toast.fire({
              icon: 'success',
              title: i18n.t('toast.edit_course_ok'),
            }).then(() => {
              $('#editModal').removeClass('opacity-100');
              $('#editModal').addClass('invisible opacity-0');
              setTimeout(function () {
                $('.addModal').removeClass('hidden');
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
  });
}
function formatDate(date) {
  date = new Date(date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
function deleteData() {
  $('.deleteBtn').click(function (e) {
    e.preventDefault();
    const id = $(this).attr('data-id');
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.deleting', { name: courseData[id]['name'] }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'delete',
          url: `${API_URL}/courses/course?name=${courseData[id]['name']}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
          },
          dataType: 'JSON',
          success: function (res) {
            Toast.fire({
              icon: 'success',
              title: i18n.t('toast.delete_course_ok'),
            }).then(() => {
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
  });
}
