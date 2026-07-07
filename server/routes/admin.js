const express = require('express');
const router = express.Router();

const AdminController = require('../src/controllers/AdminController');
router.get('/admin', AdminController.getAdmin);
router.get('/income', AdminController.getIncome);
router.get('/outcome', AdminController.getOutcome);
router.get('/stat', AdminController.getStat);
// router.post("/add", AdminController.addAdmin);
// router.post("/edit", AdminController.editAdmin);
// router.post("/remove", AdminController.removeAdmin);
module.exports = router;
