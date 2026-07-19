// =============================================================
// Unit tests — password hashing helpers
// Uses real bcrypt for the happy paths and spies for the failure
// paths so the catch blocks are exercised too.
// =============================================================

'use strict';

const bcrypt = require('bcrypt');
const { createHash, checkPassword } = require('../../src/middleware/usePassword');

describe('usePassword', () => {
  let errorSpy;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createHash', () => {
    it('produces a bcrypt hash that differs from the input', async () => {
      const hash = await createHash('Secret@123');

      expect(typeof hash).toBe('string');
      expect(hash).not.toBe('Secret@123');
      expect(hash.startsWith('$2')).toBe(true); // bcrypt prefix
    });

    it('produces a different hash each call (random salt)', async () => {
      const [a, b] = await Promise.all([createHash('same-input'), createHash('same-input')]);
      expect(a).not.toBe(b);
    });

    it('logs and rethrows when bcrypt fails', async () => {
      jest.spyOn(bcrypt, 'hash').mockRejectedValue(new Error('hash boom'));

      await expect(createHash('x')).rejects.toThrow('hash boom');
      expect(errorSpy).toHaveBeenCalled();
    });
  });

  describe('checkPassword', () => {
    it('returns true for the matching password', async () => {
      const hash = await createHash('Correct@1');
      await expect(checkPassword('Correct@1', hash)).resolves.toBe(true);
    });

    it('returns false for a wrong password', async () => {
      const hash = await createHash('Correct@1');
      await expect(checkPassword('Wrong@1', hash)).resolves.toBe(false);
    });

    it('logs and rethrows when bcrypt fails', async () => {
      jest.spyOn(bcrypt, 'compare').mockRejectedValue(new Error('compare boom'));

      await expect(checkPassword('a', 'b')).rejects.toThrow('compare boom');
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
