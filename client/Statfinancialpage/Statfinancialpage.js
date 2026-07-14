(function () {
  const currentScriptUrl = document.currentScript ? document.currentScript.src : document.baseURI;

  window.BkPageScriptLoader.loadScriptsWhenWindowReady([
    { src: '../js/pages/staff/stat-financial.js', baseUrl: currentScriptUrl },
  ]);
})();
