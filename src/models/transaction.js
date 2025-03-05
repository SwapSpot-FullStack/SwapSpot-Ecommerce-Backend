const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
    paymentStatus: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    trackingNumber: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
