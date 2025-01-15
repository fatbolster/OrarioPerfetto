const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for User
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes extra spaces
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensures stronger passwords
    },
    projects: [
      {
        name: {
          type: String,
          trim: true, // Removes extra spaces in project names
        },
      },
    ],
    calendar: [
      {
        type: String, // ISO date strings
        validate: {
          validator: (date) => /^\d{4}-\d{2}-\d{2}$/.test(date),
          message: "Invalid date format. Use 'YYYY-MM-DD'.",
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Hash the password before saving the user to the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare passwords during login
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Add indexes for performance (if you'll query often by these fields)
UserSchema.index({ username: 1 });

module.exports = mongoose.model("User", UserSchema);
