const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const upload = require('../middleware/upload');

// Make sure the controller exists and exports the required functions
const announcementController = require('../controllers/announcementController');

// All routes require authentication
router.use(auth);

// Student submits an announcement
router.post('/', roleCheck('STUDENT'), upload.single('acceptanceLetter'), announcementController.createAnnouncement);

// Student gets their own announcements
router.get('/', announcementController.getMyAnnouncements);

// University admin updates status
router.put('/:id/status', roleCheck('UNIVERSITY_ADMIN', 'ADMIN'), announcementController.updateAnnouncementStatus);

module.exports = router;
// new
