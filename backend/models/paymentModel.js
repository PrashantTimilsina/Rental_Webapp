const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // rental: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Rental",
    // },
    product_code: String,
    status: String,
    total_amount: String,
    transaction_code: String,

    transaction_uuid: String,
  },
  { timestamps: true }
);
paymentSchema.index({ user: 1, transaction_uuid: 1 }, { unique: true });
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
