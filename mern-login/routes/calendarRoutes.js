const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");

// Fetch unavailable dates for a user
router.get("/unavailable-dates", verifyToken, async (req, res) => {
  console.log("req.user:", req.user);
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ unavailableDates: user.calendar || [] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/add-dates", verifyToken, async (req, res) => {
  const { date } = req.body;

  console.log("Request body:", req.body);
  console.log("User ID:", req.user.userId);

  if (!date || !Array.isArray(date)) {
    console.error("Invalid dates format:", date);
    return res.status(400).json({ message: "Invalid dates provided" });
  }

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      console.error("User not found for ID:", req.user.userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Before update, calendar:", user.calendar);

    user.calendar = [...new Set([...user.calendar, ...date])];
    await user.save();

    console.log("After update, calendar:", user.calendar);

    res.status(200).json({ unavailableDates: user.calendar });
  } catch (error) {
    console.error("Error updating unavailable dates:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
module.exports = router;
