const mongoose = require("mongoose");

// Define the schema for a user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
   // required: true,
    minlength: 6,
  },
  googleId: {
    type: String,
    default: null, // For users who sign up via Google OAuth
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
});

module.exports = mongoose.model("User", userSchema);
