(function () {
  const currentScriptUrl = document.currentScript ? document.currentScript.src : document.baseURI;

  window.BkPageScriptLoader.loadScriptsWhenWindowReady(
    [{ src: '../../common/payment-page.js', baseUrl: currentScriptUrl }],
    function () {
      window.BkPaymentPage.init({
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
      });
    }
  );
})();
