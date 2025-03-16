const mongoose = require('mongoose')

// Define Transaction Schema
const TransactionSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Links transaction to Buyer (User model)
      required: true,
      index: true // Optimizes queries for buyer transactions
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing', // Links transaction to a Listing
      required: true,
      index: true // Optimizes queries for listing transactions
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Completed', 'Failed', 'Refunded'], // More detailed payment statuses
      default: 'Pending'
    },
    trackingNumber: {
      type: String,
      trim: true,
      match: [/^[A-Z0-9]{8,20}$/, '❌ Invalid tracking number format'] // Validates tracking numbers
    }
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
)

// Export Model for use in controllers and routes
module.exports = mongoose.model('Transaction', TransactionSchema)
