const mongoose = require("mongoose");

const tripEnquirySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Trip title is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Trip location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Trip date is required"],
      trim: true,
    },
    inclusions: {
      type: String,
      required: [true, "Trip inclusions are required"],
      trim: true,
    },
    exclusions: {
      type: String,
      required: [true, "Trip exclusions are required"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TripEnquiry", tripEnquirySchema);
