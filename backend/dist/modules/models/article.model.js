"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var articleSchema = _mongoose.default.Schema({
  coverImage: {
    path: String,
    name: String
  },
  title_th: String,
  title_en: String,
  description_th: String,
  description_en: String,
  year: String,
  createdAt: {
    type: String,
    default: Date.now()
  },
  updatedAt: {
    type: String,
    default: Date.now()
  }
});

var Article = _mongoose.default.model('Article', articleSchema);

var _default = Article;
exports.default = _default;
//# sourceMappingURL=article.model.js.map