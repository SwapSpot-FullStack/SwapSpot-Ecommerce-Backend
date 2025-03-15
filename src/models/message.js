const mongoose = require("mongoose");

// 📌 Define Message Schema
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links to the sender (User model)
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links to the receiver (User model)
      required: true,
    },
    content: {
      type: String,
      required: [true, "❌ Message content is required"], // Prevents empty messages
      trim: true,
      minlength: [1, "❌ Message cannot be empty"], // Prevents blank messages
      maxlength: [500, "❌ Message must be under 500 characters"], // Prevents excessively long messages
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Export Model for use in controllers and routes
module.exports = mongoose.model("Message", messageSchema);
