const Payment = require("./../models/paymentModel");

exports.createPayment = async (req, res, next) => {
  try {
    const {
      product_code,
      status,
      total_amount,
      transaction_code,
      transaction_uuid,
    } = req.body;
    const userId = req.user._id;
    // const rentalId = req.params.id;
    const existing = await Payment.findOne({ user: userId, transaction_uuid });
    if (existing) {
      return res.status(400).json({
        message: "Payment is already done",
      });
    }
    const payment = await Payment.create({
      user: userId,
      // rental: rentalId,
      product_code,
      status,
      total_amount,
      transaction_code,
      transaction_uuid,
    });

    res.status(201).json({
      message: "Payment received",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment failed",
      error: error.message,
    });
  }
};
