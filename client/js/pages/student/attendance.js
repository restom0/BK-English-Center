(function () {
  const currentScriptUrl = document.currentScript ? document.currentScript.src : document.baseURI;

  window.BkPageScriptLoader.loadScriptsWhenWindowReady(
    [{ src: '../../common/attendance-page.js', baseUrl: currentScriptUrl }],
    function () {
      window.BkAttendancePage.init({
        peopleEndpoint: 'students',
        joinClassEndpoint: 'studentjoinclasses',
        personIdField: 'idStudent',
        selectPersonLabelKey: 'select.student',
        extraPersonColumnField: 'teacherName',
        statusLabels: {
          missing: 'status.not_studied',
          active: 'status.studying',
          completed: 'status.studied',
        },
      });
    }
  );
})();
