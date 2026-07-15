/**
 * components/components.js — BK English Center
 * Injects sidebar and topbar into placeholder elements on each protected page.
 *
 * Usage in HTML:
 *   <body data-sidebar="admin">   or   <body data-sidebar="staff">
 *   <div id="bk-sidebar"></div>
 *   Load order: jquery → config → utils → i18n/labels.js → components.js → navigation.js
 */

/* ── SVG icon library ─────────────────────────────────────────────────────── */
const BK_ICONS = {
  chart:
    '<svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21"><path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/><path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/></svg>',
  dollar:
    '<svg class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1.75 15.363a4.954 4.954 0 0 0 2.638 1.574c2.345.572 4.653-.434 5.155-2.247.502-1.813-1.313-3.79-3.657-4.364-2.344-.574-4.16-2.551-3.658-4.364.502-1.813 2.81-2.818 5.155-2.246A4.97 4.97 0 0 1 10 5.264M6 17.097v1.82m0-17.5v2.138"/></svg>',
  person_card:
    '<svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/></svg>',
  calendar:
    '<svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z"/></svg>',
  pay: '<svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/></svg>',
  badge:
    '<svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/><path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/></svg>',
  file: '<svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/></svg>',
  chevron:
    '<svg class="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>',
  hamburger:
    '<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path></svg>',
  bell: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM1.866 8.832a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z"/></svg>',
  chat: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/></svg>',
  close:
    '<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>',
  school:
    '<span class="material-symbols-outlined flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">school</span>',
  right_click:
    '<span class="material-symbols-outlined text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">right_click</span>',
  calendar_month:
    '<span class="material-symbols-outlined flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">calendar_month</span>',
};

window.BK_ICONS = BK_ICONS;

function _bkRouteHref(route, fallback) {
  return typeof routeHref === 'function' ? routeHref(route) : fallback;
}

/* ── HTML builders ────────────────────────────────────────────────────────── */

/** Build a collapsible sidebar section */
function _bkSection(id, icon, labelKey, items) {
  const itemsHtml = items
    .map(function (item) {
      return (
        `<li><a href="${item.href}" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">${
          item.icon
        }<span class="flex-1 ml-3 whitespace-nowrap" data-i18n="${item.key}">${item.label}</span>` +
        `</a></li>`
      );
    })
    .join('');

  return (
    `<button type="button" style="margin-top:1vh;" class="px-3 flex items-center w-full text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700" aria-controls="${id}" data-collapse-toggle="${id}">` +
    `<span class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">${
      icon
    }<span class="ml-3 mr-2" data-i18n="${labelKey}">${typeof i18n !== 'undefined' ? i18n.t(labelKey) : labelKey}</span>${
      BK_ICONS.chevron
    }</span></button>` +
    `<ul id="${id}" class="space-y-2 px-3">${itemsHtml}</ul>`
  );
}

/** Build the sidebar footer */
function _bkFooter(homeHref) {
  return (
    `<div class="fixed bottom-0 left-0 w-64 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">` +
    `<div class="px-4 py-2 md:flex md:items-center md:justify-between">` +
    `<span class="text-sm text-gray-500 dark:text-gray-300 sm:text-center">` +
    `<a href="${homeHref}">BKEC™</a>. <span data-i18n="sidebar.copyright">All Rights Reserved</span>.` +
    `</span>` +
    `</div></div>`
  );
}

