// =============================================================
// CourseController — uses CourseService (Redis cache) + i18n
// =============================================================

'use strict';

/**
 * @swagger
 * tags:
 *   name: Courses
 */

const CourseService = require('../services/CourseService');
const Log = require('../models/Log');

const log = (userId, action, ok) => Log.addLog(userId, action, Date.now(), ok).catch(() => {});

class CourseController {
  async getCourses(req, res) {
    try {
      const data = await CourseService.getAll();
      await log(res.user.id, 'View course list', true);
      return res.json({ check: true, data });
    } catch (err) {
      console.error('getCourses:', err);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  async getCourseForAll(req, res) {
    try {
      const data = await CourseService.getPublic();
      return res.json({ check: true, data });
    } catch (err) {
      console.error('getCourseForAll:', err);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  async getCourse(req, res) {
    try {
      const { name } = req.query;
      const data = await CourseService.getOne(name);
      if (!data || data.length === 0) {
        return res.status(404).json({ check: false, msg: req.t('course.notFound') });
      }
      return res.json({ check: true, data });
    } catch (err) {
      console.error('getCourse:', err);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  async addCourse(req, res) {
    try {
      const {
        name,
        intro,
        img,
        imgintro,
        short,
        description,
        paidStudent,
        prizeStudent,
        paidTeacher,
        prizeTeacher,
        maxAttendDate,
      } = req.body;
      const result = await CourseService.create([
        name,
        intro,
        img,
        imgintro,
        short,
        description,
        paidStudent,
        prizeStudent,
        paidTeacher,
        prizeTeacher,
        maxAttendDate,
      ]);
      if (!result) {
        await log(res.user.id, 'Add course', false);
        return res.status(400).json({ check: false, msg: req.t('course.alreadyExists') });
      }
      await log(res.user.id, 'Add course', true);
      return res.json({ check: true, msg: req.t('course.addSuccess') });
    } catch (err) {
      console.error('addCourse:', err);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  async editCourse(req, res) {
    try {
      const {
        oldname,
        name,
        intro,
        img,
        imgintro,
        short,
        description,
        paidStudent,
        prizeStudent,
        paidTeacher,
        prizeTeacher,
        maxAttendDate,
      } = req.body;
      const result = await CourseService.update(oldname, [
        name,
        intro,
        img,
        imgintro,
        short,
        description,
        paidStudent,
        prizeStudent,
        paidTeacher,
        prizeTeacher,
        maxAttendDate,
      ]);
      if (result === null) {
        await log(res.user.id, 'Edit course', false);
        return res.status(400).json({ check: false, msg: req.t('course.alreadyExists') });
      }
      if (result === false) {
        return res.status(400).json({ check: false, msg: req.t('server.noChange') });
      }
      await log(res.user.id, 'Edit course', true);
      return res.json({ check: true, msg: req.t('course.updateSuccess') });
    } catch (err) {
      console.error('editCourse:', err);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  async removeCourse(req, res) {
    try {
      const { name } = req.query;
      const result = await CourseService.remove(name);
      if (!result) {
        await log(res.user.id, 'Delete course', false);
        return res.status(400).json({ check: false, msg: req.t('course.deleteBlocked') });
      }
      await log(res.user.id, 'Delete course', true);
      return res.json({ check: true, msg: req.t('course.deleteSuccess') });
    } catch (err) {
      console.error('removeCourse:', err);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
}

module.exports = new CourseController();
