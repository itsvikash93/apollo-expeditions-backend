const offerModel = require("../models/offer.model");

module.exports.getOffers = async (req, res) => {
  const offers = await offerModel.find().populate("packages");
  res.status(200).json(offers);
};

module.exports.getOfferBySlug = async (req, res) => {
  const offer = await offerModel.findOne({ slug: req.params.slug }).populate(
    "packages"
  );
  res.status(200).json(offer);
};
