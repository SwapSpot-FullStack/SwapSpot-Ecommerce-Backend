const Message = require('../models/message') // Import the Message Model

// Send a New Message
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, content } = req.body

    // Validate input
    if (!receiver || !content) {
      return res
        .status(400)
        .json({ message: '❌ Receiver and message content are required' })
    }

    // Create & save message
    const message = await Message.create({
      sender: req.user.id, // Sender is the authenticated user
      receiver,
      content
    })

    res
      .status(201)
      .json({ message: '📩 Message sent successfully', data: message })
  } catch (error) {
    console.error('🛑 Send Message Error:', error)
    res.status(500).json({ message: '❌ Server error', error: error.message })
  }
}

// Get Messages for Logged-in User (Inbox)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }]
    })
      .populate('sender', 'username email')
      .populate('receiver', 'username email')
      .sort({ createdAt: -1 }) // Sort by latest first

    res.json({ message: '📥 Messages retrieved successfully', data: messages })
  } catch (error) {
    console.error('🛑 Get Messages Error:', error)
    res.status(500).json({ message: '❌ Server error', error: error.message })
  }
}

// Delete a Message (Only Sender or Receiver Can Delete)
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({ message: '❌ Message not found' })
    }

    // Only allow sender or receiver to delete
    if (
      message.sender.toString() !== req.user.id &&
      message.receiver.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: '❌ Not authorized to delete this message' })
    }

    await message.deleteOne()
    res.json({ message: '🗑️ Message deleted successfully' })
  } catch (error) {
    console.error('🛑 Delete Message Error:', error)
    res.status(500).json({ message: '❌ Server error', error: error.message })
  }
}
