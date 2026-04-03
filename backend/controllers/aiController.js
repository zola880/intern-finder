const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/User');
const Internship = require('../models/Internship');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

exports.chatWithAI = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    const userProfile = req.user; // already attached by auth middleware

    const profileSummary = `
      User: ${userProfile.fullName}, ${userProfile.department || 'student'} at ${userProfile.university || 'university'}.
      Year: ${userProfile.year}, Experience: ${userProfile.experienceLevel}, Goal: ${userProfile.goal || 'not set'}.
    `;

    const systemPrompt = `You are EthioInternAI, a career assistant for Ethiopian students.
      Provide concise, helpful advice about internships, skills, CVs, interviews, and Ethiopian job market.
      User profile: ${profileSummary}
      Answer in a friendly, professional tone.`;

    const chat = model.startChat({
      history: history.map(msg => ({ role: msg.role, parts: msg.parts }))
    });
    const result = await chat.sendMessage(`${systemPrompt}\nUser: ${message}`);
    const reply = result.response.text();

    // Optional: recommend internships based on message
    const recommendations = await Internship.find({ status: 'Open', field: { $regex: userProfile.department || '', $options: 'i' } })
      .limit(3)
      .select('_id companyName');

    res.json({ reply, recommendedInternships: recommendations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI service error', error: err.message });
  }
};