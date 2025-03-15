/**
 * @desc Middleware for validating request data before processing
 */

const { body, validationResult } = require("express-validator");

/**
 * @desc Middleware function to validate user input
 * @param {Array} validations - Array of validation rules
 */
const validateRequest = (validations) => {
  return async (req, res, next) => {
    // Run each validation
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Collect validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};

module.exports = { validateRequest };
