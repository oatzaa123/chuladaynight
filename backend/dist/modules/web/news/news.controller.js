"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteNews = exports.updateNews = exports.addNews = exports.perviousNews = exports.nextNews = exports.getOneNews = exports.getNews = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _catchAsync = _interopRequireDefault(require("../../../helpers/catchAsync"));

var _apiFeatures = _interopRequireDefault(require("../../../utils/apiFeatures"));

var _errorHandler = _interopRequireDefault(require("../../../helpers/errorHandler"));

var _news = _interopRequireDefault(require("./../../models/news.model"));

var _upload = require("./../../../middleware/upload");

var _util = _interopRequireDefault(require("util"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var unlink = _util.default.promisify(_fs.default.unlink);

var getNews = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
    var featuresNews, AllNews, totalItems;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            featuresNews = new _apiFeatures.default(_news.default.find(), req.query).filter().limitFields().paginate().sort();
            _context.next = 3;
            return featuresNews.query;

          case 3:
            AllNews = _context.sent;
            _context.next = 6;
            return _news.default.find();

          case 6:
            totalItems = _context.sent;
            res.status(200).json({
              status: 'success',
              data: {
                page: req.query.page,
                perPage: req.query.limit,
                totalItems: totalItems.length,
                News: AllNews
              }
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
exports.getNews = getNews;
var getOneNews = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res, next) {
    var id, news;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _news.default.findById(id);

          case 3:
            news = _context2.sent;

            if (news) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 6:
            res.status(200).json({
              status: 'success',
              data: {
                news: news
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
exports.getOneNews = getOneNews;
var nextNews = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res, next) {
    var id, AllNews, news, nextId, nextNews;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _news.default.find();

          case 3:
            AllNews = _context3.sent;
            news = AllNews.find(function (item) {
              return item._id.toString() === id;
            });

            if (news) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 7:
            _context3.next = 9;
            return _news.default.findOne({
              createdAt: {
                $gt: news.createdAt
              }
            });

          case 9:
            nextId = _context3.sent;
            nextNews = nextId ? nextId : AllNews.find(function (_, index) {
              return index === 0;
            });
            res.status(200).json({
              status: 'success',
              data: {
                news: nextNews
              }
            });

          case 12:
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
exports.nextNews = nextNews;
var perviousNews = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res, next) {
    var id, AllNews, news, perviousId, perviousNews;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _news.default.find();

          case 3:
            AllNews = _context4.sent;
            news = AllNews.find(function (item) {
              return item._id.toString() === id;
            });

            if (news) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 7:
            // const perviousId = await news.findOne({
            //     createdAt: { $lt: news.createdAt },
            // })
            perviousId = AllNews.findIndex(function (item) {
              return item._id === news._id;
            });
            perviousNews = perviousId > 0 ? AllNews.find(function (_, index) {
              return index === perviousId - 1;
            }) : AllNews.find(function (_, index) {
              return index === AllNews.length - 1;
            });
            res.status(200).json({
              status: 'success',
              data: {
                news: perviousNews
              }
            });

          case 10:
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
exports.perviousNews = perviousNews;
var addNews = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(req, res, next) {
    var _req$body, title_th, title_en, path, description, contentImages, coverImageName, _req$files, coverImage, contentImage, name, arrImg, contents, news;

    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body = req.body, title_th = _req$body.title_th, title_en = _req$body.title_en, path = _req$body.path, description = _req$body.description;
            contentImages = [];

            if (!req.files) {
              _context7.next = 12;
              break;
            }

            _req$files = req.files, coverImage = _req$files.coverImage, contentImage = _req$files.contentImage;

            if (!coverImage) {
              _context7.next = 11;
              break;
            }

            _context7.next = 7;
            return (0, _upload.uploadFile)(coverImage, path);

          case 7:
            name = _context7.sent;

            if (name) {
              _context7.next = 10;
              break;
            }

            return _context7.abrupt("return", next(new _errorHandler.default("Fail to upload image.", 400)));

          case 10:
            coverImageName = {
              path: path,
              name: name
            };

          case 11:
            if (contentImage) {
              if (contentImage.length > 0) {
                contentImage, (0, _readOnlyError2.default)("contentImages");
              } else {
                contentImages.push(contentImage);
              }
            }

          case 12:
            arrImg = [];

            if (!(contentImages.length > 0)) {
              _context7.next = 16;
              break;
            }

            _context7.next = 16;
            return Promise.all(contentImages.map( /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(item) {
                var name;
                return _regenerator.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return (0, _upload.uploadFile)(item, path);

                      case 2:
                        name = _context5.sent;

                        if (name) {
                          _context5.next = 5;
                          break;
                        }

                        return _context5.abrupt("return", next(new _errorHandler.default("Fail to upload image.", 400)));

                      case 5:
                        arrImg.push({
                          path: path,
                          contentType: 'Image',
                          contentValue: name,
                          contentName: item.name
                        });

                      case 6:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x16) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 16:
            contents = [];
            _context7.next = 19;
            return description.map( /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(item) {
                var img, _JSON$parse, th, en;

                return _regenerator.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        img = arrImg.find(function (i) {
                          return i.contentName === item;
                        }) || null;

                        if (img) {
                          contents.push({
                            path: img.path,
                            contentType: img.contentType,
                            contentValue: img.contentValue
                          });
                        } else {
                          _JSON$parse = JSON.parse(item), th = _JSON$parse.th, en = _JSON$parse.en;
                          contents.push({
                            contentType: 'Text',
                            contentValue_th: th,
                            contentValue_en: en
                          });
                        }

                      case 2:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x17) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 19:
            news = new _news.default({
              title_th: title_th,
              title_en: title_en,
              coverImage: coverImageName,
              path: path,
              content: contents,
              createdAt: Date.now(),
              updatedAt: Date.now()
            });
            _context7.next = 22;
            return news.save();

          case 22:
            res.status(201).json({
              status: 'success',
              data: news
            });

          case 23:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
exports.addNews = addNews;
var updateNews = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(req, res, next) {
    var id, _req$body2, title_th, title_en, path, description, oldFile, contentImages, coverImageName, news, _req$files2, coverImage, contentImage, name, arrImg, contents;

    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, title_th = _req$body2.title_th, title_en = _req$body2.title_en, path = _req$body2.path, description = _req$body2.description, oldFile = _req$body2.oldFile;
            contentImages = [];
            _context10.next = 5;
            return _news.default.findById(id);

          case 5:
            news = _context10.sent;

            if (news) {
              _context10.next = 8;
              break;
            }

            return _context10.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 8:
            if (!req.files) {
              _context10.next = 20;
              break;
            }

            _req$files2 = req.files, coverImage = _req$files2.coverImage, contentImage = _req$files2.contentImage;

            if (!coverImage) {
              _context10.next = 19;
              break;
            }

            if (JSON.parse(oldFile) && JSON.parse(oldFile).coverImage && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/").concat(JSON.parse(oldFile).coverImage)))) {
              _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/"), JSON.parse(oldFile).coverImage));
            }

            _context10.next = 14;
            return (0, _upload.uploadFile)(coverImage, path);

          case 14:
            name = _context10.sent;

            if (name) {
              _context10.next = 17;
              break;
            }

            return _context10.abrupt("return", next(new _errorHandler.default("Fail to upload image.", 400)));

          case 17:
            coverImageName = {
              path: path,
              name: name
            };
            news.coverImage = coverImageName;

          case 19:
            if (contentImage) {
              if (contentImage.length > 0) {
                contentImage, (0, _readOnlyError2.default)("contentImages");
              } else {
                contentImages.push(contentImage);
              }
            }

          case 20:
            arrImg = [];

            if (!(contentImages.length > 0)) {
              _context10.next = 24;
              break;
            }

            _context10.next = 24;
            return Promise.all(contentImages.map( /*#__PURE__*/function () {
              var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(item) {
                var name;
                return _regenerator.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        if (JSON.parse(oldFile) && JSON.parse(oldFile).contentImage && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/").concat(JSON.parse(oldFile).contentImage)))) {
                          _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/"), JSON.parse(oldFile).contentImage));
                        }

                        _context8.next = 3;
                        return (0, _upload.uploadFile)(item, path);

                      case 3:
                        name = _context8.sent;

                        if (name) {
                          _context8.next = 6;
                          break;
                        }

                        return _context8.abrupt("return", next(new _errorHandler.default("Fail to upload image.", 400)));

                      case 6:
                        arrImg.push({
                          path: path,
                          contentType: 'Image',
                          contentValue: name,
                          contentName: item.name
                        });

                      case 7:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x21) {
                return _ref9.apply(this, arguments);
              };
            }()));

          case 24:
            contents = [];

            if (!(description && description.length > 0)) {
              _context10.next = 28;
              break;
            }

            _context10.next = 28;
            return description.map( /*#__PURE__*/function () {
              var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(item) {
                var img, _JSON$parse2, th, en;

                return _regenerator.default.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        img = arrImg.find(function (i) {
                          return i.contentName === item;
                        }) || null;

                        if (img) {
                          contents.push({
                            path: img.path,
                            contentType: img.contentType,
                            contentValue: img.contentValue
                          });
                        } else {
                          _JSON$parse2 = JSON.parse(item), th = _JSON$parse2.th, en = _JSON$parse2.en;
                          contents.push({
                            contentType: 'Text',
                            contentValue_th: th,
                            contentValue_en: en
                          });
                        }

                      case 2:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x22) {
                return _ref10.apply(this, arguments);
              };
            }());

          case 28:
            news.title_th = title_th;
            news.title_en = title_en;
            news.path = path;
            news.content = contents;
            news.updatedAt = Date.now();
            _context10.next = 35;
            return news.save();

          case 35:
            res.status(200).json({
              status: 'success',
              data: news
            });

          case 36:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function (_x18, _x19, _x20) {
    return _ref8.apply(this, arguments);
  };
}());
exports.updateNews = updateNews;
var deleteNews = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(req, res, next) {
    var id, news, _news$coverImage, path, name, image, imageDirectory;

    return _regenerator.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            id = req.params.id;
            _context12.next = 3;
            return _news.default.findById(id);

          case 3:
            news = _context12.sent;
            _news$coverImage = news.coverImage, path = _news$coverImage.path, name = _news$coverImage.name;
            image = news.content.filter(function (i) {
              return i.contentType === 'Image';
            });
            imageDirectory = _path.default.join(__dirname, "../../../assets/uploads/images/".concat(path));
            _context12.next = 9;
            return checkImages(imageDirectory, name);

          case 9:
            if (image.length > 0) {
              image.map( /*#__PURE__*/function () {
                var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(i) {
                  return _regenerator.default.wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          _context11.next = 2;
                          return checkImages(imageDirectory, i.contentValue);

                        case 2:
                          return _context11.abrupt("return", _context11.sent);

                        case 3:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }));

                return function (_x26) {
                  return _ref12.apply(this, arguments);
                };
              }());
            }

            _context12.next = 12;
            return _news.default.deleteOne({
              _id: id
            });

          case 12:
            res.status(204).send();

          case 13:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function (_x23, _x24, _x25) {
    return _ref11.apply(this, arguments);
  };
}());
exports.deleteNews = deleteNews;

var checkImages = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13(directory, filename) {
    var unlinkPromises;
    return _regenerator.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return unlink("".concat(directory, "/").concat(filename));

          case 2:
            unlinkPromises = _context13.sent;
            return _context13.abrupt("return", unlinkPromises);

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function checkImages(_x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}();
//# sourceMappingURL=news.controller.js.map