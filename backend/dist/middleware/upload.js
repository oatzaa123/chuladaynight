"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadModel = exports.uploadVideo = exports.uploadFile = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _sharp = _interopRequireDefault(require("sharp"));

var _fs = _interopRequireDefault(require("fs"));

var uploadFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(file, pathFolder) {
    var _yield$file, mimetype, name, imageName, storePath;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return file;

          case 2:
            _yield$file = _context.sent;
            mimetype = _yield$file.mimetype;
            name = _yield$file.name;

            if (!(['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].indexOf(mimetype) < 0)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", false);

          case 7:
            imageName = "".concat(Date.now(), ".").concat(name.split('.')[name.split('.').length - 1]);
            storePath = _path.default.join(__dirname, "/../assets/uploads/images/".concat(pathFolder, "/"), imageName);

            if (!_fs.default.existsSync(_path.default.join(__dirname, "/../assets/uploads/images/".concat(pathFolder, "/")))) {
              _fs.default.mkdirSync(_path.default.join(__dirname, "/../assets/uploads/images/".concat(pathFolder, "/")));
            }

            file.mv(storePath, function (err) {
              if (err) {
                console.log(err);
                return false;
              }
            }); // const img = await sharp(file.data)
            //     .resize({ height: '500px', fit: 'fill' })
            //     .png()
            //     .toFile(storePath)
            // return img ? imageName : null

            return _context.abrupt("return", imageName);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function uploadFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadFile = uploadFile;

var uploadVideo = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(file, pathFolder) {
    var _yield$file2, mimetype, name, videoName, storePath;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return file;

          case 2:
            _yield$file2 = _context2.sent;
            mimetype = _yield$file2.mimetype;
            name = _yield$file2.name;

            if (!(['video/mp4', 'video/x-matroska'].indexOf(mimetype) < 0)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", false);

          case 7:
            videoName = "".concat(Date.now(), ".").concat(name.split('.')[name.split('.').length - 1]);
            storePath = _path.default.join(__dirname, "/../assets/uploads/videos/".concat(pathFolder, "/"), videoName);

            if (!_fs.default.existsSync(_path.default.join(__dirname, "/../assets/uploads/videos/".concat(pathFolder, "/")))) {
              _fs.default.mkdirSync(_path.default.join(__dirname, "/../assets/uploads/videos/".concat(pathFolder, "/")));
            }

            file.mv(storePath, function (err) {
              if (err) return false;
            });
            return _context2.abrupt("return", videoName);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function uploadVideo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.uploadVideo = uploadVideo;

var uploadModel = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(file, pathFolder) {
    var _yield$file3, mimetype, name, modelName, storePath;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return file;

          case 2:
            _yield$file3 = _context3.sent;
            mimetype = _yield$file3.mimetype;
            name = _yield$file3.name;

            if (!(['model/glb', 'model/gltf-binary'].indexOf(mimetype) < 0)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", false);

          case 7:
            modelName = "".concat(Date.now(), ".").concat(name.split('.')[name.split('.').length - 1]);
            storePath = _path.default.join(__dirname, "/../assets/uploads/models/".concat(pathFolder, "/"), modelName);

            if (!_fs.default.existsSync(_path.default.join(__dirname, "/../assets/uploads/models/".concat(pathFolder, "/")))) {
              _fs.default.mkdirSync(_path.default.join(__dirname, "/../assets/uploads/models/".concat(pathFolder, "/")));
            }

            file.mv(storePath, function (err) {
              if (err) return false;
            });
            return _context3.abrupt("return", modelName);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function uploadModel(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.uploadModel = uploadModel;
//# sourceMappingURL=upload.js.map