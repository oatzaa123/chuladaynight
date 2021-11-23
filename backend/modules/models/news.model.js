const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  title_th: { type: String, required: [true, "title is not be empty"] },
  title_en: { type: String },
  path: { type: String },
  coverImage: {
    path: String,
    name: String,
  },
  content: [
    {
      _id: false,
      path: String,
      contentType: String,
      contentValue: String,
      contentValue_th: String,
      contentValue_en: String,
    },
  ],
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    default: Date.now(),
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
