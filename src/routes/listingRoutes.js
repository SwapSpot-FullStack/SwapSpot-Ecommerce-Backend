const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware"); // Import JWT middleware
const Listing = require("../models/listing"); // Import the Listing Model

// GET All Listings (Public Route)
router.get("/", async (req, res) => {
  try {
    console.log("🟢 Fetching all listings...");
    const listings = await Listing.find().populate("user", "email");
    console.log(`✅ Retrieved ${listings.length} listings.`);
    res.json(listings);
  } catch (error) {
    console.error("❌ Error fetching listings:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST Create Listing (Protected - Requires JWT)
router.post(
  "/",
  protect,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  validateRequest, // Ensure validation before proceeding
  async (req, res, next) => {
    try {
      console.log("🟢 Creating a new listing...");
      const { title, price, description } = req.body;

      // ✅ Ensure all fields are provided
      if (!title || !price || !description) {
        console.error("❌ Missing required fields.");
        return res.status(400).json({
          message: "All fields (title, price, description) are required",
        });
      }

      // Create & Save Listing
      const listing = await Listing.create({
        title,
        price,
        description,
        user: req.user.id, // Associate listing with the authenticated user
      });

      console.log("✅ Listing created successfully:", listing);
      res
        .status(201)
        .json({ message: "Listing created successfully", listing });
    } catch (error) {
      console.error("❌ Error creating listing:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// PUT Update Listing (Protected)
router.put(
  "/:id",
  protect,
  [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description cannot be empty"),
  ],
  validateRequest, // Ensure validation before proceeding
  async (req, res, next) => {
    try {
      console.log(`🟢 Updating listing with ID: ${req.params.id}`);
      const listing = await Listing.findById(req.params.id);

      if (!listing) {
        console.error("❌ Listing not found.");
        return res.status(404).json({ message: "Listing not found" });
      }

      // Ensure only the listing owner can update
      if (listing.user.toString() !== req.user.id) {
        console.error("❌ Unauthorized update attempt.");
        return res
          .status(403)
          .json({ message: "Not authorized to update this listing" });
      }

      // Update listing fields
      listing.title = req.body.title || listing.title;
      listing.price = req.body.price || listing.price;
      listing.description = req.body.description || listing.description;

      await listing.save();
      console.log("✅ Listing updated successfully.");
      res.json({ message: "Listing updated successfully", listing });
    } catch (error) {
      console.error("❌ Error updating listing:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// DELETE Remove Listing (Protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    console.log(`🟢 Deleting listing with ID: ${req.params.id}`);
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      console.error("❌ Listing not found.");
      return res.status(404).json({ message: "Listing not found" });
    }

    // Ensure only the owner can delete
    if (listing.user.toString() !== req.user.id) {
      console.error("❌ Unauthorized delete attempt.");
      return res
        .status(403)
        .json({ message: "Not authorized to delete this listing" });
    }

    await listing.deleteOne();
    console.log("✅ Listing deleted successfully.");
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting listing:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
