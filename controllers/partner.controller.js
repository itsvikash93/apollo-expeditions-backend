const partnerModel = require("../models/partner.model");

module.exports.getPartners = async (req, res) => {
  const partners = await partnerModel.find();
  res.status(200).json(partners);
};
