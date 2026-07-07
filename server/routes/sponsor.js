const express = require('express');
const SponsorController = require('../src/controllers/SponsorController');
const router = express.Router();

router.get('/', SponsorController.getSponsors);
router.post('/sponsor', SponsorController.addSponsor);
router.patch('/sponsor', SponsorController.editSponsor);
router.delete('/sponsor', SponsorController.removeSponsor);
module.exports = router;
