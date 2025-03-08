const offerModel = require("../models/offer.model");
const packageModel = require("../models/package.model");
const popularPlaceModel = require("../models/popular-place.model");
const vlogModel = require("../models/vlog.model");
const { putObjectURL, deleteObject } = require("../config/aws-setup");
const countryModel = require("../models/country.model");
const upcomingTripModel = require("../models/upcoming-trip.model");
const experienceModel = require("../models/experience.model");
const partnerModel = require("../models/partner.model");
const { default: slugify } = require("slugify");
const tripEnquiryModel = require("../models/trip-enquiry.model");
const packageEnquiryModel = require("../models/package-enquiry.model");
const adminModel = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const contactUsModel = require("../models/contactus.model");

require("dotenv").config();

module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = admin.generateToken();
    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.adminLogout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.addAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.create({ email, password });
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getEnquiries = async (req, res) => {
  try {
    const tripEnquiries = await tripEnquiryModel.find();
    const packageEnquiries = await packageEnquiryModel.find();
    const contactEnquiries = await contactUsModel.find();
    res.status(200).json({
      tripEnquiries: tripEnquiries,
      packageEnquiries: packageEnquiries,
      contactEnquiries: contactEnquiries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteEnquiry = async (req, res) => {
  try {
    if (req.body.type === "trip") {
      await tripEnquiryModel.findByIdAndDelete(req.params.id);
    }
    if (req.body.type === "package") {
      await packageEnquiryModel.findByIdAndDelete(req.params.id);
    }
    if (req.body.type === "contact") {
      await contactUsModel.findByIdAndDelete(req.params.id);
    }
    res.status(200).send({ message: "Enquiry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addOffer = async (req, res) => {
  try {
    const { name, route } = req.body;
    let offer = await offerModel.findOne({ name: name });
    if (offer) {
      return res.status(400).send("This offer already exists");
    }

    offer = await offerModel.create({
      name,
      route,
    });

    res.status(201).send(offer);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.deleteOffer = async (req, res) => {
  try {
    const offer = await offerModel.findById(req.params.id);
    offer.packages.forEach(async (package) => {
      await packageModel.findByIdAndDelete(package);
    });
    await offerModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Offer deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.addPackage = async (req, res) => {
  try {
    const offerId = req.body.offer;
    const offer = await offerModel.findById(offerId);

    if (!offer) {
      return res.status(400).send("Invalid offer ID");
    }

    const imageKey = `images/packages/${req.body.image}`;
    const pdfKey = `pdfs/packages/${req.body.pdf}`;

    // Handle Image Upload
    let imageUrls = null;
    if (req.body.image) {
      imageUrls = await putObjectURL(imageKey, "image/jpeg");
    }

    // Handle PDF Upload
    let pdfUrls = null;
    if (req.body.pdf) {
      pdfUrls = await putObjectURL(pdfKey, "application/pdf");
    }

    if (!imageUrls || !pdfUrls) {
      return res.status(400).send("Failed to upload image or PDF");
    }

    const package = await packageModel.create({
      ...req.body,
      offersAndPackages: offerId,
      imageKey: imageKey,
      pdfKey: pdfKey,
      imageUrl: imageUrls.fileUrl,
      pdfUrl: pdfUrls.fileUrl,
    });

    offer.packages.push(package._id);
    await offer.save();

    res
      .status(200)
      .send({ imageUrl: imageUrls.uploadUrl, pdfUrl: pdfUrls.uploadUrl });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.deletePackage = async (req, res) => {
  try {
    const package = await packageModel.findById(req.params.id);
    await deleteObject(package.imageKey);
    await deleteObject(package.pdfKey);
    await packageModel.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.addUpcomingTrip = async (req, res) => {
  try {
    // console.log(req.body);
    const imageKey = `images/upcoming-trips/${req.body.image}`;
    const pdfKey = `pdfs/upcoming-trips/${req.body.pdf}`;

    // Handle Image Upload
    let imageUrls = null;
    if (req.body.image) {
      imageUrls = await putObjectURL(imageKey, "image/jpeg");
    }

    // Handle PDF Upload
    let pdfUrls = null;
    if (req.body.pdf) {
      pdfUrls = await putObjectURL(pdfKey, "application/pdf");
    }

    if (!imageUrls || !pdfUrls) {
      return res.status(400).send("Failed to upload image or PDF");
    }

    const trip = await upcomingTripModel.create({
      ...req.body,
      imageKey: imageKey,
      pdfKey: pdfKey,
      imageUrl: imageUrls.fileUrl,
      pdfUrl: pdfUrls.fileUrl,
    });

    res
      .status(200)
      .send({ imageUrl: imageUrls.uploadUrl, pdfUrl: pdfUrls.uploadUrl });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.deleteUpcomingTrip = async (req, res) => {
  try {
    const upcomingTrip = await upcomingTripModel.findById(req.params.id);
    if (!upcomingTrip) {
      return res.status(404).send("Upcoming trip not found");
    }
    await deleteObject(upcomingTrip.imageKey);
    await deleteObject(upcomingTrip.pdfKey);
    await upcomingTripModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Upcoming trip deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.addExperience = async (req, res) => {
  try {
    const imageKey = `images/traveller-experiences/${req.body.image}`;

    // Handle Image Upload
    let imageUrls = null;
    if (req.body.image) {
      imageUrls = await putObjectURL(imageKey, "image/jpeg");
    }

    if (!imageUrls) {
      return res.status(400).send("Failed to upload image");
    }

    const experience = await experienceModel.create({
      imageUrl: imageUrls.fileUrl,
      imageKey: imageKey,
    });

    console.log(imageUrls);

    res.status(200).send({ imageUrl: imageUrls.uploadUrl });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.deleteExperience = async (req, res) => {
  try {
    const experience = await experienceModel.findById(req.params.id);
    if (!experience) {
      return res.status(404).send("Experience not found");
    }
    await deleteObject(experience.imageKey);
    await experienceModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Experience deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.addPartner = async (req, res) => {
  try {
    const imageKey = `images/partners/${req.body.image}`;

    // Handle Image Upload
    let imageUrls = null;
    if (req.body.image) {
      imageUrls = await putObjectURL(imageKey, "image/jpeg");
    }

    if (!imageUrls) {
      return res.status(400).send("Failed to upload image");
    }

    const partner = await partnerModel.create({
      name: req.body.name,
      description: req.body.description,
      imageKey: imageKey,
      imageUrl: imageUrls.fileUrl,
    });

    res.status(200).send({ imageUrl: imageUrls.fileUrl });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.deletePartner = async (req, res) => {
  try {
    const partner = await partnerModel.findById(req.params.id);
    if (!partner) {
      return res.status(404).send("Partner not found");
    }
    await deleteObject(partner.imageKey);
    await partnerModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Partner deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.addPopularPlace = async (req, res) => {
  try {
    const countryId = req.body.country;
    // console.log(req.body);
    const country = await countryModel.findById(countryId);
    // console.log(country);

    if (!country) {
      return res.status(400).send("Invalid country ID");
    }
    const imageKey = `images/popular-places/${req.body.image}`;
    const pdfKey = `pdfs/popular-places/${req.body.pdf}`;

    // Handle Image Upload
    let imageUrls = null;
    if (req.body.image) {
      imageUrls = await putObjectURL(imageKey, "image/jpeg");
    }

    // Handle PDF Upload
    let pdfUrls = null;
    if (req.body.pdf) {
      pdfUrls = await putObjectURL(pdfKey, "application/pdf");
    }

    if (!imageUrls) {
      return res.status(400).send("Failed to upload image");
    }

    const popularPlace = await popularPlaceModel.create({
      ...req.body,
      country: countryId,
      imageKey: imageKey,
      pdfKey: pdfKey,
      imageUrl: imageUrls.fileUrl,
      pdfUrl: pdfUrls.fileUrl,
    });

    country.popularPlaces.push(popularPlace._id);
    await country.save();

    res
      .status(200)
      .send({ imageUrl: imageUrls.uploadUrl, pdfUrl: pdfUrls.uploadUrl });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.deletePopularPlace = async (req, res) => {
  try {
    const popularPlace = await popularPlaceModel.findById(req.params.id);
    if (!popularPlace) {
      return res.status(404).send("Popular place not found");
    }
    await deleteObject(popularPlace.imageKey);
    await deleteObject(popularPlace.pdfKey);
    await popularPlaceModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Popular place deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting popular place" });
  }
};

module.exports.addCountry = async (req, res) => {
  try {
    const { name } = req.body;
    let country = await countryModel.findOne({ name: name });
    if (country) {
      return res.status(400).send("This country already exists");
    }
    country = await countryModel.create(req.body);
    res.status(201).send(country);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.deleteCountry = async (req, res) => {
  try {
    const country = await countryModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Country deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.addVlog = async (req, res) => {
  try {
    const newVlog = await vlogModel.create(req.body);
    res.status(201).send(newVlog);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

module.exports.deleteVlog = async (req, res) => {
  try {
    const vlog = await vlogModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Vlog deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};
