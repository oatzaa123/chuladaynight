const mongoose = require("mongoose");

const networkSchema = mongoose.Schema({
  visitDate: Number,
  ipAddress: String,
  country: String,
  language: String,
  OS: String,
  browser: String,
  gallery_id: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    default: Date.now(),
  },
});

const Network = mongoose.model("Network", networkSchema);

module.exports = Network;
