const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Adjust path as needed
require("dotenv").config();

const mongoURI = process.env.MONGO_URI; // Ensure this is correct

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    createTestUser();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

const createTestUser = async () => {
  const username = "JohnDoe";
  const password = "Password"; // Plain-text password

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log("Plain-text password:", password);
  console.log("Hashed password:", hashedPassword);

  try {
<<<<<<< Updated upstream
    // Upsert user (update if exists, otherwise create new)
    const user = await User.findOneAndUpdate(
      { username },
      { username, password: hashedPassword },
      { upsert: true, new: true }
    );

    console.log("Test user created or updated:", user);
=======
    // Create a new user
    const newUser = new User({
      username: "Javier",
      password: "Password123", // Plain-text password
      projects: [{ name: "Test Project" }],
      calendar: ["2025-01-21", "2025-01-22"], // Valid ISO dates
    });

    await newUser.save();
    console.log("Test user created:", newUser);

    // Test password comparisonJavier
    const isMatch = await newUser.comparePassword("securePassword123");
    console.log("Password match:", isMatch); // Should log: true

    const invalidMatch = await newUser.comparePassword("wrongPassword");
    console.log("Password match for invalid password:", invalidMatch); // Should log: false

    process.exit(0); // Exit the script when done
>>>>>>> Stashed changes
  } catch (err) {
    console.error("Error creating test user:", err);
  }
};
