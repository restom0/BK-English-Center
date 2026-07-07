const express = require('express');
const router = express.Router();

const StudentController = require('../src/controllers/StudentController');
router.get('/', StudentController.getStudents);
// router.post("/student", StudentController.addStudent);
router.patch('/student', StudentController.editStudent);
router.delete('/student', StudentController.removeStudent);
// router.get("/get/:id", StudentController.getStudent);
module.exports = router;
