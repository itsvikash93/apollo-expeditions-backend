const packageModel = require("../models/package.model");

module.exports.getPackages = async (req, res) => {
  const packages = await packageModel.find().populate("offersAndPackages");
  res.status(200).json(packages);
};

module.exports.getPackageById = async (req, res) => {
  const package = await packageModel.findById(req.params.id);
  res.status(200).json(package);
};
