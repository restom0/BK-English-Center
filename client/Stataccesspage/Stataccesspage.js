(function () {
  const currentScriptUrl = document.currentScript ? document.currentScript.src : document.baseURI;

  window.BkPageScriptLoader.loadScriptsWhenWindowReady([
    { src: '../js/pages/staff/stat-access.js', baseUrl: currentScriptUrl },
  ]);
})();
