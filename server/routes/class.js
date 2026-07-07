const express = require('express');
const router = express.Router();

const ClassController = require('../src/controllers/ClassController');
router.get('/', ClassController.getClasses);
// router.get("/all", ClassController.getClassess);
router.get('/class', ClassController.getClass);
router.post('/class', ClassController.addClass);
router.patch('/class', ClassController.editClass);
router.delete('/class', ClassController.removeClass);
module.exports = router;
