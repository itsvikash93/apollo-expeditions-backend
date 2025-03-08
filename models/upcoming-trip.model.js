const mongoose = require("mongoose");

const upcomingTripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  imageKey: {
    type: String,
    required: true,
    trim: true,
  },
  pdfUrl: {
    type: String,
    required: true,
    trim: true,
  },
  pdfKey: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("UpcomingTrip", upcomingTripSchema);
