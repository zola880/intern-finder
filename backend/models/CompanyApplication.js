const mongoose = require('mongoose');

const companyApplicationSchema = new mongoose.Schema(
  {
    internshipId: { type: String, required: true },
    companyName: { type: String, required: true },
    companyWebsite: String,
    applicationUrl: String,
    internshipStatus: String,
    applicantFullName: { type: String, required: true },
    applicantLevel: String,
    applicationStatus: {
      type: String,
      enum: ['SUBMITTED', 'UNDER_REVIEW', 'SHORTLISTED', 'REJECTED', 'HIRED'],
      default: 'SUBMITTED',
    },
    profileSnapshot: { type: mongoose.Schema.Types.Mixed, default: {} },
    cv: {
      originalName: String,
      mimeType: String,
      size: Number,
      url: String,
      contentBase64: String,
    },
    cvAnalysis: { type: mongoose.Schema.Types.Mixed, default: null },
    skillAssessment: { type: mongoose.Schema.Types.Mixed, default: null },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CompanyApplication', companyApplicationSchema);
