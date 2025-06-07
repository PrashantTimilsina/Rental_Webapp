const express = require("express");
const router = express.Router();
const paymentController = require("./../controller/paymentController");
const authController = require("./../controller/authController");
router.post(
  "/:id",
  authController.ensureAuthenticated,
  paymentController.createPayment
);
module.exports = router;
