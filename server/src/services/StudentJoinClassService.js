// =============================================================
// StudentJoinClassService — business logic + Redis cache
// =============================================================

'use strict';

const SJC = require('../models/StudentJoinClass');
const { cacheGet, cacheSet, cacheDel, cacheDelPattern } = require('../config/redis');

const KEY_ALL = 'sjc:all';
const KEY_DETAIL = (id) => `sjc:student:${id}`;

class StudentJoinClassService {
  async getAll() {
    const cached = await cacheGet(KEY_ALL);
    if (cached) return cached;
    const data = await SJC.getStudentJoinClasses();
    await cacheSet(KEY_ALL, data);
    return data;
  }

  async getByStudent(studentId) {
    const key = KEY_DETAIL(studentId);
    const cached = await cacheGet(key);
    if (cached) return cached;
    const data = await SJC.getStudentJoinClass(studentId);
    if (data) await cacheSet(key, data);
    return data;
  }

  async invalidate(studentId) {
    await cacheDel(KEY_ALL, KEY_DETAIL(studentId));
  }
}

module.exports = new StudentJoinClassService();
