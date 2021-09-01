"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _gallery = require("./gallery.controller");

var router = _express.default.Router();

router.route('/').get(_gallery.getGalleries).post(_gallery.addGallery);
router.route('/:id').get(_gallery.getGallery).put(_gallery.updateGallery).delete(_gallery.deleteGallery);
router.route('/:id/nextGallery').get(_gallery.nextGallery);
router.route('/:id/perviousGallery').get(_gallery.perviousGallery);
var _default = router;
exports.default = _default;
//# sourceMappingURL=gallery.routes.js.map