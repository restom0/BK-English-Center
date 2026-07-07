if (!localStorage.getItem('role')) {
  window.location.replace('../../../pages/auth/login/index.html');
}
$(document).ready(function () {
  if (localStorage.getItem('role') === 'student') {
    studentPage();
  } else if (localStorage.getItem('role') === 'teacher') {
    teacherPage();
  }
});

function studentPage() {
  $('#bill-intro').html('Hoá đơn và thanh toán');
  $('#bill-col').html(`
    <tr>
        <th class="col-md-3">#</th>
        <th class="col-md-3">Khoá học</th>
        <th class="col-md-3">Học phí</th>
        <th class="col-md-3">Trạng thái</th>
    </tr>`);

  $('#bill-row').empty();
  $('#prize-intro').html('Học bổng');
  $('#prize-col').html(`
    <tr>
        <th scope="col">#</th>
        <th scope="col">Lớp</th>
        <th scope="col">Học bổng</th>
        <th scope="col">Trạng thái</th>
    </tr>`);
  var str = '';
  $.ajax({
    type: 'get',
    url: API_URL + '/studentjoinclasses/salary',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('apitoken'),
    },
    dataType: 'JSON',
    success: function (res) {
      (res?.data ?? []).forEach((element, index) => {
        str +=
          `
            <tr>
            <th scope="row">` +
          (index + 1) +
          `</th>
            <td>` +
          element.className +
          `</td>
            <td>` +
          element.paid.toLocaleString('en-US') +
          ` đ</td>`;
        if (element.paidStatus == 1)
          str +=
            `<td><button type="button" class="btn btn-success">` +
            'Đã thanh toán' +
            `</button></td> </tr>`;
        else if (element.paidStatus == 0)
          str +=
            `<td><button type="button" class="btn btn-warning">` +
            'Chưa thanh toán' +
            `</button></td> </tr>`;
      });
      $('#bill-row').html(str);
    },
  });
  $.ajax({
    type: 'get',
    url: API_URL + '/studentjoinclasses/prize',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('apitoken'),
    },
    dataType: 'JSON',
    success: function (res) {
      var str = '';
      (res?.data ?? []).forEach((element, index) => {
        str +=
          `
            <tr>
            <th scope="row">` +
          (index + 1) +
          `</th>
            <td>` +
          element.className +
          `</td>
            <td>` +
          element.prize.toLocaleString('en-US') +
          ` đ</td>`;
        if (element.prizeStatus == 1)
          str +=
            `<td><button type="button" class="btn btn-success">` +
            'Đã nhận' +
            `</button></td> </tr>`;
        else if (element.prizeStatus == 0)
          str +=
            `<td><button type="button" class="btn btn-warning">` +
            'Chưa nhận' +
            `</button></td> </tr>`;
      });
      $('#prize-row').html(str);
    },
  });
}

function teacherPage() {
  $('#bill-intro').html('Lương');
  $('#bill-col').html(`
    <tr>
        <th scope="col">#</th>
        <th scope="col">Lớp</th>
        <th scope="col">Lương</th>
        <th scope="col">Trạng thái</th>
    </tr>`);

  $('#bill-row').empty();

  var str = '';
  $.ajax({
    type: 'get',
    url: API_URL + '/teacherjoinclasses/salary',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('apitoken'),
    },
    dataType: 'JSON',
    success: function (res) {
      (res?.data ?? []).forEach((element, index) => {
        str +=
          `
            <tr>
            <th scope="row">` +
          (index + 1) +
          `</th>
            <td>` +
          element.className +
          `</td>
            <td>` +
          element.paid.toLocaleString('en-US') +
          ` đ</td>`;
        if (element.paidStatus == 1)
          str +=
            `<td><button type="button" class="btn btn-success">` +
            'Đã nhận' +
            `</button></td> </tr>`;
        else if (element.paidStatus == 0)
          str +=
            `<td><button type="button" class="btn btn-warning">` +
            'Chưa nhận' +
            `</button></td> </tr>`;
      });
      $('#bill-row').html(str);
    },
  });
  $('#prize-intro').html('Thưởng');
  $('#prize-col').html(`
    <tr>
        <th scope="col">#</th>
        <th scope="col">Lớp</th>
        <th scope="col">Thưởng</th>
        <th scope="col">Trạng thái</th>
    </tr>`);

  $.ajax({
    type: 'get',
    url: API_URL + '/teacherjoinclasses/prize',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('apitoken'),
    },
    dataType: 'JSON',
    success: function (res) {
      var str = '';
      (res?.data ?? []).forEach((element, index) => {
        str +=
          `
            <tr>
            <th scope="row">` +
          (index + 1) +
          `</th>
            <td>` +
          element.className +
          `</td>
            <td>` +
          element.prize.toLocaleString('en-US') +
          ` đ</td>`;
        if (element.prizeStatus == 1)
          str +=
            `<td><button type="button" class="btn btn-success">` +
            'Đã nhận' +
            `</button></td> </tr>`;
        else if (element.prizeStatus == 0)
          str +=
            `<td><button type="button" class="btn btn-warning">` +
            'Chưa nhận' +
            `</button></td> </tr>`;
      });
      $('#prize-row').html(str);
    },
  });
}

// ─── Alpine.js calendar component ────────────────────────────────────────────
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function app() {
  return {
    month: '',
    year: '',
    no_of_days: [],
    blankdays: [],
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    events: [
      { event_date: new Date(2020, 3, 1), event_title: "April Fool's Day", event_theme: 'blue' },
      { event_date: new Date(2020, 3, 10), event_title: 'Birthday', event_theme: 'red' },
      { event_date: new Date(2020, 3, 16), event_title: 'Upcoming Event', event_theme: 'green' },
    ],
    event_title: '',
    event_date: '',
    event_theme: 'blue',
    themes: [
      { value: 'blue', label: 'Blue Theme' },
      { value: 'red', label: 'Red Theme' },
      { value: 'yellow', label: 'Yellow Theme' },
      { value: 'green', label: 'Green Theme' },
      { value: 'purple', label: 'Purple Theme' },
    ],
    openEventModal: false,

    initDate() {
      const today = new Date();
      this.month = today.getMonth();
      this.year = today.getFullYear();
      this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
    },

    isToday(date) {
      const today = new Date();
      const d = new Date(this.year, this.month, date);
      return today.toDateString() === d.toDateString();
    },

    showEventModal(date) {
      this.openEventModal = true;
      this.event_date = new Date(this.year, this.month, date).toDateString();
    },

    addEvent() {
      if (!this.event_title) return;
      this.events.push({
        event_date: this.event_date,
        event_title: this.event_title,
        event_theme: this.event_theme,
      });
      this.event_title = '';
      this.event_date = '';
      this.event_theme = 'blue';
      this.openEventModal = false;
    },

    getNoOfDays() {
      const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
      const dayOfWeek = new Date(this.year, this.month).getDay();
      this.blankdays = Array.from({ length: dayOfWeek }, (_, i) => i + 1);
      this.no_of_days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    },
  };
}
