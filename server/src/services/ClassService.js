// =============================================================
// ClassService — business logic + Redis cache for Class entity
// Cache keys:
//   class:all        → full list
//   class:name:{n}   → single class detail
// =============================================================

'use strict';

const Class = require('../models/Class');
const { cacheGet, cacheSet, cacheDelPattern } = require('../config/redis');

const KEY_ALL = 'class:all';
const KEY_DETAIL = (name) => `class:name:${name}`;

class ClassService {
  async getAll() {
    const cached = await cacheGet(KEY_ALL);
    if (cached) return cached;
    const data = await Class.getClasses();
    await cacheSet(KEY_ALL, data);
    return data;
  }

  async getOne(name) {
    const key = KEY_DETAIL(name);
    const cached = await cacheGet(key);
    if (cached) return cached;
    const data = await Class.getClass(name);
    if (data) await cacheSet(key, data);
    return data;
  }

  async create(name, idCourse, startDate, endDate, maxStudent, address, schedule) {
    const result = await Class.addClass(
      name,
      idCourse,
      startDate,
      endDate,
      maxStudent,
      address,
      schedule
    );
    await cacheDelPattern('class:*');
    return result;
  }

  async update(name, idCourse, startDate, endDate, maxStudent, address, schedule, oldname) {
    const result = await Class.updateClass(
      name,
      idCourse,
      startDate,
      endDate,
      maxStudent,
      address,
      schedule,
      oldname
    );
    await cacheDelPattern('class:*');
    return result;
  }

  async remove(name) {
    const result = await Class.removeClass(name);
    await cacheDelPattern('class:*');
    return result;
  }
}

module.exports = new ClassService();
