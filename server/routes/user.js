const express = require('express');
const router = express.Router();

const UserController = require('../src/controllers/UserController');
const { requireApiKey, requireOtp } = require('../src/middleware/useApiKey');
router.get('/user', UserController.login);
router.post('/user', requireOtp, UserController.addAccount);
router.patch('/user', requireApiKey, UserController.changeAccount);
router.get('/info', requireApiKey, UserController.getInfo);
module.exports = router;
