const Transaction = require('../models/transaction')

/**
 * @desc Create a new transaction
 * @route POST /api/transactions
 * @access Private
 */
exports.createTransaction = async (req, res) => {
  try {
    const { buyer, listing, trackingNumber } = req.body

    if (!buyer || !listing || !trackingNumber) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const transaction = new Transaction({
      buyer,
      listing,
      paymentStatus: 'Pending',
      trackingNumber
    })

    await transaction.save()
    res.status(201).json({
      message: 'Transaction created successfully',
      transaction
    })
  } catch (error) {
    console.error('❌ Transaction Creation Error:', error.message)
    res
      .status(500)
      .json({ message: 'Error creating transaction', error: error.message })
  }
}

/**
 * @desc Get all transactions
 * @route GET /api/transactions
 * @access Private
 */
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('buyer listing')

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found' })
    }

    res.status(200).json(transactions)
  } catch (error) {
    console.error('❌ Error Fetching Transactions:', error.message)
    res
      .status(500)
      .json({ message: 'Error retrieving transactions', error: error.message })
  }
}
