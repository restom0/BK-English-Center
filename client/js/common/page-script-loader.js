(function (global) {
  function resolveScriptUrl(scriptSpec) {
    if (typeof scriptSpec === 'string') {
      return new global.URL(scriptSpec, document.baseURI).href;
    }

    return new global.URL(scriptSpec.src, scriptSpec.baseUrl || document.baseURI).href;
  }

  function waitForScript(scriptElement) {
    return new Promise(function (resolve, reject) {
      scriptElement.addEventListener(
        'load',
        function () {
          resolve(scriptElement);
        },
        { once: true }
      );
      scriptElement.addEventListener('error', reject, { once: true });
    });
  }

  function loadScriptOnce(scriptSpec) {
    const scriptUrl = resolveScriptUrl(scriptSpec);
    const existingScript = Array.from(document.scripts).find(function (script) {
      return script.src === scriptUrl;
    });

    if (existingScript) {
      if (existingScript.dataset.bkScriptState === 'loading') {
        return waitForScript(existingScript);
      }

      return Promise.resolve(existingScript);
    }

    const scriptElement = document.createElement('script');
    scriptElement.src = scriptUrl;
    scriptElement.dataset.bkScriptState = 'loading';

    const loadPromise = waitForScript(scriptElement).then(function () {
      scriptElement.dataset.bkScriptState = 'loaded';
      return scriptElement;
    });

    document.head.appendChild(scriptElement);
    return loadPromise;
  }

  function loadScripts(scriptSpecs) {
    return scriptSpecs.reduce(function (chain, scriptSpec) {
      return chain.then(function () {
        return loadScriptOnce(scriptSpec);
      });
    }, Promise.resolve());
  }

  function runWhenWindowReady(callback) {
    if (document.readyState === 'complete') {
      callback();
      return;
    }

    global.addEventListener('load', callback, { once: true });
  }

  function loadScriptsWhenWindowReady(scriptSpecs, callback) {
    runWhenWindowReady(function () {
      loadScripts(scriptSpecs)
        .then(function () {
          if (typeof callback === 'function') {
            callback();
          }
        })
        .catch(function (error) {
          console.error('[BkPageScriptLoader] Failed to load page script.', error);
        });
    });
  }

  global.BkPageScriptLoader = {
    loadScriptOnce: loadScriptOnce,
    loadScripts: loadScripts,
    loadScriptsWhenWindowReady: loadScriptsWhenWindowReady,
    runWhenWindowReady: runWhenWindowReady,
  };
})(window);
