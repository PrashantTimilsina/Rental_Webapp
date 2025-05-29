const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageURL: String,
  images: [String],
  city: String,
  address: String,
  price: Number,
  bedrooms: Number,
  available: {
    type: Boolean,
    default: true,
  },
  rating: Number,
  ownerName: String,
});
const Rental = new mongoose.model("Rental", rentalSchema);
module.exports = Rental;
