const express = require("express");
const router = express.Router();
const rentalController = require("./../controller/rentalController");
router.get("/", rentalController.getAllHouses);
router.get("/:id", rentalController.getHouseById);
module.exports = router;
