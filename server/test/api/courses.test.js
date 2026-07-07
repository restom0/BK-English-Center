'use strict';

// API tests — exercise the real Express routing / middleware /
// controller / service / model stack over HTTP (supertest), with the
// DB (Prisma) and cache (Redis) mocked. No Postgres or Redis required.

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://u:p@localhost:5432/db';
process.env.REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const request = require('supertest');

// Mutable state the mocks read live. The name must start with `mock`
// so it is safe to reference inside the jest.mock factories.
const mockState = { courses: [], user: null };

jest.mock('../../src/config/redis', () => ({
  getClient: () => ({}),
  cacheGet: async () => null,
  cacheSet: async () => {},
  cacheDel: async () => {},
  cacheDelPattern: async () => {},
}));

jest.mock('../../src/config/prisma', () => {
  const delegate = (overrides) =>
    new Proxy(overrides, { get: (t, p) => (p in t ? t[p] : async () => null) });
  return new Proxy(
    {
      course: delegate({
        findMany: async () => mockState.courses,
        findUnique: async ({ where }) =>
          mockState.courses.find((c) => c.name === where.name) || null,
        create: async ({ data }) => data,
        update: async () => ({}),
        delete: async () => ({}),
      }),
    },
    { get: (t, p) => (p in t ? t[p] : delegate({})) }
  );
});

jest.mock('../../src/models/User', () => ({
  authUser: async () => mockState.user,
  checkEmail: async () => false,
}));

// bcrypt has a native binding that isn't needed for these routes —
// mock it so the app graph loads without the compiled .node file.
jest.mock('bcrypt', () => ({
  hash: async () => 'hashed',
  compare: async () => true,
  hashSync: () => 'hashed',
  compareSync: () => true,
  genSalt: async () => 'salt',
}));

// Requires happen after the mocks are registered (source order).
const app = require('../../index');
const { createApiKey } = require('../../src/middleware/useApiKey');

describe('Courses API', () => {
  test('GET /courses/all returns the public course list (no auth)', async () => {
    mockState.courses = [
      { name: 'IELTS', intro: 'i', img: '', imgintro: '', short: 's', description: 'd' },
      { name: 'TOEIC', intro: 'i', img: '', imgintro: '', short: 's', description: 'd' },
    ];

    const res = await request(app).get('/courses/all');

    expect(res.status).toBe(200);
    expect(res.body.check).toBe(true);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.data[0].name).toBe('IELTS');
  });

  test('GET /courses/ without an Authorization header is rejected (403)', async () => {
    const res = await request(app).get('/courses/');

    expect(res.status).toBe(403);
    expect(res.body.check).toBe(false);
  });

  test('GET /courses/ with a valid admin token returns the list (200)', async () => {
    mockState.courses = [
      { name: 'BUSINESS', intro: 'i', img: '', imgintro: '', short: 's', description: 'd' },
    ];
    mockState.user = { id: 1, role: 'admin' };

    const token = createApiKey({ role: 'admin', id: 1 });
    const res = await request(app).get('/courses/').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.check).toBe(true);
    expect(res.body.data[0].name).toBe('BUSINESS');
  });

  test('GET /courses/ with a malformed token is rejected (401)', async () => {
    const res = await request(app).get('/courses/').set('Authorization', 'Bearer garbage');

    expect(res.status).toBe(401);
    expect(res.body.check).toBe(false);
  });
});
