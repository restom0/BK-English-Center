const express = require('express');
const router = express.Router();

const LogController = require('../src/controllers/LogController');
router.get('/', LogController.getLogs);
router.get('/log', LogController.getLog);
module.exports = router;
