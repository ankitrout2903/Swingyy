const mongoose = require("mongoose");

// Define the message schema
const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: {
      type: Array,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Create and export the Message model based on the message schema
module.exports = mongoose.model("Message", messageSchema);
