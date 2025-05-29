const Rental = require("./../models/rentalModel");
exports.getAllHouses = async (req, res, next) => {
  const rentals = await Rental.find();
  if (!rentals) {
    return res.status(400).json({
      message: "Cannot fetch houses",
    });
  }
  res.status(200).json({
    status: "success",
    rentals,
  });
};
exports.getHouseById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const rental = await Rental.findById({ _id: id });
    if (!rental) {
      return res.status(400).json({
        message: "This house is not available",
      });
    }
    res.status(200).json({
      status: "success",
      rental,
    });
  } catch (error) {
    res.status(400).json({
      message: "House is not available",
    });
  }
};
