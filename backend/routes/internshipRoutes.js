const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.get('/', internshipController.getAllInternships);
router.get('/:id', internshipController.getInternshipById);
router.post('/', auth, roleCheck('EMPLOYER','ADMIN'), internshipController.createInternship);
router.put('/:id', auth, roleCheck('EMPLOYER','ADMIN'), internshipController.updateInternship);
router.delete('/:id', auth, roleCheck('ADMIN'), internshipController.deleteInternship);

module.exports = router;