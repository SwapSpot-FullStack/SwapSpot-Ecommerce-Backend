const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware"); // Import JWT middleware
const {
  validateListing,
  validateRequest,
} = require("../middleware/validationMiddleware"); // Import validation
const {
  getListings,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController"); // Import controller functions

// GET All Listings (Public Route)
router.get("/", getListings);

// POST Create Listing (Protected)
router.post("/", protect, validateListing, validateRequest, createListing);

// PUT Update Listing (Protected)
router.put("/:id", protect, validateListing, validateRequest, updateListing);

// DELETE Remove Listing (Protected)
router.delete("/:id", protect, deleteListing);

module.exports = router;
