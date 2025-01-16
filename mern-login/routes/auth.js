const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure the path is correct

const router = express.Router();

// Login endpoint
router.post("/login", async (req, res) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    const { username, password } = req.body;
  
    console.log("Received username:", username);
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      // Log the user object and hashed password from DB
      console.log("User from DB:", user);
      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // Log the entered password
      console.log("Entered password:", password);
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      
      // Log the comparison result
      console.log("Password match:", isMatch);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // Send the token as response
      res.json({ message: "Login successful", token });
  
    } catch (err) {
      console.error("Error logging in:", err);
      res.status(500).send("Server error");
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  const { username, password } = req.body;

  console.log("Received username:", username);

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // Log the user object and hashed password from DB
    console.log("User from DB:", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }

    // Log the entered password
    console.log("Entered password:", password);

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // Log the comparison result
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Signing token with userId:", user._id);

    // Send the token as response
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
