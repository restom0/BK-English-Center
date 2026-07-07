const express = require('express');
const router = express.Router();

const TeacherController = require('../src/controllers/TeacherController');
router.get('/', TeacherController.getTeachers);
// router.post("/teacher", TeacherController.addTeacher);
router.patch('/teacher', TeacherController.editTeacher);
router.delete('/teacher', TeacherController.removeTeacher);
// router.get("/get/:id", TeacherController.getTeacher);
module.exports = router;
