const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const companyApplicationController = require('../controllers/companyApplicationController');

router.post(
  '/',
  upload.single('cv'),
  companyApplicationController.createCompanyApplication
);

module.exports = router;
