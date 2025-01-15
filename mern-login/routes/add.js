const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");

// Add a new project
router.post("/add-project", verifyToken, async (req, res) => {
  const { projectName } = req.body;
  const userId = req.user.id; // Extracted from the verified token

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.projects.push({ name: projectName });
    await user.save();

    res.status(201).json({ message: "Project added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding project", error });
  }
});

// Add a date to the calendar
router.post("/add-date", verifyToken, async (req, res) => {
  const { date } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.calendar.push(date); // Ensure `calendar` exists in your User schema
    await user.save();

    res.status(201).json({ message: "Date added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding date", error });
  }
});

module.exports = router;
