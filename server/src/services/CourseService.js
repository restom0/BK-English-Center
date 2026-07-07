// =============================================================
// CourseService
// Business logic + Redis cache layer for Course entity.
// Cache keys:
//   course:all       → list of all courses
//   course:public    → public course list (no sensitive fields)
//   course:name:{n}  → single course detail
// =============================================================

'use strict';

const Course = require('../models/Course');
const { cacheGet, cacheSet, cacheDel, cacheDelPattern } = require('../config/redis');

const KEY_ALL = 'course:all';
const KEY_PUBLIC = 'course:public';
const KEY_DETAIL = (name) => `course:name:${name}`;

class CourseService {
  async getAll() {
    const cached = await cacheGet(KEY_ALL);
    if (cached) return cached;
    const data = await Course.getCourses();
    await cacheSet(KEY_ALL, data);
    return data;
  }

  async getPublic() {
    const cached = await cacheGet(KEY_PUBLIC);
    if (cached) return cached;
    const data = await Course.getCourseForAll();
    await cacheSet(KEY_PUBLIC, data);
    return data;
  }

  async getOne(name) {
    const key = KEY_DETAIL(name);
    const cached = await cacheGet(key);
    if (cached) return cached;
    const data = await Course.getCourse(name);
    if (data) await cacheSet(key, data);
    return data;
  }

  async create(fields) {
    const result = await Course.addCourse(...fields);
    await cacheDelPattern('course:*');
    return result;
  }

  async update(oldname, fields) {
    const result = await Course.updateCourse(oldname, ...fields);
    await cacheDelPattern('course:*');
    return result;
  }

  async remove(name) {
    const result = await Course.deleteCourse(name);
    await cacheDelPattern('course:*');
    return result;
  }
}

module.exports = new CourseService();
