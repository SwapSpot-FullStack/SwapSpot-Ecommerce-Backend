const express = require("express");
const { body } = require("express-validator"); // Import body validator
const router = express.Router();
const protect = require("../middleware/authMiddleware"); // Import authentication middleware
const { validateRequest } = require("../middleware/validationMiddleware"); // Import validation
const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");

/**
 * @desc Create a new transaction
 * @route POST /api/transactions
 * @access Private (Requires Authentication)
 */
router.post(
  "/",
  protect,
  [
    body("buyer").notEmpty().withMessage("Buyer ID is required"),
    body("listing").notEmpty().withMessage("Listing ID is required"),
    body("trackingNumber")
      .optional()
      .isString()
      .withMessage("Tracking number must be a string"),
  ],
  validateRequest, // Ensure validation before proceeding
  createTransaction
);

/**
 * @desc Get all transactions for the authenticated user
 * @route GET /api/transactions
 * @access Private (Requires Authentication)
 */
router.get("/", protect, getTransactions);

module.exports = router;
