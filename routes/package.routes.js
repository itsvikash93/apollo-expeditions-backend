const express = require("express");
const router = express.Router();

const {
  getPackages,
  getPackageById,
} = require("../controllers/package.controller");

router.get("/", getPackages);
router.get("/:id", getPackageById);

module.exports = router;
