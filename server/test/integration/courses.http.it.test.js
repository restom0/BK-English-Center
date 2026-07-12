'use strict';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

const TEST_DB = process.env.TEST_DATABASE_URL;
const enabled = Boolean(TEST_DB);

if (enabled) process.env.DATABASE_URL = TEST_DB;

const describeIf = enabled ? describe : describe.skip;

describeIf('Courses HTTP API (integration, real Postgres)', () => {
  let app;
  let prisma;
  let request;

  beforeAll(async () => {
    request = require('supertest');
    prisma = require('../../src/config/prisma');
    app = require('../../index');

    await prisma.$connect();
    await prisma.class.deleteMany();
    await prisma.course.deleteMany();
    await prisma.course.create({
      data: {
        name: 'IELTS Integration',
        intro: 'intro',
        img: 'img.png',
        imgintro: 'imgintro.png',
        short: 'short',
        description: 'description',
        paidStudent: 10,
        prizeStudent: 5,
        paidTeacher: 8,
        prizeTeacher: 4,
        maxAttendDate: 30,
      },
    });
  });

  afterAll(async () => {
    await prisma.class.deleteMany();
    await prisma.course.deleteMany();
    await prisma.$disconnect();
  });

  test('GET /api-docs.json exposes the OpenAPI document', async () => {
    const res = await request(app).get('/api-docs.json');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('application/json');
    expect(res.body.openapi).toBeTruthy();
    expect(res.body.info.title).toBe('BK English Center API');
  });

  test('GET /courses/all returns courses from the real database', async () => {
    const res = await request(app).get('/courses/all').set('Accept-Language', 'en');

    expect(res.status).toBe(200);
    expect(res.body.check).toBe(true);
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'IELTS Integration',
          description: 'description',
        }),
      ])
    );
    expect(res.body.data[0].paidStudent).toBeUndefined();
  });
});
