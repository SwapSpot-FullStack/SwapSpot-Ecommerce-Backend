const mongoose = require('mongoose') // Import Mongoose for schema creation

// 📌 Define Listing Schema
const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '❌ Title is required'], // Validation with error message
      trim: true, // Removes unnecessary whitespace
      minlength: [3, '❌ Title must be at least 3 characters'], // Prevents too-short titles
      maxlength: [100, '❌ Title must be under 100 characters'] // Prevents overly long titles
    },
    price: {
      type: Number,
      required: [true, '❌ Price is required'], // Ensures price is provided
      min: [0, '❌ Price cannot be negative'] // Prevents invalid pricing
    },
    description: {
      type: String,
      required: [true, '❌ Description is required'], // Ensures descriptions exist
      trim: true, // Removes extra spaces
      minlength: [10, '❌ Description must be at least 10 characters'] // Avoids unhelpful descriptions
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Links listing to the user who created it
      required: true
    }
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
)

// 🔍 Middleware: Validate data before saving to DB
listingSchema.pre('save', function (next) {
  console.log('🟢 Validating listing before saving...')
  if (!this.title || !this.description || !this.price) {
    console.error('❌ Error: Missing required fields')
    return next(
      new Error('All fields (title, description, price) are required')
    )
  }
  console.log('✅ Validation passed. Saving listing...')
  next()
})

// Export Model for use in controllers
module.exports = mongoose.model('Listing', listingSchema)
