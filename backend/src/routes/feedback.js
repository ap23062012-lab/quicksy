const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware"); // Only admin can read all
const Feedback = require("../models/Feedback");
const User = require("../models/User");

const router = express.Router();

// SUBMIT FEEDBACK (Any logged-in user)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Feedback message cannot be empty." });
    }

    const feedback = await Feedback.create({
      message,
      UserId: req.user.id,
    });

    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL FEEDBACK (Admin only)
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      include: [{ model: User, attributes: ["name", "email", "role"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;