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

// Add or remove an unavailable date
router.post("/unavailable-dates", verifyToken, async (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ message: "Date is required" });

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Toggle the unavailable date
    if (user.unavailableDates.includes(date)) {
      user.unavailableDates = user.unavailableDates.filter(
        (d) => d !== date
      ); // Remove date
    } else {
      user.unavailableDates.push(date); // Add date
    }

    await user.save();
    res.status(200).json({ unavailableDates: user.unavailableDates });
  } catch (error) {
    console.error("Error updating unavailable dates:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
