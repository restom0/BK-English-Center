(function () {
  const currentScriptUrl = document.currentScript ? document.currentScript.src : document.baseURI;

  window.BkPageScriptLoader.loadScriptsWhenWindowReady([
    { src: '../js/pages/public/courses-detail.js', baseUrl: currentScriptUrl },
  ]);
})();
