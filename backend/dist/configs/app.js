"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

var configs = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI
};
var _default = configs;
exports.default = _default;
//# sourceMappingURL=app.js.map