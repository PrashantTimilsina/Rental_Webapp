import mongoose from "mongoose";

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
