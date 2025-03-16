const mongoose = require('mongoose')

/**
 * Establish a connection to MongoDB
 */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables.')
    }

    console.info('⏳ Connecting to MongoDB...')
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.info(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`)

    // Set exit code before exiting to allow cleanup
    process.exitCode = 1
  }
}

module.exports = connectDB
