const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
  fullName: String,
  department: String,
  year: String,
  bankAccount: String,
  acceptanceLetterUrl: String,
  status: {
    type: String,
    enum: ['PENDING', 'VERIFIED', 'STIPEND_SENT', 'REJECTED'],
    default: 'PENDING'
  },
  processedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);