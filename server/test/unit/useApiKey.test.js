'use strict';

// Unit tests for the requireApiKey auth middleware.
// Covers the branches that don't touch the DB (missing / bad token).

// Env must be set before the middleware module loads.
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://u:p@localhost:5432/db';

const { requireApiKey, createApiKey } = require('../../src/middleware/useApiKey');

const t = (key) => key; // identity translator

// Invoke the middleware and resolve once it responds or calls next().
function invoke(req) {
  return new Promise((resolve) => {
    const res = {
      statusCode: 200,
      body: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(body) {
        this.body = body;
        resolve({ res: this, nextCalled: false });
        return this;
      },
    };
    requireApiKey(req, res, () => resolve({ res, nextCalled: true }));
  });
}

describe('requireApiKey middleware', () => {
  test('responds 403 when the Authorization header is missing', async () => {
    const { res, nextCalled } = await invoke({ headers: {}, t });
    expect(res.statusCode).toBe(403);
    expect(nextCalled).toBe(false);
    expect(res.body.check).toBe(false);
  });

  test('responds 401 when the token is malformed', async () => {
    const { res, nextCalled } = await invoke({
      headers: { authorization: 'Bearer not-a-real-jwt' },
      baseUrl: '/courses',
      t,
    });
    expect(res.statusCode).toBe(401);
    expect(nextCalled).toBe(false);
  });

  test('createApiKey produces a 3-part JWT', () => {
    const token = createApiKey({ role: 'admin', id: 1 });
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });
});
