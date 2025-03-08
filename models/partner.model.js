const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageKey: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
});

const partnerModel = mongoose.model("Partner", partnerSchema);

module.exports = partnerModel;
