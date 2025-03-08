const mongoose = require("mongoose");

const popularPlaceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageKey: {
    type: String,
    required: true,
  },
  pdfKey: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
});

const PopularPlace = mongoose.model("PopularPlace", popularPlaceSchema);
module.exports = PopularPlace;
