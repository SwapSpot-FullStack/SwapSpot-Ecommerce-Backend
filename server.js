// Load environment variables from .env file
require("dotenv").config();

// Import required dependencies
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db"); // Database connection function
const errorHandler = require("./src/middleware/errorMiddleware"); // Global error handler middleware

// Connect to MongoDB database
connectDB();

const app = express();

// Apply Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS) for frontend communication
app.use(express.json()); // Allows app to parse JSON request bodies

// Define API Routes
app.use("/api/users", require("./src/routes/userRoutes")); // Handles User authentication & profiles
app.use("/api/listings", require("./src/routes/listingRoutes")); // Handles Listing creation & retrieval
app.use("/api/messages", require("./src/routes/messageRoutes")); // Handles User messaging system
app.use("/api/transactions", require("./src/routes/transactionRoutes")); // Handles Purchase transactions

// Handle 404 Errors (Requests to Undefined Routes)
app.use((req, res, next) => {
  console.warn(`⚠️ 404 Not Found: ${req.originalUrl}`); // Logs the missing route
  res.status(404).json({ message: "❌ Route not found" });
});

// Apply Global Error Handling Middleware (MUST be after all routes)
app.use(errorHandler);

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
