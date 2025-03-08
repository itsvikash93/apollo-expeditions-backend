const vlogModel = require("../models/vlog.model");

module.exports.getVlogs = async (req, res) => {
  const vlogs = await vlogModel.find();
  res.status(200).json(vlogs);
};

module.exports.addVlog = async (req, res) => {
  const vlog = await vlogModel.create(req.body);
  res.status(201).json(vlog);
};

module.exports.updateVlog = async (req, res) => {
  const vlog = await vlogModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(vlog);
};

module.exports.deleteVlog = async (req, res) => {
  await vlogModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Vlog deleted" });
};
