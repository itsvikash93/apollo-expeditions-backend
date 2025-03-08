const express = require("express");
const router = express.Router();
const {
  getPopularPlaces,
  getPopularPlacesByCountryId,
} = require("../controllers/popular-place.controller");

router.get("/", getPopularPlaces);
router.get("/:countryId", getPopularPlacesByCountryId);

module.exports = router;
