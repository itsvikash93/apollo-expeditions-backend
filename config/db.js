const mongoose = require("mongoose");

require("dotenv").config();

const connectToDB = () => {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to database");
  });
};

module.exports = connectToDB;
