const express = require('express');
const EmailController = require('../src/controllers/EmailController');
const router = express.Router();

router.get('/', EmailController.getEmails);
router.post('/email', EmailController.addEmail);
router.patch('/email', EmailController.editEmail);
router.delete('/email', EmailController.removeEmail);
module.exports = router;
