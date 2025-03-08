const mongoose = require("mongoose");
const slugify = require("slugify");

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  slug: {
    type: String,
    unique: true,
  },
  popularPlaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PopularPlace",
    },
  ],
});

countrySchema.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Country", countrySchema);
