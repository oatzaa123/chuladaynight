const mongoose = require("mongoose");

const partnerSchema = mongoose.Schema({
  coverImage: {
    path: String,
    name: String,
  },
  name: String,
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    default: Date.now(),
  },
});

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;
