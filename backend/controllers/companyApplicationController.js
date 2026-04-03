const CompanyApplication = require('../models/CompanyApplication');
const { uploadToCloudinary } = require('../services/fileUploadService');

const parseJsonField = (value, fallback = null) => {
  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

exports.createCompanyApplication = async (req, res) => {
  try {
    const profileSnapshot = parseJsonField(req.body.profileSnapshot, {});
    const cvAnalysis = parseJsonField(req.body.cvAnalysis, null);
    const skillAssessment = parseJsonField(req.body.skillAssessment, null);

    const applicantFullName = profileSnapshot.fullName || req.body.fullName;
    const applicantLevel = skillAssessment?.level || profileSnapshot.experienceLevel || null;

    if (!req.body.internshipId || !req.body.companyName || !applicantFullName) {
      return res.status(400).json({
        message: 'Internship, company, and applicant name are required',
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Applicant CV is required' });
    }

    let cvUrl = null;
    const hasCloudinaryConfig =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET;

    if (hasCloudinaryConfig) {
      cvUrl = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname,
        'company-applications'
      );
    }

    const application = await CompanyApplication.create({
      internshipId: req.body.internshipId,
      companyName: req.body.companyName,
      companyWebsite: req.body.companyWebsite,
      applicationUrl: req.body.applicationUrl,
      internshipStatus: req.body.internshipStatus,
      applicantFullName,
      applicantLevel,
      applicationStatus: req.body.applicationStatus || 'SUBMITTED',
      profileSnapshot,
      cv: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: cvUrl,
        contentBase64: req.file.buffer.toString('base64'),
      },
      cvAnalysis,
      skillAssessment,
      submittedAt: new Date(),
    });

    const responseApplication = application.toObject();
    if (responseApplication.cv) {
      delete responseApplication.cv.contentBase64;
    }

    res.status(201).json({
      message: 'Application sent to company successfully',
      application: responseApplication,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
