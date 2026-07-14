(function () {
  const currentScriptUrl = document.currentScript ? document.currentScript.src : document.baseURI;

  window.BkPageScriptLoader.loadScriptsWhenWindowReady(
    [{ src: '../../common/profile-page.js', baseUrl: currentScriptUrl }],
    function () {
      window.BkProfilePage.init({
        listEndpoint: 'students',
        updateEndpoint: 'students/student',
      });
    }
  );
})();
