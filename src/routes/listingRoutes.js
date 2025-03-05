const express = require("express");
const router = express.Router();

router.get("/search", async (req, res) => {
    try {
        const searchQuery = req.query.q;
        res.json({ message: `Searching for listings with query: ${searchQuery}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching listings" });
    }
});

module.exports = router;