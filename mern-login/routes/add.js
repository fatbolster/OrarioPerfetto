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
  const { dates } = req.body; // Use `dates` for an array
  const userId = req.user.id;

  if (!dates || !Array.isArray(dates)) {
    return res.status(400).json({ message: "Invalid dates format" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure `calendar` is an array and add unique dates
    user.calendar = [...new Set([...user.calendar, ...dates])];
    await user.save();

    res.status(201).json({ message: "Dates added successfully!" });
  } catch (error) {
    console.error("Error adding dates:", error);
    res.status(500).json({ message: "Error adding dates", error });
  }
});

module.exports = router;
