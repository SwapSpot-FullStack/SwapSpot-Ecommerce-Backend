const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware"); // ✅ Import JWT middleware
const Listing = require("../models/listing"); // ✅ Import the Listing Model

// ✅ GET All Listings (Public Route)
router.get("/", async (req, res) => {
    try {
        const listings = await Listing.find().populate("user", "email");
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ POST Create Listing (Protected Route - Requires JWT)
router.post("/", protect, async (req, res) => {
    try {
        const { title, price, description } = req.body;

        if (!title || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const listing = await Listing.create({
            title,
            price,
            description,
            user: req.user.id  // ✅ Save the listing under the authenticated user
        });

        res.status(201).json({ message: "Listing created successfully", listing });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ PUT Update Listing (Protected)
router.put("/:id", protect, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });

        if (listing.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this listing" });
        }

        listing.title = req.body.title || listing.title;
        listing.price = req.body.price || listing.price;
        listing.description = req.body.description || listing.description;

        await listing.save();
        res.json({ message: "Listing updated successfully", listing });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ DELETE Remove Listing (Protected)
router.delete("/:id", protect, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });

        if (listing.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this listing" });
        }

        await listing.deleteOne();
        res.json({ message: "Listing deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;