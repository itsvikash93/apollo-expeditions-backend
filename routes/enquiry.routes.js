const express = require("express");
const router = express.Router();
const {
  addTripEnquiry,
  addPackageEnquiry,
  addContact,
} = require("../controllers/enquiry.controller");

router.post("/trip", addTripEnquiry);
router.post("/package", addPackageEnquiry);
router.post("/contact", addContact);


module.exports = router;
