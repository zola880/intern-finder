const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyLogoUrl: String,
  location: String,
  field: { type: String, required: true },
  status: { type: String, enum: ['Open','Closed'], default: 'Open' },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  requiredSkills: [String],
  duration: String,
  deadline: Date,
  website: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);