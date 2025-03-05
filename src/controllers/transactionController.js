const Transaction = require("../models/transaction");

exports.createTransaction = async (req, res) => {
    try {
        const { buyer, listing, trackingNumber } = req.body;

        const transaction = new Transaction({
            buyer,
            listing,
            paymentStatus: "Pending",
            trackingNumber
        });

        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating transaction" });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate("buyer listing");
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving transactions" });
    }
};
