const { body, validationResult } = require("express-validator");

/**
 * @desc Middleware to validate request body based on provided validation rules
 * @usage Pass an array of validation rules to `validateRequest` before the route handler
 * @param {Array} validations - Array of validation rules from express-validator
 * @returns Middleware function that validates the request and handles errors
 */
const validateRequest = (validations) => async (req, res, next) => {
  // Run all validation rules asynchronously
  await Promise.all(validations.map((validation) => validation.run(req)));

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn("⚠️ Validation Failed:", errors.array()); // Log validation errors for debugging
    return res.status(400).json({ errors: errors.array() }); // Return formatted validation errors
  }

  next(); // Proceed to the next middleware if validation passes
};

// Validation Rules for User Registration
const validateUserRegistration = [
  body("username").notEmpty().withMessage("❌ Username is required"), // Ensures username is provided
  body("email").isEmail().withMessage("❌ Valid email is required"), // Ensures email is correctly formatted
  body("password")
    .isLength({ min: 6 })
    .withMessage("❌ Password must be at least 6 characters long"), // Enforces password length
];

// Validation Rules for Message Creation
const validateMessage = [
  body("receiver").notEmpty().withMessage("❌ Receiver is required"), // Ensures receiver field is not empty
  body("content")
    .isLength({ min: 1, max: 500 })
    .withMessage("❌ Message must be between 1-500 characters"), // Restricts message length
];

// Validation Rules for Listing Creation
const validateListing = [
  body("title").notEmpty().withMessage("❌ Title is required"), // Ensures title field is provided
  body("price").isNumeric().withMessage("❌ Price must be a number"), // Ensures price is a valid number
  body("description").notEmpty().withMessage("❌ Description is required"), // Ensures description is not empty
];

module.exports = {
  validateRequest,
  validateUserRegistration,
  validateMessage,
  validateListing,
};
