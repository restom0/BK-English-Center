(function () {
  const currentScriptUrl = document.currentScript ? document.currentScript.src : document.baseURI;

  window.BkPageScriptLoader.loadScriptsWhenWindowReady(
    [{ src: '../../common/attendance-page.js', baseUrl: currentScriptUrl }],
    function () {
      window.BkAttendancePage.init({
        peopleEndpoint: 'teachers',
        joinClassEndpoint: 'teacherjoinclasses',
        personIdField: 'idTeacher',
        selectPersonLabelKey: 'select.teacher',
        statusLabels: {
          missing: 'status.not_taught',
          active: 'status.teaching',
          completed: 'status.taught',
        },
      });
    }
  );
})();
