(function (global) {
  'use strict';

  const DEMO_USER = {
    id: 1,
    username: 'demo.student',
    name: 'Demo Student',
    email: 'demo.student@bkenglish.test',
    dateofbirth: '2004-04-18T00:00:00.000Z',
    sex: 'F',
    address: 'BK English Center Demo Campus',
    phone: '0900000001',
    image: '../../../img/user-avatar.jpg',
  };

  const courses = [
    {
      id: 1,
      name: 'IELTS Foundation Demo',
      short: 'Build a clear IELTS base with weekly feedback, mock tests, and speaking practice.',
      imgintro: '../../../img/IELTS-1.png',
      img: '../../../img/IELTS-2.png',
      intro:
        '<h2>IELTS Foundation Demo</h2><p>Dummy course data for the demo flow. Browse course, open detail, then visit My Courses and My Page.</p>',
      description:
        '<li class="course"><h3>1. Learning path</h3><p>Placement, vocabulary sprint, grammar clinic, weekly speaking lab, and monthly mock test.</p><img src="../../../img/IELTS-3.png" alt="" class="course-img"></li><li class="course"><h3>2. Demo outcome</h3><p>Student can track class status, attendance, score, tuition, and scholarship without live API data.</p></li>',
      paidStudent: 4200000,
      prizeStudent: 500000,
      paidTeacher: 3200000,
      prizeTeacher: 700000,
      maxAttendDate: 24,
    },
    {
      id: 2,
      name: 'TOEIC 4 Skills Demo',
      short: 'Practice listening, reading, speaking, and writing with measurable weekly progress.',
      imgintro: '../../../img/TOEIC-4skills.png',
      img: '../../../img/TOEIC-5.png',
      intro:
        '<h2>TOEIC 4 Skills Demo</h2><p>Dummy TOEIC data that mirrors the production API shape.</p>',
      description:
        '<li class="course"><h3>1. Focus</h3><p>Four-skill TOEIC practice, strategy sessions, and progress scoring.</p><img src="../../../img/TOEIC-4skills-struc.png" alt="" class="course-img"></li>',
      paidStudent: 3600000,
      prizeStudent: 300000,
      paidTeacher: 2800000,
      prizeTeacher: 500000,
      maxAttendDate: 20,
    },
    {
      id: 3,
      name: 'English Communication Demo',
      short: 'A practical speaking class for school, work, and interview conversations.',
      imgintro: '../../../img/course3-1.png',
      img: '../../../img/english-1.png',
      intro:
        '<h2>English Communication Demo</h2><p>Dummy communication course for demo browsing.</p>',
      description:
        '<li class="course"><h3>1. Practice</h3><p>Role play, pronunciation coaching, and short presentations.</p><img src="../../../img/SEP-1.png" alt="" class="course-img"></li>',
      paidStudent: 2400000,
      prizeStudent: 200000,
      paidTeacher: 2100000,
      prizeTeacher: 400000,
      maxAttendDate: 16,
    },
  ];

  const classes = [
    {
      id: 101,
      name: 'IELTS-D01',
      courseName: 'IELTS Foundation Demo',
      countStudent: 16,
      maxStudent: 24,
      schedule: 'Mon/Wed/Fri 18:00',
      address: 'Room A2',
      startDate: '2026-08-03T00:00:00.000Z',
      endDate: '2026-10-23T00:00:00.000Z',
    },
    {
      id: 102,
      name: 'TOEIC-D02',
      courseName: 'TOEIC 4 Skills Demo',
      countStudent: 20,
      maxStudent: 30,
      schedule: 'Tue/Thu 19:30',
      address: 'Room B1',
      startDate: '2026-08-10T00:00:00.000Z',
      endDate: '2026-10-15T00:00:00.000Z',
    },
    {
      id: 103,
      name: 'COMM-D03',
      courseName: 'English Communication Demo',
      countStudent: 12,
      maxStudent: 18,
      schedule: 'Sat/Sun 09:00',
      address: 'Room C3',
      startDate: '2026-08-15T00:00:00.000Z',
      endDate: '2026-09-27T00:00:00.000Z',
    },
  ];

  const students = [
    {
      id: 1,
      name: 'Demo Student',
      sex: 'F',
      gender: 'Nu',
      dateofbirth: '2004-04-18T00:00:00.000Z',
      address: 'BK English Center Demo Campus',
      phone: '0900000001',
      phoneNumber: '0900000001',
      email: 'demo.student@bkenglish.test',
      course: 'IELTS-D01',
    },
    {
      id: 2,
      name: 'Minh Nguyen',
      sex: 'M',
      gender: 'Nam',
      dateofbirth: '2003-11-02T00:00:00.000Z',
      address: 'Thu Duc City',
      phone: '0900000002',
      phoneNumber: '0900000002',
      email: 'minh.demo@bkenglish.test',
      course: 'TOEIC-D02',
    },
  ];

  const teachers = [
    {
      id: 11,
      name: 'Teacher Linh',
      sex: 'F',
      dateofbirth: '1991-06-12T00:00:00.000Z',
      address: 'District 1',
      phone: '0911000001',
      email: 'teacher.linh@bkenglish.test',
    },
    {
      id: 12,
      name: 'Teacher Nam',
      sex: 'M',
      dateofbirth: '1989-02-22T00:00:00.000Z',
      address: 'District 3',
      phone: '0911000002',
      email: 'teacher.nam@bkenglish.test',
    },
  ];

  const studentJoinClasses = [
    {
      id: 201,
      idStudent: 1,
      idClass: 101,
      name: 'Demo Student',
      className: 'IELTS-D01',
      teacherName: 'Teacher Linh',
      startDate: '2026-08-03T00:00:00.000Z',
      endDate: '2026-10-23T00:00:00.000Z',
      attendDate: 8,
      status: 0,
      listening: 7,
      writing: 6.5,
      reading: 7.5,
      speaking: 6.5,
      paid: 4200000,
      paidStatus: 0,
      prize: 500000,
      prizeStatus: 0,
    },
    {
      id: 202,
      idStudent: 1,
      idClass: 102,
      name: 'Demo Student',
      className: 'TOEIC-D02',
      teacherName: 'Teacher Nam',
      startDate: '2026-05-04T00:00:00.000Z',
      endDate: '2026-07-10T00:00:00.000Z',
      attendDate: 20,
      status: 1,
      listening: 8,
      writing: 7.5,
      reading: 8.5,
      speaking: 7,
      paid: 3600000,
      paidStatus: 1,
      prize: 300000,
      prizeStatus: 1,
    },
  ];

  const teacherJoinClasses = [
    {
      id: 301,
      idTeacher: 11,
      idClass: 101,
      name: 'Teacher Linh',
      className: 'IELTS-D01',
      startDate: '2026-08-03T00:00:00.000Z',
      endDate: '2026-10-23T00:00:00.000Z',
      attendDate: 8,
      status: 0,
      rating: 5,
      paid: 3200000,
      paidStatus: 0,
      prize: 700000,
      prizeStatus: 0,
    },
    {
      id: 302,
      idTeacher: 12,
      idClass: 102,
      name: 'Teacher Nam',
      className: 'TOEIC-D02',
      startDate: '2026-05-04T00:00:00.000Z',
      endDate: '2026-07-10T00:00:00.000Z',
      attendDate: 20,
      status: 1,
      rating: 4,
      paid: 2800000,
      paidStatus: 1,
      prize: 500000,
      prizeStatus: 1,
    },
  ];

  const logs = [
    {
      username: 'demo.student',
      role: 'student',
      action: 'Demo login',
      date: '2026-07-26T09:00:00.000Z',
      status: 1,
    },
  ];

  const registerLogs = [
    {
      username: 'demo.student',
      role: 'student',
      email: 'demo.student@bkenglish.test',
      date: '2026-07-26T09:05:00.000Z',
    },
  ];

  const emails = [
    { id: 1, email: 'staff.demo@bkenglish.test', role: 'staff' },
    { id: 2, email: 'admin.demo@bkenglish.test', role: 'admin' },
  ];

  const sponsors = [
    { id: 1, name: 'Demo Scholarship Fund', amount: 15000000, status: 1 },
    { id: 2, name: 'Community English Grant', amount: 8500000, status: 0 },
  ];

  const state = {
    user: DEMO_USER,
    courses: courses,
    classes: classes,
    students: students,
    teachers: teachers,
    studentJoinClasses: studentJoinClasses,
    teacherJoinClasses: teacherJoinClasses,
    logs: logs,
    registerLogs: registerLogs,
    emails: emails,
    sponsors: sponsors,
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function seedState() {
    return clone(state);
  }

  global.BkDemoData = {
    seedState: seedState,
    clone: clone,
  };
})(window);
