const Rental = require("./../models/rentalModel");
const APIFeatures = require("./../utils/apiFeatures"); // import your APIFeatures class

exports.getAllHouses = async (req, res, next) => {
  try {
    // 1. Build the query with all the API features
    const features = new APIFeatures(Rental.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // 2. Execute the query
    const rentals = await features.query;
    if (!rentals) {
      return res.status(400).json({
        message: "Cannot fetch houses",
      });
    }
    res.status(200).json({
      status: "success",
      results: rentals.length,
      rentals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot get the houses",
    });
  }
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
