const Announcement = require('../models/Announcement');
const Internship = require('../models/Internship');
const { uploadToCloudinary } = require('../services/fileUploadService');

exports.createAnnouncement = async (req, res) => {
  try {
    if (req.user.role !== 'STUDENT') {
      return res.status(403).json({ message: 'Only students can submit announcements' });
    }
    const { internshipId, fullName, department, year, bankAccount } = req.body;
    const internship = await Internship.findById(internshipId);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });

    let acceptanceLetterUrl = '';
    if (req.file) {
      acceptanceLetterUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    }

    const announcement = await Announcement.create({
      student: req.user._id,
      internship: internshipId,
      fullName,
      department,
      year,
      bankAccount,
      acceptanceLetterUrl,
      status: 'PENDING'
    });

    // TODO: send email to university admin
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAnnouncementStatus = async (req, res) => {
  try {
    if (req.user.role !== 'UNIVERSITY_ADMIN' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { status } = req.body;
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Not found' });

    announcement.status = status;
    announcement.processedAt = new Date();
    await announcement.save();
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};