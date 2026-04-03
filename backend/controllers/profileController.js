const User = require('../models/User');

// GET /api/profile - get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash -refreshToken');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/profile - update profile
exports.updateProfile = async (req, res) => {
  try {
    const allowedUpdates = [
      'fullName', 'department', 'university', 'year',
      'experienceLevel', 'goal', 'interests', 'location', 'bankAccount'
    ];
    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-passwordHash -refreshToken');

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};