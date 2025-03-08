const express = require("express");
const countryModel = require("../models/country.model");
const router = express.Router();
const {
  getCountries,
  getCountryBySlug,
  addCountry,
  deleteCountry,
} = require("../controllers/country.controller");

// Get all countries
router.get("/", async (req, res) => {
  try {
    const countries = await countryModel.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single country by ID
router.get("/:slug", async (req, res) => {
  try {
    const country = await countryModel
      .findOne({ slug: req.params.slug }).populate("popularPlaces")
      
    // console.log(country);
    if (!country) return res.status(404).json({ message: "Country not found" });
    res.json(country);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
