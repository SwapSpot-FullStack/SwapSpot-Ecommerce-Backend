const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "❌ Username is required"],
      trim: true,
      minlength: [3, "❌ Username must be at least 3 characters long"],
      maxlength: [30, "❌ Username must be under 30 characters"],
    },
    email: {
      type: String,
      required: [true, "❌ Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "❌ Please provide a valid email address", // Prevents invalid emails
      ],
      index: true, // Optimizes search queries
    },
    password: {
      type: String,
      required: [true, "❌ Password is required"],
      minlength: [6, "❌ Password must be at least 6 characters"],
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Hash password before saving to DB (if not already handled in controllers)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is new/changed

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("✅ Password hashed successfully.");
    next();
  } catch (error) {
    console.error("❌ Error hashing password:", error);
    next(error);
  }
});

// Export Model for use in controllers and authentication
module.exports = mongoose.model("User", userSchema);
