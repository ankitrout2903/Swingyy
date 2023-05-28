const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3, // Minimum length of 3 characters for the username
    max: 20, // Maximum length of 20 characters for the username
    unique: true, // Ensure usernames are unique
  },
  email: {
    type: String,
    required: true,
    min: 8, // Minimum length of 8 characters for the email
    max: 50, // Maximum length of 50 characters for the email
    unique: true, // Ensure emails are unique
  },
  password: {
    type: String,
    required: true,
    min: 8, // Minimum length of 8 characters for the password
  },
});

// Create and export the User model based on the user schema
module.exports = mongoose.model("User", userSchema);
