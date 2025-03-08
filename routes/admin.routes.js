const express = require("express");
const router = express.Router();
const {
  adminLogin,
  adminLogout,
  addAdmin,
  getEnquiries,
  addOffer,
  deleteOffer,
  addPackage,
  deletePackage,
  addCountry,
  deleteCountry,
  addPopularPlace,
  deletePopularPlace,
  addVlog,
  deleteVlog,
  addUpcomingTrip,
  deleteUpcomingTrip,
  addExperience,
  deleteExperience,
  addPartner,
  deletePartner,
  deleteEnquiry,
} = require("../controllers/admin.controller");

router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.post("/add-admin", addAdmin);
router.get("/enquiries", getEnquiries);
router.delete("/enquiries/:id", deleteEnquiry);
router.post("/offers", addOffer);
router.delete("/offers/:id", deleteOffer);
router.post("/packages", addPackage);
router.delete("/packages/:id", deletePackage);
router.post("/countries", addCountry);
router.delete("/countries/:id", deleteCountry);
router.post("/popular-places", addPopularPlace);
router.delete("/popular-places/:id", deletePopularPlace);
router.post("/vlogs", addVlog);
router.delete("/vlogs/:id", deleteVlog);
router.post("/upcoming-trips", addUpcomingTrip);
router.delete("/upcoming-trips/:id", deleteUpcomingTrip);
router.post("/experiences", addExperience);
router.delete("/experiences/:id", deleteExperience);
router.post("/partners", addPartner);
router.delete("/partners/:id", deletePartner);
module.exports = router;
