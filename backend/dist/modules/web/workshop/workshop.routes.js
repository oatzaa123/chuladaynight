"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _workshop = require("./workshop.controller");

var router = _express.default.Router();

router.route('/').get(_workshop.getWorkshops).post(_workshop.addWorkshop);
router.route('/:id').get(_workshop.getWorkshop).put(_workshop.updateWorkshop).delete(_workshop.deleteWorkshop);
var _default = router;
exports.default = _default;
//# sourceMappingURL=workshop.routes.js.map