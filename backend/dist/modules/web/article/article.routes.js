"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _article = require("./article.controller");

var router = _express.default.Router();

router.route('/').get(_article.getArticles).post(_article.addArticle);
router.route('/:id').get(_article.getArticle).put(_article.updateArticle).delete(_article.deleteArticle);
var _default = router;
exports.default = _default;
//# sourceMappingURL=article.routes.js.map