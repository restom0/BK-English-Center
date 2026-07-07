'use strict';

// Integration tests — run the Course model against a REAL Postgres
// database via Prisma. Enabled only when TEST_DATABASE_URL is set
// (CI provides a postgres service); otherwise the whole suite is
// skipped so `npm test` stays green on machines without a database.
//
// CI prerequisite: `npx prisma db push` against the test database.

const TEST_DB = process.env.TEST_DATABASE_URL;
const enabled = Boolean(TEST_DB);

// Point the Prisma singleton at the test database before it loads.
if (enabled) process.env.DATABASE_URL = TEST_DB;

const describeIf = enabled ? describe : describe.skip;

describeIf('Course model (integration, real Postgres)', () => {
  let prisma;
  let Course;

  beforeAll(async () => {
    prisma = require('../../src/config/prisma');
    Course = require('../../src/models/Course');
    await prisma.$connect();
    await prisma.course.deleteMany();
  });

  afterAll(async () => {
    await prisma.course.deleteMany();
    await prisma.$disconnect();
  });

  test('addCourse persists a row and getCourse reads it back', async () => {
    const created = await Course.addCourse(
      'IELTS',
      'intro',
      'img.png',
      'imgintro.png',
      'short',
      'description',
      10,
      5,
      8,
      4,
      30
    );
    expect(created).toBeTruthy();

    const rows = await Course.getCourse('IELTS');
    expect(rows).toHaveLength(1);
    expect(rows[0].name).toBe('IELTS');
    expect(rows[0].paidStudent).toBe(10);
  });

  test('addCourse returns null on a duplicate name', async () => {
    const dup = await Course.addCourse('IELTS', '', '', '', '', '', 0, 0, 0, 0, 30);
    expect(dup).toBeNull();
  });

  test('getCourseForAll exposes only the public projection', async () => {
    const rows = await Course.getCourseForAll();
    const ielts = rows.find((r) => r.name === 'IELTS');
    expect(ielts).toBeTruthy();
    expect(ielts.description).toBe('description');
    expect(ielts.paidStudent).toBeUndefined(); // not selected publicly
  });

  test('updateCourse bumps version, deleteCourse removes the row', async () => {
    const updated = await Course.updateCourse(
      'IELTS',
      'IELTS',
      'intro2',
      'img.png',
      'imgintro.png',
      'short',
      'description',
      12,
      5,
      8,
      4,
      30
    );
    expect(updated).toBe(true);

    const removed = await Course.deleteCourse('IELTS');
    expect(removed).toBe(true);
    expect(await Course.getCourse('IELTS')).toBeNull();
  });
});
