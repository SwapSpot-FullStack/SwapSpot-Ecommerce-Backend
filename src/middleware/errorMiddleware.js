/**
 * @desc Middleware for handling errors globally
 */

const errorHandler = (err, req, res, next) => {
  console.error(`❌ Error: ${err.message}`);

  // Determine the correct status code (default: 500 - Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : null, // Show stack trace only in dev mode
  });
};

module.exports = errorHandler;
