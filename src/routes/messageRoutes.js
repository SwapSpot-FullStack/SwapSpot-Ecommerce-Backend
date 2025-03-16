const express = require("express");
const { body } = require("express-validator"); // Import body validator
const router = express.Router();
const protect = require("../middleware/authMiddleware"); // Protects routes using JWT
const { validateRequest } = require("../middleware/validationMiddleware"); // Import validation
const Message = require("../models/message"); // Import Message model

/**
 * @desc Get all messages for the authenticated user
 * @route GET /api/messages
 * @access Private
 */
router.get("/", protect, async (req, res, next) => {
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
    next(error); // Use centralized error handler
  }
});

/**
 * @desc Send a new message
 * @route POST /api/messages
 * @access Private
 */
router.post(
  "/",
  protect,
  [
    body("receiver").notEmpty().withMessage("❌ Receiver is required"),
    body("content")
      .isLength({ min: 1, max: 500 })
      .withMessage("❌ Message must be between 1-500 characters"),
  ],
  validateRequest, // ✅ Ensure validation before proceeding
  async (req, res, next) => {
    try {
      console.log("🟢 Creating a new message...", req.body);

      const { receiver, content } = req.body;

      const message = await Message.create({
        sender: req.user.id,
        receiver,
        content,
      });

      console.log(`✅ Message sent successfully: ${message._id}`);
      res.status(201).json({ message: "Message sent successfully", message });
    } catch (error) {
      next(error); // Use centralized error handler
    }
  }
);

/**
 * @desc Delete a message (Only sender can delete)
 * @route DELETE /api/messages/:id
 * @access Private
 */
router.delete("/:id", protect, async (req, res, next) => {
  try {
    console.log(
      `🟢 User ${req.user.id} attempting to delete message ID: ${req.params.id}`
    );

    const message = await Message.findById(req.params.id);

    if (!message) {
      console.warn("⚠️ Message not found.");
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.sender.toString() !== req.user.id) {
      console.warn(
        `🚫 Unauthorized attempt by user ${req.user.id} to delete message ${req.params.id}`
      );
      return res
        .status(403)
        .json({ message: "Not authorized to delete this message" });
    }

    await message.deleteOne();
    console.log(`✅ Message deleted: ${req.params.id}`);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    next(error); // Use centralized error handler
  }
});

module.exports = router;
