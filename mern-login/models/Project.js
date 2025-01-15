const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Project name should be unique
  },
  description: {
    type: String, // Optional description of the project
  },
  // Array of user ObjectIds referencing the User schema
  members: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
});

module.exports = mongoose.model("Project", ProjectSchema);
