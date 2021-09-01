"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var newsSchema = _mongoose.default.Schema({
  title_th: {
    type: String,
    required: [true, 'title is not be empty']
  },
  title_en: {
    type: String
  },
  path: {
    type: String
  },
  coverImage: {
    path: String,
    name: String
  },
  content: [{
    _id: false,
    path: String,
    contentType: String,
    contentValue: String,
    contentValue_th: String,
    contentValue_en: String
  }],
  createdAt: {
    type: Number,
    default: Date.now()
  },
  updatedAt: {
    type: Number,
    default: Date.now()
  }
});

var News = _mongoose.default.model('News', newsSchema);

var _default = News;
exports.default = _default;
//# sourceMappingURL=news.model.js.map