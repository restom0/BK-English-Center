// =============================================================
// TeacherService — business logic + Redis cache for Teacher
// =============================================================

'use strict';

const Teacher = require('../models/Teacher');
const { cacheGet, cacheSet, cacheDel, cacheDelPattern } = require('../config/redis');

const KEY_ALL = 'teacher:all';
const KEY_DETAIL = (id) => `teacher:id:${id}`;

class TeacherService {
  async getAll() {
    const cached = await cacheGet(KEY_ALL);
    if (cached) return cached;
    const data = await Teacher.getTeachers();
    await cacheSet(KEY_ALL, data);
    return data;
  }

  async getOne(id) {
    const key = KEY_DETAIL(id);
    const cached = await cacheGet(key);
    if (cached) return cached;
    const data = await Teacher.getTeacher(id);
    if (data) await cacheSet(key, data);
    return data;
  }

  async update(id, name, sex, dateofbirth, phone, address, email) {
    const result = await Teacher.editTeacher(id, name, sex, dateofbirth, phone, address, email);
    await cacheDel(KEY_ALL, KEY_DETAIL(id));
    return result;
  }
}

module.exports = new TeacherService();
