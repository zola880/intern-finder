const Announcement = require('../models/Announcement');
const Internship = require('../models/Internship');

exports.createAnnouncement = async (req, res) => {
  try {
    // For now, return a success placeholder
    res.status(201).json({ message: 'Announcement received (stub)' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ student: req.user._id }).populate('internship');
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAnnouncementStatus = async (req, res) => {
  try {
    // Stub – implement later
    res.json({ message: 'Status updated (stub)' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};