/** Build admin sidebar HTML */
function _bkAdminSidebar() {
  const homeHref = _bkRouteHref('admin', '../pages/admin/dashboard/index.html');

  const statSection =
    `<button type="button" style="margin-top:1vh;" class="px-3 flex items-center w-full text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="sb-stat" data-collapse-toggle="sb-stat">` +
    `<span class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">${
      BK_ICONS.chart
    }<span class="ml-3 mr-2" data-i18n="sidebar.stat">Thống kê</span>${
      BK_ICONS.chevron
    }</span></button>` +
    `<ul id="sb-stat" class="space-y-2 px-3">` +
    `<li><a href="${_bkRouteHref('stat-financial', '../pages/staff/stat-financial/index.html')}" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">${
      BK_ICONS.dollar
    }<span class="flex-1 ml-3 whitespace-nowrap" data-i18n="sidebar.stat_financial">Thống kê tài chính</span></a></li>` +
    `<li><a href="${_bkRouteHref('stat-access', '../pages/staff/stat-access/index.html')}" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">${
      BK_ICONS.right_click
    }<span class="flex-1 ml-3 whitespace-nowrap" data-i18n="sidebar.stat_access">Thống kê truy cập</span></a></li>` +
    `</ul>`;

  const classSection = _bkSection('sb-class-admin', BK_ICONS.chart, 'sidebar.manage_class', [
    {
      href: _bkRouteHref('stat-class', '../pages/staff/stat-class/index.html'),
      icon: BK_ICONS.school,
      key: 'sidebar.classes',
      label: 'Lớp học',
    },
    {
      href: _bkRouteHref('manage-courses', '../pages/staff/manage-courses/index.html'),
      icon: BK_ICONS.calendar_month,
      key: 'sidebar.courses',
      label: 'Khóa học',
    },
  ]);

  const staffSection = _bkSection('sb-staff', BK_ICONS.chart, 'sidebar.manage_staff', [
    {
      href: _bkRouteHref('staff-info', '../pages/staff/profile/index.html'),
      icon: BK_ICONS.person_card,
      key: 'sidebar.staff_info',
      label: 'Thông tin nhân viên',
    },
    {
      href: _bkRouteHref('staff-attendance', '../pages/staff/attendance/index.html'),
      icon: BK_ICONS.calendar,
      key: 'sidebar.attendance',
      label: 'Chấm công',
    },
    {
      href: _bkRouteHref('staff-pay', '../pages/staff/payment/index.html'),
      icon: BK_ICONS.pay,
      key: 'sidebar.salary',
      label: 'Lương và thưởng',
    },
  ]);

  const stuTeaLink =
    `<button type="button" style="margin-top:1vh;" class="px-3 flex items-center w-full text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700">` +
    `<span class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">${
      BK_ICONS.chart
    }<span class="ml-3"><a href="${_bkRouteHref('staff', '../pages/staff/dashboard/index.html')}" data-i18n="sidebar.student_teacher">Học viên và giảng viên</a></span>` +
    `</span></button>`;

  return (
    `<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"><span class="sr-only">Open sidebar</span>${BK_ICONS.hamburger}</button>` +
    `<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">` +
    `<div class="h-full pb-16 bg-white dark:bg-gray-800 space-y-2 font-medium overflow-y-auto">${
      statSection
    }${classSection}${staffSection}${stuTeaLink}${_bkFooter(homeHref)}</div></aside>`
  );
}

/** Build staff sidebar HTML */
function _bkStaffSidebar() {
  const homeHref = _bkRouteHref('staff', '../pages/staff/dashboard/index.html');

  const studentSection = _bkSection('sb-student', BK_ICONS.chart, 'sidebar.manage_student', [
    {
      href: _bkRouteHref('student-info', '../pages/student/profile/index.html'),
      icon: BK_ICONS.person_card,
      key: 'sidebar.student_info',
      label: 'Thông tin học viên',
    },
    {
      href: _bkRouteHref('student-attendance', '../pages/student/attendance/index.html'),
      icon: BK_ICONS.calendar,
      key: 'sidebar.daily_attend',
      label: 'Điểm danh hằng ngày',
    },
    {
      href: _bkRouteHref('student-marks', '../pages/student/marks/index.html'),
      icon: BK_ICONS.badge,
      key: 'sidebar.student_mark',
      label: 'Điểm của học viên',
    },
    {
      href: _bkRouteHref('student-pay', '../pages/student/payment/index.html'),
      icon: BK_ICONS.pay,
      key: 'sidebar.tuition',
      label: 'Học phí và học bổng',
    },
  ]);

  const teacherSection = _bkSection('sb-teacher', BK_ICONS.chart, 'sidebar.manage_teacher', [
    {
      href: _bkRouteHref('teacher-info', '../pages/teacher/profile/index.html'),
      icon: BK_ICONS.person_card,
      key: 'sidebar.teacher_info',
      label: 'Thông tin giảng viên',
    },
    {
      href: _bkRouteHref('teacher-attendance', '../pages/teacher/attendance/index.html'),
      icon: BK_ICONS.calendar,
      key: 'sidebar.attendance',
      label: 'Chấm công',
    },
    {
      href: _bkRouteHref('teacher-rate', '../pages/teacher/rating/index.html'),
      icon: BK_ICONS.badge,
      key: 'sidebar.teacher_rate',
      label: 'Đánh giá giảng viên',
    },
    {
      href: _bkRouteHref('teacher-pay', '../pages/teacher/payment/index.html'),
      icon: BK_ICONS.pay,
      key: 'sidebar.salary',
      label: 'Lương và thưởng',
    },
    {
      href: _bkRouteHref('teacher-files', '../pages/teacher/files/index.html'),
      icon: BK_ICONS.file,
      key: 'sidebar.documents',
      label: 'Tài liệu',
    },
  ]);

  const classSection = _bkSection('sb-class-staff', BK_ICONS.chart, 'sidebar.manage_class', [
    {
      href: _bkRouteHref('stat-class', '../pages/staff/stat-class/index.html'),
      icon: BK_ICONS.school,
      key: 'sidebar.classes',
      label: 'Lớp học',
    },
    {
      href: _bkRouteHref('manage-courses', '../pages/staff/manage-courses/index.html'),
      icon: BK_ICONS.calendar_month,
      key: 'sidebar.courses',
      label: 'Khóa học',
    },
  ]);

  return (
    `<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"><span class="sr-only">Open sidebar</span>${BK_ICONS.hamburger}</button>` +
    `<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">` +
    `<div class="h-full pb-16 bg-white dark:bg-gray-800 space-y-2 font-medium overflow-y-auto">${
      studentSection
    }${teacherSection}${classSection}${_bkFooter(homeHref)}</div></aside>`
  );
}

