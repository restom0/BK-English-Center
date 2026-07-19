const express = require('express');
const router = express.Router();

const UserController = require('../src/controllers/UserController');
const { requireApiKey, requireOtp } = require('../src/middleware/useApiKey');
// Login is a POST: credentials must travel in the body, never in a query
// string (URLs leak into access logs, browser history and Referer headers).
router.post('/login', UserController.login);
router.post('/user', requireOtp, UserController.addAccount);
router.patch('/user', requireApiKey, UserController.changeAccount);
router.get('/info', requireApiKey, UserController.getInfo);
module.exports = router;
