const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema({
  title_th: { type: String },
  title_en: { type: String },
  author: {
    name_th: {
      type: String,
    },
    name_en: { type: String },
    image: { path: String, name: String },
    group_th: { type: String },
    group_en: { type: String },
    contact: {
      facebook: { type: String },
      line: { type: String },
      email: { type: String },
      phone: { type: String },
    },
  },
  live: {
    videos: [
      {
        path: String,
        name: String,
        liveTime: { type: Number, default: Date.now() },
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
  },
  shortDescription_th: { type: String },
  shortDescription_en: { type: String },
  coverImage: {
    path: String,
    name: String,
    thumbnail: {
      path: String,
      name: String,
    },
  },
  location: {
    latitude: String,
    longitude: String,
  },
  content: [
    {
      _id: false,
      path: String,
      contentType: String,
      contentValue: String,
      contentValue_th: String,
      contentValue_en: String,
      subtitle: [
        {
          lang: String,
          name: String,
        },
      ],
    },
  ],
  countViews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    default: Date.now(),
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
