(function (global) {
  const adapterScriptUrl = document.currentScript ? document.currentScript.src : document.baseURI;

  const paymentConfigs = {
    student: {
      peopleEndpoint: 'students',
      joinClassEndpoint: 'studentjoinclasses',
      personIdField: 'idStudent',
      selectPersonLabelKey: 'select.student',
      paidStatusLabels: {
        unpaid: 'status.not_closed',
        paid: 'status.closed',
      },
      confirmEditKey: 'confirm.editing_class',
      confirmDeleteKey: 'confirm.deleting_class',
      payNotificationEndpoint: 'sendPrize',
    },
    teacher: {
      peopleEndpoint: 'teachers',
      joinClassEndpoint: 'teacherjoinclasses',
      personIdField: 'idTeacher',
      selectPersonLabelKey: 'select.teacher',
      paidStatusLabels: {
        unpaid: 'status.not_received',
        paid: 'status.received',
      },
      confirmEditKey: 'confirm.editing_teach',
      confirmDeleteKey: 'confirm.deleting_teach',
      payNotificationEndpoint: 'sendSalary',
    },
  };

  /** Initialize component behavior. */
  function init(role) {
    global.BkPageScriptLoader.loadScriptsWhenWindowReady(
      [{ src: 'payment-page.js', baseUrl: adapterScriptUrl }],
      function () {
        global.BkPaymentPage.init(paymentConfigs[role]);
      }
    );
  }

  global.BkPaymentAdapters = {
    student: function () {
      init('student');
    },
    teacher: function () {
      init('teacher');
    },
  };
})(window);
