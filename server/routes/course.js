const express = require('express');
const router = express.Router();

const CourseController = require('../src/controllers/CourseController');
const { requireApiKey } = require('../src/middleware/useApiKey');
router.get('/', requireApiKey, CourseController.getCourses);
router.get('/all', CourseController.getCourseForAll);
router.get('/course', requireApiKey, CourseController.getCourse);
router.post('/course', requireApiKey, CourseController.addCourse);
router.patch('/course', requireApiKey, CourseController.editCourse);
router.delete('/course', requireApiKey, CourseController.removeCourse);
module.exports = router;
