const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Notification = require("../models/Notification");

const router = express.Router();

// Get my notifications
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]],
      limit: 20, // Only get the latest 20
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Mark all as read
router.put("/read", authMiddleware, async (req, res) => {
  try {
    await Notification.update(
      { isRead: true },
      { where: { UserId: req.user.id, isRead: false } }
    );
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;