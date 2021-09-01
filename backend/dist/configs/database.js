"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _app = _interopRequireDefault(require("./app"));

var DB = _app.default.mongodbUri;
var database = {
  mongoDB: function mongoDB() {
    _mongoose.default.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }).then(function () {
      return console.log('DB connection successful!');
    });
  }
};

var _default = database.mongoDB();

exports.default = _default;
//# sourceMappingURL=database.js.map