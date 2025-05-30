const mongoose = require("mongoose");
const wishListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rental: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rental",
    required: true,
  },
});
const WishList = mongoose.model("Wishlist", wishListSchema);
module.exports = WishList;
