const mongoose = require("mongoose");

const packageEnquirySchema = mongoose.Schema({
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
    required: [true, "Package title is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Package location is required"],
    trim: true,
  },
  date: {
    type: String,
    required: [true, "Package date is required"],
    trim: true,
  },
});

module.exports = mongoose.model("PackageEnquiry", packageEnquirySchema);
