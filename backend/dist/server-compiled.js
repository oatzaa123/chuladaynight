"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _app = _interopRequireDefault(require("./configs/app"));

var _errorHandler = _interopRequireDefault(require("./helpers/errorHandler"));

var _errorController = _interopRequireDefault(require("./helpers/errorController"));

var _index = _interopRequireDefault(require("./modules/web/index"));

require("./configs/express");

var app = (0, _express.default)(); // (app)

app.use('/', _index.default);
app.use('/images', _express.default.static(_path.default.join(__dirname, './assets/uploads/images')));
app.use('/videos', _express.default.static(_path.default.join(__dirname, './assets/uploads/videos')));
app.use('/models', _express.default.static(_path.default.join(__dirname, './assets/uploads/models')));
app.all('*', function (req, res, next) {
  next(new _errorHandler.default("Can't find ".concat(req.originalUrl, " on this server !"), 404));
});
app.use(_errorController.default);
app.listen(_app.default.port, function () {
  return console.log("Server is running on port : ".concat(_app.default.port));
});
//# sourceMappingURL=server-compiled.js.map