(function () {
  const role = new URLSearchParams(window.location.search).get('role') === 'teacher' ? 'teacher' : 'student';
  const labelKeys = role === 'teacher'
    ? { pay: 'finance.salary', prize: 'finance.bonus' }
    : { pay: 'course.fee', prize: 'course.prize_stu' };

  document.querySelectorAll('[data-payment-label="pay"]').forEach(function (element) {
    element.dataset.i18n = labelKeys.pay;
  });
  document.querySelectorAll('[data-payment-label="prize"]').forEach(function (element) {
    element.dataset.i18n = labelKeys.prize;
  });

  if (window.i18n) {
    window.i18n.applyAll();
  }

  window.BkPaymentAdapters[role]();
})();
