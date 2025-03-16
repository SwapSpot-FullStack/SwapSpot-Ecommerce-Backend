const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validationMiddleware");
const { body } = require("express-validator");

// User Registration Route
router.post("/register", (req, res) => {
  res.json({ message: "User registered successfully" });
});

// User Login Route (Returns JWT Token)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Dummy user for testing (replace with real user authentication logic)
  if (email === "johndoe@example.com" && password === "securepassword123") {
    // Generate JWT Token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Protected Route - Get User Profile
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "User Profile Accessed",
    user: req.user,
  });
});

module.exports = router;
