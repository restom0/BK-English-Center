// Staff dashboard — stats loader + admin back-link
$(document).ready(function () {
  loadData();
});

if (localStorage.getItem('role') === 'admin') {
  BkSecurity.setSafeHtml(
    $('#checkAdmin'),
    `
    <button type="button"
      class="px-3 flex items-center w-full text-base text-gray-900 transition duration-75 rounded-lg
             group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700
             border-t border-gray-200 dark:border-gray-700 mt-1"
      aria-controls="dropdown-staff" data-collapse-toggle="dropdown-staff">
      <span class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
        <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
        </svg>
        <span class="ml-3"><a href="../Adminpage/Adminpage.html">VỀ TRANG CHỦ</a></span>
      </span>
    </button>`
  );
}

function loadData() {
  apiRequest({
    type: 'get',
    url: '/staffs/stat',
    success: function (res) {
      BkSecurity.setSafeHtml($('#teacher-number'), res.data.countTeacher);
      BkSecurity.setSafeHtml($('#student-number'), res.data.countStudent);
      BkSecurity.setSafeHtml($('#staff-number'), res.data.countStaff);
    },
    error: function (jqXHR) {
      Toast.fire({ icon: 'error', title: jqXHR.responseJSON.msg });
    },
  });
}
