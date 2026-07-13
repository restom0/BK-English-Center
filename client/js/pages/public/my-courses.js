if (!localStorage.getItem('role')) {
  window.location.replace('../../../pages/auth/login/index.html');
} else if (localStorage.getItem('role') === 'student') {
  let str = '';
  $.ajax({
    type: 'get',
    url: `${API_URL}/studentjoinclasses/student`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
    },
    dataType: 'JSON',
    success: function (res) {
      $(document).ready(function () {
        loadCourses(res.data);
      });
      str = `<h2>Điểm số</h2>
  <table class="table table-hover table-bordered">
      <thead id="table-head">
          <tr>
              <th scope="col">#</th>
              <th scope="col">Lớp học</th>
              <th scope="col">Listening</th>
              <th scope="col">Writing</th>
              <th scope="col">Reading</th>
              <th scope="col">Speaking</th>
              <th scope="col">Điểm trung bình</th>
          </tr>
      </thead>
      <tbody id="mark-list">
      `;
      (res?.data ?? []).forEach((el, index) => {
        str += `<tr>
        <th scope="row" class="course-no">${index + 1}</th>
        <td class="course-name">${el.className}</td>
          <td class="course-name">${el.listening}</td>
          <td class="course-name">${el.writing}</td>
          <td class="course-name">${el.reading}</td>
          <td class="course-name">${el.speaking}</td>
          <td class="course-name">${(el.listening + el.writing + el.reading + el.speaking) / 4}</td>
    </tr>`;
      });
      str += `
      </tbody>
  </table>`;
      BkSecurity.setSafeHtml($('.rate'), str);
    },
  });
} else if (localStorage.getItem('role') === 'teacher') {
  $.ajax({
    type: 'get',
    url: `${API_URL}/teacherjoinclasses/teacher`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
    },
    dataType: 'JSON',
    success: function (res) {
      $(document).ready(function () {
        loadCourses(res.data);
      });
      str = `<h2>Đánh giá</h2>
  <table class="table table-hover table-bordered">
      <thead id="table-head">
          <tr>
              <th scope="col">#</th>
              <th scope="col">Lớp học</th>
              <th scope="col">Đánh giá</th>
          </tr>
      </thead>
      <tbody id="mark-list">
      `;
      (res?.data ?? []).forEach((el, index) => {
        str += `<tr>
        <th scope="row" class="course-no">${index + 1}</th>
        <td class="course-name">${el.className}</td>
          <td class="course-name">`;
        for (let i = 0; i < el['rating']; i++) {
          str += `<i class='bx bxs-star' style='color:#ffed00'  ></i>`;
        }
        for (let i = el['rating']; i < 5; i++) {
          str += `<i class='bx bxs-star'></i>`;
        }
        str += `</td>

    </tr>`;
      });
      str += `
      </tbody>
  </table>`;
      BkSecurity.setSafeHtml($('.rate'), str);
    },
  });
}
function loadCourses(courseList) {
  courseList.forEach((element, index) => {
    $('#course-list').append(
      `<tr>
                <th scope="row" class="course-no">${index + 1}</th>
                <td class="course-name">${element.className}</td>
                <td class="course-date">${formatDate(element.startDate)}</td>
                <td class="course-date">${formatDate(element.endDate)}</td>
        <td class="course-date">${element.attendDate}</td>
                <td class="course-status">${
                  localStorage.getItem('role') === 'student'
                    ? element.status === 1
                      ? 'Đã học'
                      : element.status === 0
                        ? 'Đang học'
                        : 'Chưa học'
                    : element.status === 1
                      ? 'Đã dạy'
                      : element.status === 0
                        ? 'Đang dạy'
                        : 'Chưa dạy'
                }</td>
            </tr>`
    );
  });
}
function formatDate(date) {
  date = new Date(date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
