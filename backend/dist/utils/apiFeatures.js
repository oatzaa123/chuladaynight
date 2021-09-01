"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var APIFeatures = /*#__PURE__*/function () {
  function APIFeatures(query, queryString) {
    (0, _classCallCheck2.default)(this, APIFeatures);
    this.query = query;
    this.queryString = queryString;
  }

  (0, _createClass2.default)(APIFeatures, [{
    key: "filter",
    value: function filter() {
      var queryObj = _objectSpread({}, this.queryString);

      var excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(function (el) {
        return delete queryObj[el];
      }); // 1B) Advanced filtering

      var queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, function (match) {
        return "$".concat(match);
      });
      this.query.find(JSON.parse(queryStr)); // let query = Tour.find(JSON.parse(queryStr))

      return this;
    }
  }, {
    key: "sort",
    value: function sort() {
      if (this.queryString.sort) {
        var sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createAt');
      }

      return this;
    }
  }, {
    key: "limitFields",
    value: function limitFields() {
      if (this.queryString.fields) {
        var fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }

      return this;
    }
  }, {
    key: "paginate",
    value: function paginate() {
      var page = this.queryString.page * 1 || 1;
      var limit = this.queryString.limit * 1 || 100;
      var skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }]);
  return APIFeatures;
}();

var _default = APIFeatures;
exports.default = _default;
//# sourceMappingURL=apiFeatures.js.map