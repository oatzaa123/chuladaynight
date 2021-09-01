"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}
//# sourceMappingURL=catchAsync.js.map