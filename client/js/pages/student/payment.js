(function () {
  const currentScriptUrl = document.currentScript ? document.currentScript.src : document.baseURI;

  window.BkPageScriptLoader.loadScriptsWhenWindowReady(
    [{ src: '../../common/payment-page.js', baseUrl: currentScriptUrl }],
    function () {
      window.BkPaymentPage.init({
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
      });
    }
  );
})();
