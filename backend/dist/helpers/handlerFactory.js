"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOne = exports.updateOne = exports.deleteOne = exports.getAll = exports.getOne = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("../config"));

var _catchAsync = _interopRequireDefault(require("./catchAsync"));

var _errorHandler = _interopRequireDefault(require("../utils/errorHandler"));

var _apiFeatures = _interopRequireDefault(require("../utils/apiFeatures"));

var getOne = function getOne(Model, popOptions) {
  return (0, _catchAsync.default)( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
      var query, doc;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = Model.findById(req.params.id);
              if (popOptions) query = query.populate(popOptions);
              _context.next = 4;
              return query;

            case 4:
              doc = _context.sent;

              if (doc) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", next(new _errorHandler.default('No document found with that ID', 404)));

            case 7:
              res.status(200).json({
                status: 'success',
                data: doc
              });

            case 8:
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
};

exports.getOne = getOne;

var getAll = function getAll(Model) {
  return (0, _catchAsync.default)( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res, next) {
      var filter, features, doc, page, limit, query, total;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              filter = {};
              features = new _apiFeatures.default(Model.find(filter), req.query).filter().limitFields().paginate().sort();
              _context2.next = 4;
              return features.query;

            case 4:
              doc = _context2.sent;
              page = +req.query.page || 1;
              limit = +req.query.limit || _config.default.pageLimit;
              query = new _apiFeatures.default().excludedFields().forEach(function (el) {
                return delete req.query[el];
              });
              _context2.next = 10;
              return Model.countDocuments(query);

            case 10:
              total = _context2.sent;
              res.status(200).json({
                status: 'success',
                total: total,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                perPage: limit,
                data: doc
              });

            case 12:
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
};

exports.getAll = getAll;

var deleteOne = function deleteOne(Model) {
  return (0, _catchAsync.default)( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res, next) {
      var doc;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Model.findByIdAndDelete(req.params.id);

            case 2:
              doc = _context3.sent;

              if (doc) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", next(new AppError('No document found with that ID', 404)));

            case 5:
              res.status(204).json({
                status: 'success',
                data: null
              });

            case 6:
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
};

exports.deleteOne = deleteOne;

var updateOne = function updateOne(Model) {
  return (0, _catchAsync.default)( /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res, next) {
      var doc;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return Model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
              });

            case 2:
              doc = _context4.sent;

              if (doc) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", next(new AppError('No document found with that ID', 404)));

            case 5:
              res.status(200).json({
                status: 'success',
                data: doc
              });

            case 6:
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
};

exports.updateOne = updateOne;

var createOne = function createOne(Model) {
  return (0, _catchAsync.default)( /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(req, res, next) {
      var doc;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return Model.create(req.body);

            case 2:
              doc = _context5.sent;
              res.status(201).json({
                status: 'success',
                data: doc
              });

            case 4:
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
};

exports.createOne = createOne;
//# sourceMappingURL=handlerFactory.js.map