/** Build topbar HTML (common to all protected pages) */
function _bkTopbar(type) {
  const homeHref =
    type === 'admin'
      ? _bkRouteHref('admin', '../pages/admin/dashboard/index.html')
      : _bkRouteHref('staff', '../pages/staff/dashboard/index.html');
  return (
    `<nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">` +
    `<div class="px-3 py-3 lg:px-5 lg:pl-3">` +
    `<div class="flex items-center justify-between">` +
    // Right: user menu
    `<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">` +
    `<div class="flex items-center ml-3">` +
    `<button class="mr-5">${BK_ICONS.bell}</button>` +
    `<button class="mr-5">${BK_ICONS.chat}</button>` +
    `<div>` +
    `<button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" data-dropdown-toggle="dropdown-user">` +
    `<span class="sr-only">Open user menu</span>` +
    `<img id="user-avt" class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">` +
    `</button>` +
    `</div>` +
    `<div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">` +
    `<div class="px-4 py-3" role="none">` +
    `<p class="text-sm text-gray-900 dark:text-white" id="title-name">—</p>` +
    `<p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" id="title-email">—</p>` +
    `</div>` +
    `<ul class="py-1" role="none">` +
    `<li><a href="#" data-modal-target="default-modal" data-modal-toggle="default-modal" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" id="userinfo" role="menuitem" data-i18n="sidebar.account_info">Thông tin tài khoản</a></li>` +
    `<li><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" id="signout" role="menuitem" data-i18n="nav.logout">Đăng xuất</a></li>` +
    `</ul></div>` +
    `</div></div>` +
    // Left: logo + mobile toggle
    `<div class="flex items-center justify-start">` +
    `<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">` +
    `<span class="sr-only">Open sidebar</span>${BK_ICONS.hamburger}</button>` +
    `<a href="${homeHref}" class="flex ml-2 md:mr-24">` +
    `<img src="../img/image0.png" class="h-8 mr-3" alt="BKEC Logo"/>` +
    `<span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">BK English Center</span>` +
    `</a>` +
    `</div>` +
    `</div></div></nav>` +
    // User info modal (shared across all pages)
    `<div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">` +
    `<div class="relative p-4 w-full max-w-2xl max-h-full">` +
    `<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">` +
    `<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">` +
    `<h3 class="text-xl font-semibold text-gray-900 dark:text-white" data-i18n="sidebar.account_info">Thông tin tài khoản</h3>` +
    `<button id="closeBtn" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">${
      BK_ICONS.close
    }<span class="sr-only">Close modal</span></button>` +
    `</div>` +
    `<div class="p-4 md:p-5 space-y-4">` +
    `<div id="userModal" class="grid grid-cols-3 gap-4 p-6 mb-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"></div>` +
    `</div></div></div></div>`
  );
}

/* ── Main injection ────────────────────────────────────────────────────────── */
$(function () {
  const type = $('body').data('sidebar');
  if (!type) return; // Not a protected page, skip

  // Build and inject sidebar
  const sidebarHtml = type === 'admin' ? _bkAdminSidebar() : _bkStaffSidebar();
  const topbarHtml = _bkTopbar(type);

  $('#bk-sidebar').replaceWith(sidebarHtml);
  $('#bk-topbar').replaceWith(topbarHtml);

  if (window.BkRouter) {
    window.BkRouter.bind(document);
  }

  // Re-initialize Flowbite for dynamically added dropdown/drawer elements
  if (typeof initFlowbite === 'function') {
    initFlowbite();
  }

  // Apply i18n translations to newly injected HTML
  if (typeof i18n !== 'undefined') {
    i18n.init();
  }

  // Init currency converter (fetches live rates when locale != VND)
  if (typeof BkCurrency !== 'undefined') {
    BkCurrency.init();
  }
});
