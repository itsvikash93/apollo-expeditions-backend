const mongoose = require("mongoose");
const slugify = require("slugify");

const offerSchema = new mongoose.Schema({
  name: String,
  slug: {
    type: String,
    unique: true,
  },
  packages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
  ],
});

offerSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
