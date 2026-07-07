// =============================================================
// Prisma seed script — BK English Center
// Usage:  npx prisma db seed
//         node prisma/seed.js
//
// Seeds: 10 admins, 20 staff, 40 teachers, 120 students,
//        10 courses, 30 classes, enrolments, sponsor records,
//        email whitelist, logs.
// =============================================================

'use strict';

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { randomInt } = require('node:crypto');

const prisma = new PrismaClient();

// ── Helpers ────────────────────────────────────────────────────

const SALT_ROUNDS = 10;
const hash = (pw) => bcrypt.hash(pw, SALT_ROUNDS);

// Use a CSPRNG even for seed data — Math.random() trips CodeQL's
// insecure-randomness rule. randomInt(min, max) is exclusive of max.
const rand = (min, max) => randomInt(min, max + 1);
const pick = (arr) => arr[rand(0, arr.length - 1)];

const SEXES = ['male', 'female'];
const CITIES = ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Can Tho', 'Hue', 'Hai Phong', 'Bien Hoa'];
const STREETS = ['Nguyen Trai', 'Le Loi', 'Tran Hung Dao', 'Pham Van Dong', 'Vo Thi Sau'];
const FIRST = [
  'An',
  'Binh',
  'Cuong',
  'Dung',
  'Giang',
  'Ha',
  'Huong',
  'Khanh',
  'Lan',
  'Minh',
  'Nam',
  'Ngoc',
  'Phuong',
  'Quang',
  'Son',
  'Thao',
  'Tuan',
  'Van',
  'Xuan',
  'Yen',
];
const LAST = ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Huynh', 'Vo', 'Vu', 'Dang', 'Bui'];

const dob = (minAge, maxAge) => {
  const year = new Date().getFullYear() - rand(minAge, maxAge);
  const month = rand(1, 12);
  const day = rand(1, 28);
  return new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
};

const fullName = () => `${pick(LAST)} ${pick(FIRST)}`;
const phone = () => `0${rand(3, 9)}${String(rand(10_000_000, 99_999_999))}`;
const address = () => `${rand(1, 200)} ${pick(STREETS)}, ${pick(CITIES)}`;
const emailFor = (username) => `${username}@bkec.edu.vn`;

// ── Course definitions ─────────────────────────────────────────

const COURSES = [
  {
    name: 'IELTS Foundation',
    short: 'Build your IELTS base score',
    maxAttendDate: 40,
    paidStudent: 3_500_000,
    prizeStudent: 500_000,
    paidTeacher: 5_000_000,
    prizeTeacher: 1_000_000,
  },
  {
    name: 'IELTS Intermediate',
    short: 'Push your band score to 6.0',
    maxAttendDate: 45,
    paidStudent: 4_000_000,
    prizeStudent: 600_000,
    paidTeacher: 5_500_000,
    prizeTeacher: 1_100_000,
  },
  {
    name: 'IELTS Advanced',
    short: 'Target band 7.0 and above',
    maxAttendDate: 50,
    paidStudent: 4_500_000,
    prizeStudent: 700_000,
    paidTeacher: 6_000_000,
    prizeTeacher: 1_200_000,
  },
  {
    name: 'TOEIC 450',
    short: 'Achieve TOEIC 450+',
    maxAttendDate: 35,
    paidStudent: 3_000_000,
    prizeStudent: 400_000,
    paidTeacher: 4_500_000,
    prizeTeacher: 900_000,
  },
  {
    name: 'TOEIC 700',
    short: 'Achieve TOEIC 700+',
    maxAttendDate: 40,
    paidStudent: 3_800_000,
    prizeStudent: 550_000,
    paidTeacher: 5_200_000,
    prizeTeacher: 1_000_000,
  },
  {
    name: 'Business English',
    short: 'English for the workplace',
    maxAttendDate: 30,
    paidStudent: 3_200_000,
    prizeStudent: 450_000,
    paidTeacher: 4_800_000,
    prizeTeacher: 950_000,
  },
  {
    name: 'Conversational English',
    short: 'Speak confidently in daily life',
    maxAttendDate: 25,
    paidStudent: 2_800_000,
    prizeStudent: 350_000,
    paidTeacher: 4_200_000,
    prizeTeacher: 800_000,
  },
  {
    name: 'Academic Writing',
    short: 'Master essay and report writing',
    maxAttendDate: 30,
    paidStudent: 3_300_000,
    prizeStudent: 450_000,
    paidTeacher: 4_700_000,
    prizeTeacher: 900_000,
  },
  {
    name: 'Pronunciation Pro',
    short: 'Clear and accurate pronunciation',
    maxAttendDate: 20,
    paidStudent: 2_500_000,
    prizeStudent: 300_000,
    paidTeacher: 3_800_000,
    prizeTeacher: 700_000,
  },
  {
    name: 'Kids English A1',
    short: 'English for children aged 6–10',
    maxAttendDate: 30,
    paidStudent: 2_200_000,
    prizeStudent: 300_000,
    paidTeacher: 3_500_000,
    prizeTeacher: 650_000,
  },
];

