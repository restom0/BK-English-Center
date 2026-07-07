const express = require('express');
const router = express.Router();

const StaffController = require('../src/controllers/StaffController');
const { requireApiKey } = require('../src/middleware/useApiKey');
router.get('/stat', requireApiKey, StaffController.getStat);
router.get('/staff', requireApiKey, StaffController.showStaff);
router.patch('/staff', requireApiKey, StaffController.updateStaff);
//router.delete("/deletestaff",StaffController.deleteStaff);

router.get('/showtimekeeping', requireApiKey, StaffController.showTimeKeeping);
router.get('/timekeeping', requireApiKey, StaffController.getTimeKeeping);
//router.patch("/addtimekeeping", StaffController.addTimeKeeping);
router.patch('/timekeeping', requireApiKey, StaffController.updateTimeKeeping); //da
router.post('/timekeeping', requireApiKey, StaffController.insertManagestaff); // checked
// them api insert vao managestaff voi id, month, year, cac gia tri con lai mac dinh la 0

router.get('/salary/null', requireApiKey, StaffController.getSalary);
router.get('/salary', requireApiKey, StaffController.showSalary); // da check
router.patch('/salary', requireApiKey, StaffController.updateSalary); // da check
router.delete('/salary', requireApiKey, StaffController.setNullSalary); // da check

router.get('/prize/null', requireApiKey, StaffController.getPrize);
router.get('/prize', requireApiKey, StaffController.showPrize); // da check
router.patch('/prize', requireApiKey, StaffController.updatePrize); // da check
router.delete('/prize', requireApiKey, StaffController.setNullPrize); // da check
// router.get("/showprize", StaffController.showPrize);
// router.post("/updateprize", StaffController.updatePrize);
// router.post("/deleteprize", StaffController.deletePrize);
module.exports = router;
