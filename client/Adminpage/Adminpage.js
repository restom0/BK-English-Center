// Admin dashboard — stats loader
$(document).ready(function () {
  loadData();
});

function loadData() {
  apiRequest({
    type: 'get',
    url: '/admins/stat',
    success: function (res) {
      $('#access-number').html(res.data.countAccess);
      $('#teacher-number').html(res.data.countTeacher);
      $('#student-number').html(res.data.countStudent);
      $('#staff-number').html(res.data.countStaff);
    },
    error: function (jqXHR) {
      if (jqXHR.status === 403) {
        window.location.replace('../HomePage/homePage.html');
      }
      Toast.fire({ icon: 'error', title: jqXHR.responseJSON.msg });
    },
  });
}
