"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteArticle = exports.updateArticle = exports.addArticle = exports.getArticle = exports.getArticles = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _catchAsync = _interopRequireDefault(require("../../../helpers/catchAsync"));

var _apiFeatures = _interopRequireDefault(require("../../../utils/apiFeatures"));

var _errorHandler = _interopRequireDefault(require("../../../helpers/errorHandler"));

var _article = _interopRequireDefault(require("./../../models/article.model"));

var _upload = require("./../../../middleware/upload");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = _interopRequireDefault(require("util"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var unlink = _util.default.promisify(_fs.default.unlink);

var getArticles = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
    var featuresArticle, AllArticle;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            featuresArticle = new _apiFeatures.default(_article.default.find(), req.query).filter().limitFields().paginate().sort();
            _context.next = 3;
            return featuresArticle.query;

          case 3:
            AllArticle = _context.sent;
            res.status(200).json({
              status: 'success',
              data: {
                Article: AllArticle
              }
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
exports.getArticles = getArticles;
var getArticle = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res, next) {
    var id, article;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _article.default.findById(id);

          case 3:
            article = _context2.sent;

            if (article) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 6:
            res.status(200).json({
              status: 'success',
              data: {
                article: article
              }
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
exports.getArticle = getArticle;
var addArticle = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res, next) {
    var coverImageName, path, coverImage, name, obj, article;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            path = req.body.path;

            if (!req.files) {
              _context3.next = 10;
              break;
            }

            coverImage = req.files.coverImage;

            if (!coverImage) {
              _context3.next = 10;
              break;
            }

            _context3.next = 6;
            return (0, _upload.uploadFile)(coverImage, path);

          case 6:
            name = _context3.sent;

            if (name) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", next(new _errorHandler.default("Fail to upload image.", 400)));

          case 9:
            coverImageName = {
              path: path,
              name: name
            };

          case 10:
            obj = _objectSpread(_objectSpread({}, req.body), {}, {
              coverImage: coverImageName
            });
            _context3.next = 13;
            return _article.default.create(obj);

          case 13:
            article = _context3.sent;
            res.status(201).json({
              status: 'success',
              data: {
                article: article
              }
            });

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
exports.addArticle = addArticle;
var updateArticle = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res, next) {
    var coverImageName, id, _req$body, path, title_en, title_th, description_th, description_en, year, oldFile, article, coverImage, name;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _req$body = req.body, path = _req$body.path, title_en = _req$body.title_en, title_th = _req$body.title_th, description_th = _req$body.description_th, description_en = _req$body.description_en, year = _req$body.year, oldFile = _req$body.oldFile;
            _context4.next = 4;
            return _article.default.findById(id);

          case 4:
            article = _context4.sent;

            if (article) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 7:
            if (!req.files) {
              _context4.next = 18;
              break;
            }

            coverImage = req.files.coverImage;

            if (!coverImage) {
              _context4.next = 18;
              break;
            }

            if (JSON.parse(oldFile) && JSON.parse(oldFile).coverImage && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/").concat(JSON.parse(oldFile).coverImage)))) {
              _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/"), JSON.parse(oldFile).coverImage));
            }

            _context4.next = 13;
            return (0, _upload.uploadFile)(coverImage, path);

          case 13:
            name = _context4.sent;

            if (name) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return", next(new _errorHandler.default("Fail to upload image.", 400)));

          case 16:
            coverImageName = {
              path: path,
              name: name
            };
            article.coverImage = coverImageName;

          case 18:
            article.title_th = title_th;
            article.title_en = title_en;
            article.description_th = description_th;
            article.description_en = description_en;
            article.year = year;
            _context4.next = 25;
            return article.save();

          case 25:
            res.status(201).json({
              status: 'success',
              data: {
                article: article
              }
            });

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
exports.updateArticle = updateArticle;
var deleteArticle = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(req, res, next) {
    var id, article, _article$coverImage, path, name, imageDirectory;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _article.default.findById(id);

          case 3:
            article = _context5.sent;
            _article$coverImage = article.coverImage, path = _article$coverImage.path, name = _article$coverImage.name;
            imageDirectory = _path.default.join(__dirname, "../../../assets/uploads/images/".concat(path));
            _context5.next = 8;
            return checkImages(imageDirectory, name);

          case 8:
            _context5.next = 10;
            return _article.default.deleteOne({
              _id: id
            });

          case 10:
            res.status(204).send();

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
exports.deleteArticle = deleteArticle;

var checkImages = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(directory, filename) {
    var unlinkPromises;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return unlink("".concat(directory, "/").concat(filename));

          case 2:
            unlinkPromises = _context6.sent;
            return _context6.abrupt("return", unlinkPromises);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function checkImages(_x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();
//# sourceMappingURL=article.controller.js.map