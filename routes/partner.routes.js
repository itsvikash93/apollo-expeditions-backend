const express = require("express");
const router = express.Router();
const { getPartners } = require("../controllers/partner.controller");

router.get("/", getPartners);

module.exports = router;
