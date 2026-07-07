// =============================================================
// StudentService — business logic + Redis cache for Student
// Cache keys:
//   student:all      → full list
//   student:id:{id}  → single student
// =============================================================

'use strict';

const Student = require('../models/Student');
const { cacheGet, cacheSet, cacheDel, cacheDelPattern } = require('../config/redis');

const KEY_ALL = 'student:all';
const KEY_DETAIL = (id) => `student:id:${id}`;

class StudentService {
  async getAll() {
    const cached = await cacheGet(KEY_ALL);
    if (cached) return cached;
    const data = await Student.getStudents();
    await cacheSet(KEY_ALL, data);
    return data;
  }

  async getOne(id) {
    const key = KEY_DETAIL(id);
    const cached = await cacheGet(key);
    if (cached) return cached;
    const data = await Student.getStudent(id);
    if (data) await cacheSet(key, data);
    return data;
  }

  async update(id, name, sex, dateofbirth, phone, address, email) {
    const result = await Student.editStudent(id, name, sex, dateofbirth, phone, address, email);
    await cacheDel(KEY_ALL, KEY_DETAIL(id));
    return result;
  }
}

module.exports = new StudentService();
