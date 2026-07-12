// Admin dashboard — stats loader
$(document).ready(function () {
  loadData();
});

function loadData() {
  apiRequest({
    type: 'get',
    url: '/admins/stat',
    success: function (res) {
      BkSecurity.setSafeHtml($('#access-number'), res?.data?.countAccess);
      BkSecurity.setSafeHtml($('#teacher-number'), res?.data?.countTeacher);
      BkSecurity.setSafeHtml($('#student-number'), res?.data?.countStudent);
      BkSecurity.setSafeHtml($('#staff-number'), res?.data?.countStaff);
    },
    error: function (jqXHR) {
      if (jqXHR.status === 403) {
        window.location.replace('../../../pages/public/home/index.html');
      }
      Toast.fire({ icon: 'error', title: jqXHR.responseJSON?.msg ?? 'Lỗi kết nối máy chủ' });
    },
  });
}
