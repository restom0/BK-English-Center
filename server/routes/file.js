const express = require('express');
const FileController = require('../src/controllers/FileController');
const router = express.Router();

router.get('/', FileController.getFiles);
router.post('/file', FileController.addFile);
router.patch('/file', FileController.editFile);
router.delete('/file', FileController.removeFile);
module.exports = router;
