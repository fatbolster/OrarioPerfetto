const mongoose = require("mongoose");
const User = require("./models/User"); // Adjust the path as needed
require("dotenv").config();

const mongoURI = process.env.MONGO_URI; // Ensure this matches your .env file

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    createAndTestUser();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const createAndTestUser = async () => {
  try {
    // Create a new user
    const newUser = new User({
      username: "JohnDoes",
      password: "securePassword123", // Plain-text password
      projects: [{ name: "Test Project" }],
      calendar: ["2025-01-19", "2025-01-16"], // Valid ISO dates
    });

    await newUser.save();
    console.log("Test user created:", newUser);

    // Test password comparison
    const isMatch = await newUser.comparePassword("securePassword123");
    console.log("Password match:", isMatch); // Should log: true

    const invalidMatch = await newUser.comparePassword("wrongPassword");
    console.log("Password match for invalid password:", invalidMatch); // Should log: false

    process.exit(0); // Exit the script when done
  } catch (err) {
    console.error("Error creating or testing user:", err);
    process.exit(1);
  }
};
