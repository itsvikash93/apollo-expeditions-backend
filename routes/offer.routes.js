const express = require("express");
const offerModel = require("../models/offer.model");
const router = express.Router();
const {
  getOffers,
  getOfferBySlug,
} = require("../controllers/offer.controller");

router.get("/", getOffers);
router.get("/:slug", getOfferBySlug);

module.exports = router;
