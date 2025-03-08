const express = require("express");
const router = express.Router();
const {
  getExperiences,
  deleteExperience,
} = require("../controllers/experience.controller");

router.get("/", getExperiences);
router.delete("/:id", deleteExperience);

module.exports = router;
