const jwt = require("jsonwebtoken");
const express = require("express");
const { body } = require("express-validator"); // ✅ Import express-validator
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validationMiddleware"); // ✅ Import validation middleware
const { registerUser, loginUser } = require("../controllers/userController"); // Import controller

// User Registration Route (Now with validation)
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateRequest, // Middleware to check validation before proceeding
  registerUser
);

// User Login Route (Now with validation)
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest, // Ensure input validation
  loginUser
);

// Protected Route - Get User Profile
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "User Profile Accessed",
    user: req.user,
  });
});

module.exports = router;
