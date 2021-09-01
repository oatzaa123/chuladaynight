"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _news = require("./news.controller");

var router = _express.default.Router();

router.route('/').get(_news.getNews).post(_news.addNews);
router.route('/:id').get(_news.getOneNews).put(_news.updateNews).delete(_news.deleteNews);
router.route('/:id/nextNews').get(_news.nextNews);
router.route('/:id/perviousNews').get(_news.perviousNews);
var _default = router;
exports.default = _default;
//# sourceMappingURL=news.routes.js.map