const Feedback = require("../Models/feedback.model.js");

const postfeedback = async (req, res) => {
  const { username, feedback } = req.body;
  const newFeedback = await Feedback.create({ username, feedback });
  res.status(201).json({ message: "Feedback submitted successfully" });
};

const getfeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("username", "username email profilePicture")
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { postfeedback, getfeedback };
