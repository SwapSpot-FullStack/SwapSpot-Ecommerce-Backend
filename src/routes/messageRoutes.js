const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware"); // Protects routes using JWT
const Message = require("../models/message"); // Import Message model

/**
 * @desc Get all messages for the authenticated user
 * @route GET /api/messages
 * @access Private
 */
router.get("/", protect, async (req, res) => {
  try {
    console.log(`🟢 Fetching messages for user: ${req.user.id}`);

    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    }).populate("sender receiver", "username email");

    if (!messages.length) {
      console.warn("⚠️ No messages found.");
      return res.status(404).json({ message: "No messages available" });
    }

    console.log(`✅ Retrieved ${messages.length} messages`);
    res.json(messages);
  } catch (error) {
    console.error("❌ Error fetching messages:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @desc Send a new message
 * @route POST /api/messages
 * @access Private
 */
router.post("/", protect, async (req, res) => {
  try {
    console.log("🟢 Creating a new message...", req.body);

    const { receiver, content } = req.body;

    if (!receiver || !content) {
      console.warn("⚠️ Missing receiver or content.");
      return res
        .status(400)
        .json({ message: "Receiver and message content are required" });
    }

    const message = await Message.create({
      sender: req.user.id,
      receiver,
      content,
    });

    console.log(`✅ Message sent successfully: ${message._id}`);
    res.status(201).json({ message: "Message sent successfully", message });
  } catch (error) {
    console.error("❌ Error sending message:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @desc Delete a message (Only sender can delete)
 * @route DELETE /api/messages/:id
 * @access Private
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    console.log(`🟢 Deleting message ID: ${req.params.id}`);

    const message = await Message.findById(req.params.id);

    if (!message) {
      console.warn("⚠️ Message not found.");
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.sender.toString() !== req.user.id) {
      console.warn("🚫 Unauthorized delete attempt.");
      return res
        .status(403)
        .json({ message: "Not authorized to delete this message" });
    }

    await message.deleteOne();
    console.log(`✅ Message deleted: ${req.params.id}`);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting message:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
