(function () {
  const currentScriptUrl = document.currentScript ? document.currentScript.src : document.baseURI;

  window.BkPageScriptLoader.loadScriptsWhenWindowReady([
    { src: '../js/pages/teacher/attendance.js', baseUrl: currentScriptUrl },
  ]);
})();
