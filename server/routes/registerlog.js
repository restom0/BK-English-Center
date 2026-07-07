const express = require('express');
const router = express.Router();

const RegisterLogController = require('../src/controllers/RegisterLogController');
router.get('/', RegisterLogController.getRegisterLogs);
router.get('/register-log', RegisterLogController.getRegisterLog);
module.exports = router;
