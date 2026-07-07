const express = require('express');
const {
  sendMail,
  requireApiKey,
  sendPay,
  sendPrize,
  sendSalary,
  sendWarning,
  sendCheer,
  sendFile,
} = require('../src/middleware/useApiKey');
const router = express.Router();

router.use('/sendMail', sendMail);
router.use('/sendPay', requireApiKey, sendPay);
router.use('/sendPrize', requireApiKey, sendPrize);
router.use('/sendSalary', requireApiKey, sendSalary);
router.use('/sendWarning', requireApiKey, sendWarning);
router.use('/sendFile', requireApiKey, sendFile);
router.use('/sendCheer', requireApiKey, sendCheer);
module.exports = router;
