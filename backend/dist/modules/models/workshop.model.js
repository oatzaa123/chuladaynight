"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var workshopSchema = _mongoose.default.Schema({
  coverImage: {
    path: String,
    name: String
  },
  image: {
    path: String,
    name: String
  },
  title_th: {
    type: String
  },
  title_en: {
    type: String
  },
  description_th: {
    type: String
  },
  description_en: {
    type: String
  },
  locationName_th: {
    type: String
  },
  locationName_en: {
    type: String
  },
  path: {
    type: String
  },
  contact: {
    telephone: {
      type: String
    },
    location: {
      latitude: String,
      longitude: String
    },
    facebook: String,
    instagram: String,
    mailto: String
  },
  createdAt: {
    type: String,
    default: Date.now()
  },
  updatedAt: {
    type: String,
    default: Date.now()
  }
});

var WorkShop = _mongoose.default.model('WorkShop', workshopSchema);

var _default = WorkShop;
exports.default = _default;
//# sourceMappingURL=workshop.model.js.map