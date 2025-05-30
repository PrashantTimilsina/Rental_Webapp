const WishList = require("../models/wishListModel");

exports.createWishList = async (req, res, next) => {
  try {
    const rentalId = req.params.id;
    const userId = req.user._id;
    const existing = await WishList.findOne({ user: userId, rental: rentalId });
    if (existing) {
      return res.status(400).json({
        message: "Already in wishlist",
      });
    }
    const wishListItem = await WishList.create({
      user: userId,
      rental: rentalId,
    });
    res.status(201).json({
      wishListItem,
      message: "Item added in wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
exports.getWishList = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const wishList = await WishList.find({ user: userId }).populate("rental");
    res.status(200).json({
      wishList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
exports.deleteWishList = async (req, res, next) => {
  try {
    const rentalId = req.params.id;
    const userId = req.user._id;

    const result = await WishList.deleteOne({ rental: rentalId, user: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Wishlist item not found or not authorized",
      });
    }

    res.status(200).json({
      message: "Wishlist item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
