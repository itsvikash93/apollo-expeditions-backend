const popularPlaceModel = require("../models/popular-place.model");

module.exports.getPopularPlaces = async (req, res) => {
  const popularPlaces = await popularPlaceModel.find().populate("country");
  res.status(200).json(popularPlaces);
};

module.exports.getPopularPlacesByCountryId = async (req, res) => {
  const popularPlaces = await popularPlaceModel.find({
    country: req.params.countryId,
  });
  res.status(200).json(popularPlaces);
};
