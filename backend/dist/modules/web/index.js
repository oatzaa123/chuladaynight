"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = require("./gallery/index");

var _index2 = require("./workshop/index");

var _index3 = require("./article/index");

var _index4 = require("./news/index");

var router = _express.default.Router();

router.use('/gallery', _index.galleryRoutes);
router.use('/workshop', _index2.workshopRoutes);
router.use('/article', _index3.articleRoutes);
router.use('/news', _index4.newsRoutes);
var _default = router;
exports.default = _default;
//# sourceMappingURL=index.js.map