const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const upload = require('../middleware/upload'); // multer single file 'acceptanceLetter'

router.post('/', auth, roleCheck('STUDENT'), upload.single('acceptanceLetter'), announcementController.createAnnouncement);
router.get('/', auth, announcementController.getMyAnnouncements);
router.put('/:id/status', auth, roleCheck('UNIVERSITY_ADMIN','ADMIN'), announcementController.updateAnnouncementStatus);

module.exports = router;