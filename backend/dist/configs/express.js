"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _helmet = _interopRequireDefault(require("helmet"));

var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));

var _xssClean = _interopRequireDefault(require("xss-clean"));

var _hpp = _interopRequireDefault(require("hpp"));

require("./database");

var app = (0, _express.default)();

function _default() {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var limiter;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app.use((0, _helmet.default)());
            limiter = (0, _expressRateLimit.default)({
              max: 100,
              windowMs: 60 * 1000,
              message: 'Too many requests from this IP, please try again in an minutes!'
            });
            app.use('/api', limiter);
            app.use((0, _cors.default)());
            app.use((0, _expressFileupload.default)({
              limits: {
                fileSize: 50 * 1024 * 5024000
              }
            }));
            app.use(function (req, res, next) {
              res.header('Access-Control-Allow-Origin', '*');
              res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
              next();
            });
            app.use(_express.default.json({
              limit: '10kb'
            }));
            app.use(_express.default.urlencoded({
              extended: false,
              limit: '500mb'
            }));
            app.use((0, _expressMongoSanitize.default)());
            app.use((0, _xssClean.default)());
            app.use((0, _hpp.default)());

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}
//# sourceMappingURL=express.js.map