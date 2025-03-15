const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware"); // Import authentication middleware
const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");

/**
 * @desc Create a new transaction
 * @route POST /api/transactions
 * @access Private (Requires Authentication)
 */
router.post("/", protect, createTransaction);

/**
 * @desc Get all transactions for the authenticated user
 * @route GET /api/transactions
 * @access Private (Requires Authentication)
 */
router.get("/", protect, getTransactions);

module.exports = router;
