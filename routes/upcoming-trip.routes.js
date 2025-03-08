const express = require("express");
const router = express.Router();
const { getUpcomingTrips } = require("../controllers/upcoming-trip.controller");

router.get("/", getUpcomingTrips);

module.exports = router;
