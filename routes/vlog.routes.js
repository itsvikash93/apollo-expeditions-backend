const express = require("express");
const router = express.Router();
const { getVlogs } = require("../controllers/vlog.controller");

router.get("/", getVlogs);

module.exports = router;
