require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db"); 

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/users", require(path.join(__dirname, "src", "routes", "userRoutes")));
app.use("/api/listings", require(path.join(__dirname, "src", "routes", "listingRoutes")));
app.use("/api/messages", require(path.join(__dirname, "src", "routes", "messageRoutes")));
app.use("/api/transactions", require(path.join(__dirname, "src", "routes", "transactionRoutes")));

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 SwapSpot Backend is Running!");
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));