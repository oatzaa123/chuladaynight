"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteWorkshop = exports.updateWorkshop = exports.addWorkshop = exports.getWorkshop = exports.getWorkshops = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _catchAsync = _interopRequireDefault(require("../../../helpers/catchAsync"));

var _apiFeatures = _interopRequireDefault(require("../../../utils/apiFeatures"));

var _errorHandler = _interopRequireDefault(require("../../../helpers/errorHandler"));

var _workshop = _interopRequireDefault(require("./../../models/workshop.model"));

var _upload = require("./../../../middleware/upload");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _util = _interopRequireDefault(require("util"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var unlink = _util.default.promisify(_fs.default.unlink);

var getWorkshops = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
    var featuresWorkshop, AllWorkshop;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            featuresWorkshop = new _apiFeatures.default(_workshop.default.find(), req.query).filter().limitFields().paginate().sort();
            _context.next = 3;
            return featuresWorkshop.query;

          case 3:
            AllWorkshop = _context.sent;
            res.status(200).json({
              status: 'success',
              data: {
                Workshop: AllWorkshop
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
exports.getWorkshops = getWorkshops;
var getWorkshop = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res, next) {
    var id, workshop;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _workshop.default.findById(id);

          case 3:
            workshop = _context2.sent;

            if (workshop) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 6:
            res.status(200).json({
              status: 'success',
              data: {
                workshop: workshop
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
exports.getWorkshop = getWorkshop;
var addWorkshop = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res, next) {
    var coverImageName, imageName, _req$body, contact, path, _req$files, coverImage, image, name, _name, obj, workshop;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, contact = _req$body.contact, path = _req$body.path;

            if (!req.files) {
              _context3.next = 17;
              break;
            }

            _req$files = req.files, coverImage = _req$files.coverImage, image = _req$files.image;

            if (!coverImage) {
              _context3.next = 10;
              break;
            }

            _context3.next = 6;
            return (0, _upload.uploadFile)(image, path);

          case 6:
            name = _context3.sent;

            if (name) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", next(new _errorHandler.default("Can't upload image! please try again.", 500)));

          case 9:
            coverImageName = {
              path: path,
              name: name
            };

          case 10:
            if (!image) {
              _context3.next = 17;
              break;
            }

            _context3.next = 13;
            return (0, _upload.uploadFile)(image, path);

          case 13:
            _name = _context3.sent;

            if (_name) {
              _context3.next = 16;
              break;
            }

            return _context3.abrupt("return", next(new _errorHandler.default("Can't upload image! please try again.", 500)));

          case 16:
            imageName = {
              path: path,
              name: _name
            };

          case 17:
            obj = _objectSpread(_objectSpread({}, req.body), {}, {
              coverImage: coverImageName,
              image: imageName,
              contact: JSON.parse(contact)
            });
            _context3.next = 20;
            return _workshop.default.create(obj);

          case 20:
            workshop = _context3.sent;
            res.status(201).json({
              status: 'success',
              data: {
                workshop: workshop
              }
            });

          case 22:
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
exports.addWorkshop = addWorkshop;

var updateWorkshop = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res, next) {
    var id, _req$body2, title_th, title_en, path, description_th, description_en, contact, locationName_en, locationName_th, oldImage, coverImageName, workshop, _req$files2, coverImage, image, name, _name2;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, title_th = _req$body2.title_th, title_en = _req$body2.title_en, path = _req$body2.path, description_th = _req$body2.description_th, description_en = _req$body2.description_en, contact = _req$body2.contact, locationName_en = _req$body2.locationName_en, locationName_th = _req$body2.locationName_th, oldImage = _req$body2.oldImage;
            _context4.next = 4;
            return _workshop.default.findById(id);

          case 4:
            workshop = _context4.sent;

            if (workshop) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 7:
            if (!req.files) {
              _context4.next = 27;
              break;
            }

            _req$files2 = req.files, coverImage = _req$files2.coverImage, image = _req$files2.image;

            if (!coverImage) {
              _context4.next = 18;
              break;
            }

            if (JSON.parse(oldFile) && JSON.parse(oldFile).coverImage && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/").concat(JSON.parse(oldImage).coverImage)))) {
              _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/"), JSON.parse(oldImage).coverImage));
            }

            _context4.next = 13;
            return (0, _upload.uploadFile)(image, path);

          case 13:
            name = _context4.sent;

            if (name) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return", next(new _errorHandler.default("Can't upload image! please try again.", 500)));

          case 16:
            coverImageName = {
              path: path,
              name: name
            };
            workshop.coverImage = coverImageName;

          case 18:
            if (!image) {
              _context4.next = 27;
              break;
            }

            if (JSON.parse(oldFile) && JSON.parse(oldFile).contentImage && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/").concat(JSON.parse(oldImage).contentImage)))) {
              _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/"), JSON.parse(oldImage).contentImage));
            }

            _context4.next = 22;
            return (0, _upload.uploadFile)(image, path);

          case 22:
            _name2 = _context4.sent;

            if (_name2) {
              _context4.next = 25;
              break;
            }

            return _context4.abrupt("return", next(new _errorHandler.default("Can't upload image! please try again.", 500)));

          case 25:
            imageName = {
              path: path,
              name: _name2
            };
            workshop.image = imageName;

          case 27:
            workshop.title_th = title_th;
            workshop.title_en = title_en;
            workshop.description_th = description_th;
            workshop.description_en = description_en;
            workshop.contact.facebook = JSON.parse(contact).contact.facebook;
            workshop.contact.telephone = JSON.parse(contact).contact.telephone;
            workshop.contact.instagram = JSON.parse(contact).contact.instagram;
            workshop.contact.mailto = JSON.parse(contact).contact.mailto;
            workshop.contact.location = JSON.parse(contact).contact.location;
            workshop.locationName_th = locationName_th;
            workshop.locationName_en = locationName_en;
            _context4.next = 40;
            return workshop.save();

          case 40:
            res.status(200).json({
              status: 'success',
              data: workshop
            });

          case 41:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateWorkshop(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateWorkshop = updateWorkshop;
var deleteWorkshop = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(req, res, next) {
    var id, workshop, _workshop$coverImage, path, name, imgName, imageDirectory;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _workshop.default.findById(id);

          case 3:
            workshop = _context5.sent;
            _workshop$coverImage = workshop.coverImage, path = _workshop$coverImage.path, name = _workshop$coverImage.name;
            imgName = workshop.image.name;
            imageDirectory = _path.default.join(__dirname, "../../../assets/uploads/images/".concat(path));
            _context5.next = 9;
            return checkImages(imageDirectory, name);

          case 9:
            _context5.next = 11;
            return checkImages(imageDirectory, imgName);

          case 11:
            _context5.next = 13;
            return _workshop.default.deleteOne({
              _id: id
            });

          case 13:
            res.status(204).send();

          case 14:
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
exports.deleteWorkshop = deleteWorkshop;

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
//# sourceMappingURL=workshop.controller.js.map