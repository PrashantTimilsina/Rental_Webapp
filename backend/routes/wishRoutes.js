const express = require("express");
const wishController = require("./../controller/wishListController");
const authController = require("./../controller/authController");
const router = express.Router();
router.post(
  "/:id",
  authController.ensureAuthenticated,
  wishController.createWishList
);
router.get("/", authController.ensureAuthenticated, wishController.getWishList);
router.delete(
  "/delete/:id",
  authController.ensureAuthenticated,
  wishController.deleteWishList
);
module.exports = router;
