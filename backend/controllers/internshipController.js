const Internship = require('../models/Internship');

exports.getAllInternships = async (req, res) => {
  try {
    const { search, field, page = 1, limit = 9 } = req.query;
    const query = {};

    // Add search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Add field filter
    if (field && field !== 'All') {
      query.field = field;
    }

    const skip = (page - 1) * limit;
    const total = await Internship.countDocuments(query);
    const internships = await Internship.find(query).skip(skip).limit(parseInt(limit));

    res.json({
      data: internships,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Not found' });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createInternship = async (req, res) => {
  try {
    const internship = new Internship({ ...req.body, postedBy: req.user._id });
    await internship.save();
    res.status(201).json(internship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!internship) return res.status(404).json({ message: 'Not found' });
    res.json(internship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};