const SCHEDULES = [
  'Mon-Wed-Fri 18:00-20:00',
  'Tue-Thu-Sat 08:00-10:00',
  'Sat-Sun 08:00-11:00',
  'Mon-Wed 19:00-21:00',
  'Tue-Thu 17:30-19:30',
];

// ── Main seed function ─────────────────────────────────────────

async function main() {
  console.log('🌱  Starting seed…');

  // ── 1. Courses ───────────────────────────────────────────────
  console.log('  → Courses');
  const courseRecs = [];
  for (const c of COURSES) {
    const rec = await prisma.course.upsert({
      where: { name: c.name },
      update: {},
      create: {
        name: c.name,
        intro: `Introduction to ${c.name}`,
        short: c.short,
        description: `Full description of the ${c.name} course. This course covers all key topics.`,
        img: `/assets/courses/${c.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        imgintro: `/assets/courses/${c.name.toLowerCase().replace(/\s+/g, '-')}-intro.jpg`,
        paidStudent: c.paidStudent,
        prizeStudent: c.prizeStudent,
        paidTeacher: c.paidTeacher,
        prizeTeacher: c.prizeTeacher,
        maxAttendDate: c.maxAttendDate,
      },
    });
    courseRecs.push(rec);
  }

  // ── 2. Admin users ───────────────────────────────────────────
  console.log('  → Admins');
  for (let i = 1; i <= 10; i++) {
    const username = `admin${String(i).padStart(2, '0')}`;
    const pw = await hash('Admin@1234');
    const name = fullName();
    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: { username, password: pw, email: emailFor(username), role: 'admin' },
    });
    await prisma.admin.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name,
        sex: pick(SEXES),
        dateofbirth: dob(30, 55),
        phone: phone(),
        address: address(),
      },
    });
  }

  // ── 3. Staff users ───────────────────────────────────────────
  console.log('  → Staff');
  for (let i = 1; i <= 20; i++) {
    const username = `staff${String(i).padStart(2, '0')}`;
    const pw = await hash('Staff@1234');
    const name = fullName();
    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: { username, password: pw, email: emailFor(username), role: 'staff' },
    });
    const staffRec = await prisma.staff.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name,
        sex: pick(SEXES),
        dateofbirth: dob(22, 45),
        phone: phone(),
        address: address(),
      },
    });
    // Create ManageStaff records for past 3 months
    const now = new Date();
    for (let m = 0; m < 3; m++) {
      const month = ((now.getMonth() - m + 12) % 12) + 1;
      const year = now.getFullYear() - (now.getMonth() - m < 0 ? 1 : 0);
      await prisma.manageStaff.upsert({
        where: { idStaff_month_year: { idStaff: staffRec.id, month, year } },
        update: {},
        create: {
          idStaff: staffRec.id,
          month,
          year,
          attendDate: rand(18, 26),
          paid: rand(5_000_000, 8_000_000),
          paidStatus: 1,
          prize: m === 0 ? rand(500_000, 1_500_000) : null,
          prizeStatus: m === 0 ? 1 : null,
        },
      });
    }
  }

  // ── 4. Teachers ──────────────────────────────────────────────
  console.log('  → Teachers');
  const teacherIds = [];
  for (let i = 1; i <= 40; i++) {
    const username = `teacher${String(i).padStart(2, '0')}`;
    const pw = await hash('Teacher@1234');
    const name = fullName();
    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: { username, password: pw, email: emailFor(username), role: 'teacher' },
    });
    await prisma.teacher.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name,
        sex: pick(SEXES),
        dateofbirth: dob(24, 50),
        phone: phone(),
        address: address(),
      },
    });
    teacherIds.push(user.id);
  }

  // ── 5. Students ──────────────────────────────────────────────
  console.log('  → Students');
  const studentIds = [];
  for (let i = 1; i <= 120; i++) {
    const username = `student${String(i).padStart(3, '0')}`;
    const pw = await hash('Student@1234');
    const name = fullName();
    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: { username, password: pw, email: emailFor(username), role: 'student' },
    });
    await prisma.student.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name,
        sex: pick(SEXES),
        dateofbirth: dob(15, 35),
        phone: phone(),
        address: address(),
      },
    });
    studentIds.push(user.id);
  }

  // ── 6. Classes (3 per course = 30 total) ─────────────────────
  console.log('  → Classes');
  const classRecs = [];
  let classIdx = 1;
  for (const course of courseRecs) {
    for (let c = 1; c <= 3; c++) {
      const startDate = new Date(2025, rand(0, 5), rand(1, 15));
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 3);
      const name = `${course.name} - C${String(classIdx).padStart(2, '0')}`;
      const cls = await prisma.class.upsert({
        where: { name },
        update: {},
        create: {
          name,
          idCourse: course.id,
          startDate,
          endDate,
          maxStudent: rand(15, 30),
          address: `Room ${rand(101, 315)}, BK English Center`,
          schedule: pick(SCHEDULES),
        },
      });
      classRecs.push(cls);
      classIdx++;

      // Assign a teacher to this class
      const teacherId = pick(teacherIds);
      await prisma.teacherJoinClass
        .upsert({
          where: { id: classIdx * 100 },
          update: {},
          create: {
            idTeacher: teacherId,
            idClass: cls.id,
            attendDate: rand(5, course.maxAttendDate),
            status: 0,
            rating: rand(3, 5),
            paidStatus: 1,
          },
        })
        .catch(() => {
          // upsert by composite not supported for non-unique; use findFirst + create
          return prisma.teacherJoinClass
            .findFirst({
              where: { idTeacher: teacherId, idClass: cls.id },
            })
            .then((existing) => {
              if (!existing) {
                return prisma.teacherJoinClass.create({
                  data: {
                    idTeacher: teacherId,
                    idClass: cls.id,
                    attendDate: rand(5, course.maxAttendDate),
                    status: 0,
                    rating: rand(3, 5),
                    paidStatus: 1,
                  },
                });
              }
            });
        });
    }
  }

  // ── 7. Student enrolments (4 per class = 120 total) ──────────
  console.log('  → StudentJoinClass');
  let studentPtr = 0;
  for (const cls of classRecs) {
    const course = courseRecs.find((c) => c.id === cls.idCourse);
    for (let s = 0; s < 4; s++) {
      const studentId = studentIds[studentPtr % studentIds.length];
      studentPtr++;
      const attendDate = rand(0, course.maxAttendDate);
      const status = attendDate >= course.maxAttendDate ? 1 : 0;
      const existing = await prisma.studentJoinClass.findFirst({
        where: { idStudent: studentId, idClass: cls.id },
      });
      if (!existing) {
        await prisma.studentJoinClass.create({
          data: {
            idStudent: studentId,
            idClass: cls.id,
            attendDate,
            status,
            listening: rand(3, 9),
            writing: rand(3, 9),
            speaking: rand(3, 9),
            reading: rand(3, 9),
            paidStatus: 1,
            prizeStatus: status === 1 ? 1 : null,
          },
        });
      }
    }
  }

  // ── 8. Sponsors ──────────────────────────────────────────────
  console.log('  → Sponsors');
  const SPONSORS = [
    { name: 'VinGroup Education', amount: 50_000_000, status: 'active' },
    { name: 'FPT Software', amount: 30_000_000, status: 'active' },
    { name: 'Hoa Sen University', amount: 20_000_000, status: 'active' },
    { name: 'British Council VN', amount: 80_000_000, status: 'active' },
    { name: 'IDP Vietnam', amount: 40_000_000, status: 'inactive' },
    { name: 'Vietcombank', amount: 25_000_000, status: 'active' },
    { name: 'Techcombank', amount: 15_000_000, status: 'active' },
    { name: 'Samsung Vietnam', amount: 60_000_000, status: 'active' },
    { name: 'Intel Products Vietnam', amount: 35_000_000, status: 'inactive' },
    { name: 'RMIT Vietnam', amount: 70_000_000, status: 'active' },
  ];
  for (const sp of SPONSORS) {
    const exists = await prisma.sponsor.findFirst({ where: { name: sp.name } });
    if (!exists) await prisma.sponsor.create({ data: sp });
  }

  // ── 9. Email whitelist ────────────────────────────────────────
  console.log('  → Email whitelist');
  const EMAIL_WHITELIST = [
    { email: 'admin@bkec.edu.vn', role: 'admin' },
    { email: 'admin01@bkec.edu.vn', role: 'admin' },
    { email: 'admin02@bkec.edu.vn', role: 'admin' },
    { email: 'staff01@bkec.edu.vn', role: 'staff' },
    { email: 'staff02@bkec.edu.vn', role: 'staff' },
    { email: 'staff03@bkec.edu.vn', role: 'staff' },
    { email: 'staff04@bkec.edu.vn', role: 'staff' },
    { email: 'staff05@bkec.edu.vn', role: 'staff' },
    { email: 'teacher01@bkec.edu.vn', role: 'teacher' },
    { email: 'teacher02@bkec.edu.vn', role: 'teacher' },
  ];
  for (const entry of EMAIL_WHITELIST) {
    const exists = await prisma.email.findFirst({ where: entry });
    if (!exists) await prisma.email.create({ data: entry });
  }

  // ── 10. Activity logs ─────────────────────────────────────────
  console.log('  → Logs');
  const adminUser = await prisma.user.findFirst({ where: { role: 'admin' } });
  if (adminUser) {
    const ACTIONS = [
      'Login',
      'View course list',
      'Add course',
      'Edit course',
      'View class list',
      'Add class',
      'View student list',
      'Edit student',
    ];
    for (let i = 0; i < 50; i++) {
      await prisma.log.create({
        data: {
          idUser: adminUser.id,
          action: pick(ACTIONS),
          date: new Date(Date.now() - rand(0, 30 * 24 * 60 * 60 * 1000)),
          status: Math.random() > 0.1,
        },
      });
    }
  }

  // ── 11. Register logs ─────────────────────────────────────────
  console.log('  → RegisterLogs');
  const allUsers = await prisma.user.findMany({ take: 30 });
  for (const u of allUsers) {
    await prisma.registerLog.create({
      data: {
        idUser: u.id,
        email: u.email,
        date: new Date(Date.now() - rand(0, 60 * 24 * 60 * 60 * 1000)),
      },
    });
  }

  console.log('✅  Seed complete!');
  console.log(`   Courses: ${courseRecs.length}`);
  console.log(`   Classes: ${classRecs.length}`);
  console.log(`   Students: ${studentIds.length}`);
  console.log(`   Teachers: ${teacherIds.length}`);
}

main()
  .catch((e) => {
    console.error('❌  Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
