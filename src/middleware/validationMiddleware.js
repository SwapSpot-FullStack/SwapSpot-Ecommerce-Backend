const { body, validationResult } = require("express-validator");

/**
 * Validate request body and handle errors
 */
const validateRequest = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

// Validation Rules for User Registration
const validateUserRegistration = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation Rules for Message Creation
const validateMessage = [
  body("receiver").notEmpty().withMessage("Receiver is required"),
  body("content")
    .isLength({ min: 1, max: 500 })
    .withMessage("Message must be between 1-500 characters"),
];

// Validation Rules for Listing Creation
const validateListing = [
  body("title").notEmpty().withMessage("Title is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("description").notEmpty().withMessage("Description is required"),
];

module.exports = {
  validateRequest,
  validateUserRegistration,
  validateMessage,
  validateListing,
};
