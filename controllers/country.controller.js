const countryModel = require("../models/country.model");

module.exports.getCountries = async (req, res) => {
  const countries = await countryModel.find();
  res.status(200).json(countries);
};

module.exports.getCountryBySlug = async (req, res) => {
  const country = await countryModel.findOne({ slug: req.params.slug });
  res.status(200).json(country);
};

module.exports.addCountry = async (req, res) => {
  const country = await countryModel.create(req.body);
  res.status(201).json(country);
};

module.exports.deleteCountry = async (req, res) => {
  const country = await countryModel.findByIdAndDelete(req.params.id);
  res.status(200).json(country);
};
