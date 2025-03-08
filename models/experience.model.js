const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  imageKey: { type: String, required: true },
});

const experienceModel = mongoose.model("Experience", experienceSchema);

module.exports = experienceModel;
