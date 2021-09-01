"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var gallerySchema = _mongoose.default.Schema({
  title_th: {
    type: String,
    required: [true, 'title is not be empty']
  },
  title_en: {
    type: String
  },
  author: {
    name_th: {
      type: String
    },
    name_en: {
      type: String
    },
    image: {
      path: String,
      name: String
    },
    group_th: {
      type: String
    },
    group_en: {
      type: String
    },
    contact: {
      facebook: {
        type: String
      },
      line: {
        type: String
      },
      email: {
        type: String
      },
      phone: {
        type: String
      }
    }
  },
  live: {
    videos: [{
      path: String,
      name: String,
      liveTime: {
        type: Number,
        default: Date.now()
      }
    }],
    createdAt: {
      type: Number,
      default: Date.now()
    },
    updatedAt: {
      type: Number,
      default: Date.now()
    }
  },
  shortDescription_th: {
    type: String
  },
  shortDescription_en: {
    type: String
  },
  coverImage: {
    path: String,
    name: String
  },
  location: {
    latitude: String,
    longitude: String
  },
  content: [{
    _id: false,
    path: String,
    contentType: String,
    contentValue: String,
    contentValue_th: String,
    contentValue_en: String
  }],
  countViews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Number,
    default: Date.now()
  },
  updatedAt: {
    type: Number,
    default: Date.now()
  }
});

var Gallery = _mongoose.default.model('Gallery', gallerySchema);

var _default = Gallery;
exports.default = _default;
//# sourceMappingURL=gallery.model.js.map