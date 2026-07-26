(function (global) {
  'use strict';

  const MODE_KEY = 'bkec-demo-mode';
  const STATE_KEY = 'bkec-demo-state';
  const AUTH_BACKUP_KEY = 'bkec-demo-auth-backup';
  const DEMO_TOKEN = 'bkec-demo-token';
  const AUTH_KEYS = ['role', 'apitoken', 'user'];

  function clone(value) {
    if (global.BkDemoData && typeof global.BkDemoData.clone === 'function') {
      return global.BkDemoData.clone(value);
    }
    return JSON.parse(JSON.stringify(value));
  }

  function seedState() {
    if (global.BkDemoData && typeof global.BkDemoData.seedState === 'function') {
      return global.BkDemoData.seedState();
    }
    return { data: [] };
  }

  function isEnabled() {
    return localStorage.getItem(MODE_KEY) === '1';
  }

  function loadState() {
    if (!isEnabled()) return seedState();
    try {
      const stored = JSON.parse(localStorage.getItem(STATE_KEY));
      if (stored && typeof stored === 'object') return stored;
    } catch {
      localStorage.removeItem(STATE_KEY);
    }
    const state = seedState();
    saveState(state);
    return state;
  }

  function saveState(state) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }

  function saveAuthBackup() {
    if (localStorage.getItem(AUTH_BACKUP_KEY)) return;
    const backup = {};
    AUTH_KEYS.forEach(function (key) {
      backup[key] = localStorage.getItem(key);
    });
    localStorage.setItem(AUTH_BACKUP_KEY, JSON.stringify(backup));
  }

  function restoreAuthBackup() {
    let backup = {};
    try {
      backup = JSON.parse(localStorage.getItem(AUTH_BACKUP_KEY)) || {};
    } catch {
      backup = {};
    }
    AUTH_KEYS.forEach(function (key) {
      if (backup[key] === null || backup[key] === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, backup[key]);
      }
    });
    localStorage.removeItem(AUTH_BACKUP_KEY);
  }

  function seedDemoAuth() {
    const state = loadState();
    localStorage.setItem('role', 'student');
    localStorage.setItem('apitoken', DEMO_TOKEN);
    localStorage.setItem('user', JSON.stringify(state.user));
  }

  function routeTo(route, fallback) {
    if (typeof global.routeHref === 'function') {
      global.location.assign(global.routeHref(route));
      return;
    }
    global.location.assign(fallback);
  }

  function start() {
    saveAuthBackup();
    localStorage.setItem(MODE_KEY, '1');
    saveState(seedState());
    seedDemoAuth();
    syncButtons();
    routeTo('courses', '../pages/public/courses/index.html');
  }

  function stop() {
    localStorage.removeItem(MODE_KEY);
    localStorage.removeItem(STATE_KEY);
    restoreAuthBackup();
    syncButtons();
    routeTo('home', '../pages/public/home/index.html');
  }

  function normalizePath(url) {
    const anchor = document.createElement('a');
    anchor.href = String(url || '');
    let path = anchor.pathname || String(url || '');
    if (!path.startsWith('/')) path = `/${path}`;
    if (path === '/api') return '/';
    if (path.startsWith('/api/')) path = path.slice(4);
    return path.replace(/\/+$/, '') || '/';
  }

  function getMethod(options) {
    return String(options.type || options.method || 'get').toUpperCase();
  }

  function ok(data) {
    return data === undefined ? { check: true } : clone(data);
  }

  function byStudent(rows) {
    return rows.filter(function (row) {
      return Number(row.idStudent) === 1;
    });
  }

  function makeFinanceRows(rows, amountKey, statusKey) {
    return byStudent(rows).map(function (row) {
      return {
        id: row.id,
        idStudent: row.idStudent,
        name: row.name,
        className: row.className,
        paid: amountKey === 'paid' ? row.paid : undefined,
        paidStatus: statusKey === 'paidStatus' ? row.paidStatus : undefined,
        prize: amountKey === 'prize' ? row.prize : undefined,
        prizeStatus: statusKey === 'prizeStatus' ? row.prizeStatus : undefined,
      };
    });
  }

  function updateRow(rows, id, patch) {
    rows.forEach(function (row) {
      if (Number(row.id) === Number(id)) Object.assign(row, patch);
    });
  }

  function addStudentClass(state, data) {
    const student = state.students.find(function (item) {
      return Number(item.id) === Number(data.idStudent);
    });
    const classInfo = state.classes.find(function (item) {
      return Number(item.id) === Number(data.idClass);
    });
    if (!student || !classInfo) return;
    state.studentJoinClasses.push({
      id: Date.now(),
      idStudent: student.id,
      idClass: classInfo.id,
      name: student.name,
      className: classInfo.name,
      teacherName: 'Teacher Linh',
      startDate: classInfo.startDate,
      endDate: classInfo.endDate,
      attendDate: 0,
      status: -1,
      listening: 0,
      speaking: 0,
      writing: 0,
      reading: 0,
      paid: 0,
      paidStatus: 0,
      prize: 0,
      prizeStatus: 0,
    });
  }

  function handleWrite(state, path, data) {
    if (path === '/users/login') {
      return { check: true, role: 'student' };
    }
    if (path === '/users/user') {
      return { check: true };
    }
    if (path === '/studentjoinclasses/rating') {
      updateRow(state.studentJoinClasses, data.id, {
        listening: Number(data.listening),
        reading: Number(data.reading),
        writing: Number(data.writing),
        speaking: Number(data.speaking),
      });
      return ok();
    }
    if (path === '/studentjoinclasses/date') {
      const patch = {
        attendDate: Number(data.attendDate),
      };
      if (data.status !== undefined) patch.status = Number(data.status);
      updateRow(state.studentJoinClasses, data.id, patch);
      return ok();
    }
    if (path === '/studentjoinclasses/class') {
      addStudentClass(state, data || {});
      return ok();
    }
    if (path === '/studentjoinclasses/salary') {
      updateRow(state.studentJoinClasses, data.id, { paidStatus: Number(data.paidStatus) });
      return ok();
    }
    if (path === '/studentjoinclasses/prize') {
      updateRow(state.studentJoinClasses, data.id, { prizeStatus: Number(data.prizeStatus) });
      return ok();
    }
    return ok();
  }

  function resolveResponse(options) {
    const method = getMethod(options);
    const path = normalizePath(options.url);
    const state = loadState();
    let response;

    if (method !== 'GET') {
      response = handleWrite(state, path, options.data || {});
      saveState(state);
      return response;
    }

    if (path === '/users/info') response = { data: state.user };
    else if (path === '/users/login') response = { check: true, role: 'student' };
    else if (path === '/courses/all' || path === '/courses') response = { data: state.courses };
    else if (path === '/classes') response = { data: state.classes };
    else if (path === '/students') response = { data: state.students };
    else if (path === '/teachers') response = { data: state.teachers };
    else if (path === '/studentjoinclasses/student')
      response = { data: byStudent(state.studentJoinClasses) };
    else if (path === '/studentjoinclasses/salary') {
      response = { data: makeFinanceRows(state.studentJoinClasses, 'paid', 'paidStatus') };
    } else if (path === '/studentjoinclasses/prize') {
      response = { data: makeFinanceRows(state.studentJoinClasses, 'prize', 'prizeStatus') };
    } else if (path === '/studentjoinclasses/date') response = { data: state.classes };
    else if (path === '/studentjoinclasses') response = { data: state.studentJoinClasses };
    else if (path === '/teacherjoinclasses/teacher') response = { data: state.teacherJoinClasses };
    else if (path === '/teacherjoinclasses/salary') response = { data: state.teacherJoinClasses };
    else if (path === '/teacherjoinclasses/prize') response = { data: state.teacherJoinClasses };
    else if (path === '/teacherjoinclasses/date') response = { data: state.classes };
    else if (path === '/teacherjoinclasses') response = { data: state.teacherJoinClasses };
    else if (path === '/admins/stat') {
      response = { data: { countAccess: 128, countTeacher: 2, countStudent: 2, countStaff: 1 } };
    } else if (path === '/staffs/stat') {
      response = { data: { countTeacher: 2, countStudent: 2, countStaff: 1 } };
    } else if (path === '/logs') response = { data: state.logs };
    else if (path === '/register-logs') response = { data: state.registerLogs };
    else if (path === '/emails') response = { data: state.emails };
    else if (path === '/sponsors') response = { data: state.sponsors };
    else if (path === '/admins/income')
      response = { data: [{ month: 7, year: 2026, amount: 7800000 }] };
    else if (path === '/admins/outcome')
      response = { data: [{ month: 7, year: 2026, amount: 6000000 }] };
    else if (path.startsWith('/send')) response = { check: true };
    else response = { data: [], demo: true };

    return ok(response);
  }

  function installAjaxAdapter() {
    if (!global.jQuery || !global.jQuery.ajax) return;
    const jq = global.jQuery;
    if (jq.ajax.__bkDemoWrapped) return;

    const originalAjax = jq.ajax;
    const demoAjax = function (first, second) {
      const options =
        typeof first === 'string' ? { ...(second || {}), url: first } : { ...(first || {}) };
      if (!isEnabled()) return originalAjax.apply(this, arguments);

      const deferred = jq.Deferred();
      const jqXHR = deferred.promise({
        status: 200,
        responseJSON: null,
        abort: function () {
          deferred.reject(jqXHR, 'abort', 'abort');
        },
      });

      setTimeout(function () {
        try {
          const response = resolveResponse(options);
          jqXHR.responseJSON = response;
          if (typeof options.success === 'function') {
            options.success(response, 'success', jqXHR);
          }
          deferred.resolve(response, 'success', jqXHR);
        } catch (error) {
          jqXHR.status = 500;
          jqXHR.responseJSON = { msg: error.message || 'Demo data error' };
          if (typeof options.error === 'function') {
            options.error(jqXHR, 'error', error);
          }
          deferred.reject(jqXHR, 'error', error);
        }
      }, 0);

      return jqXHR;
    };

    demoAjax.__bkDemoWrapped = true;
    demoAjax.__bkDemoOriginal = originalAjax;
    jq.ajax = demoAjax;
    global.$ = jq;
  }

  function buttonLabel() {
    return isEnabled() ? 'Live data' : 'Demo';
  }

  function syncButtons() {
    document.querySelectorAll('[data-demo-toggle]').forEach(function (button) {
      button.textContent = buttonLabel();
      button.setAttribute('aria-pressed', String(isEnabled()));
      button.title = isEnabled() ? 'Return to live API data' : 'Use dummy demo data';
      button.classList.toggle('bk-demo-toggle--active', isEnabled());
    });
  }

  function createButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'bk-demo-toggle';
    button.dataset.demoToggle = 'true';
    button.className =
      'bk-demo-toggle btn btn-sm btn-outline-primary ml-2 mr-2 my-2 my-lg-0 px-3 py-2 text-sm font-medium rounded-lg border border-sky-500 text-sky-700 hover:bg-sky-50 dark:text-sky-300 dark:border-sky-400';
    button.addEventListener('click', function () {
      if (isEnabled()) stop();
      else start();
    });
    return button;
  }

  function mountButton() {
    const button = document.getElementById('bk-demo-toggle') || createButton();
    const publicSearch = document.querySelector('.navbar .form-inline');
    const publicLogin = document.querySelector('.navbar #nav__login');
    const publicCollapse = document.querySelector('.navbar #navbarSupportedContent');
    const appTopbar = document.querySelector('#navbar-user .flex.items-center');

    if (publicSearch && publicSearch.parentNode) {
      publicSearch.insertAdjacentElement('afterend', button);
    } else if (publicLogin && publicLogin.parentNode) {
      publicLogin.parentNode.insertBefore(button, publicLogin);
    } else if (appTopbar) {
      appTopbar.insertBefore(button, appTopbar.firstChild);
    } else if (publicCollapse) {
      publicCollapse.appendChild(button);
    }
    syncButtons();
  }

  if (isEnabled()) seedDemoAuth();
  installAjaxAdapter();

  document.addEventListener('DOMContentLoaded', function () {
    installAjaxAdapter();
    mountButton();
  });

  global.BkDemoMode = {
    isEnabled: isEnabled,
    start: start,
    stop: stop,
    mountButton: mountButton,
    syncButtons: syncButtons,
    token: DEMO_TOKEN,
  };
})(window);
