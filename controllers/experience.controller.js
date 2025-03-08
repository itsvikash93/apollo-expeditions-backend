const experienceModel = require("../models/experience.model");

module.exports.getExperiences = async (req, res) => {
  const experiences = await experienceModel.find();
  res.status(200).json(experiences);
};

module.exports.deleteExperience = async (req, res) => {
  const { id } = req.params;
  await experienceModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Experience deleted successfully" });
};
