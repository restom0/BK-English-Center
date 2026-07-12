$(document).ready(function () {
  $('.course-list').empty();
  $.ajax({
    type: 'get',
    url: `${API_URL}/courses/all`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
    },
    dataType: 'JSON',
    success: function (res) {
      let str = '';
      (res?.data ?? []).forEach(function (el, index) {
        str += `
                    <li class="course">
                        <h3>${index + 1}. ${el.name}</h3>
                        <p>${el.short}</p>
                        <div class="course__card">
                            <div class="card__left">
                                <img src="${el.imgintro}" alt="" class="course__image">
                            </div>
                            <div class="card__right">
                                <h2> Khoá học ${el.name}</h2>
                                <a class="more" href="../../../pages/public/courses-detail/index.html?id=${index}" role="button">Tìm hiểu thêm</a>
                            </div>
                        </div>
                    </li>`;
        BkSecurity.setSafeHtml($('.course-list'), str);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      Toast.fire({
        icon: 'error',
        title: jqXHR.responseJSON?.msg ?? 'Lỗi kết nối máy chủ',
      });
    },
  });
});
