"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteGallery = exports.updateGallery = exports.addGallery = exports.perviousGallery = exports.nextGallery = exports.getGallery = exports.getGalleries = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _catchAsync = _interopRequireDefault(require("../../../helpers/catchAsync"));

var _apiFeatures = _interopRequireDefault(require("../../../utils/apiFeatures"));

var _errorHandler = _interopRequireDefault(require("../../../helpers/errorHandler"));

var _gallery = _interopRequireDefault(require("./../../models/gallery.model"));

var _util = _interopRequireDefault(require("util"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _upload = require("./../../../middleware/upload");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var readdir = _util.default.promisify(_fs.default.readdir);

var unlink = _util.default.promisify(_fs.default.unlink);

var rmdir = _util.default.promisify(_fs.default.rmdir);

var getGalleries = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
    var featuresGallery, AllGallery;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            featuresGallery = new _apiFeatures.default(_gallery.default.find(), req.query).filter().limitFields().paginate().sort();
            _context.next = 3;
            return featuresGallery.query;

          case 3:
            AllGallery = _context.sent;
            res.status(200).json({
              status: 'success',
              data: {
                total: AllGallery.length,
                Gallery: AllGallery
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
exports.getGalleries = getGalleries;
var getGallery = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res, next) {
    var id, gallery;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _gallery.default.findById(id);

          case 3:
            gallery = _context2.sent;

            if (gallery) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 6:
            gallery.countViews += 1;
            _context2.next = 9;
            return gallery.save();

          case 9:
            res.status(200).json({
              status: 'success',
              data: {
                gallery: gallery
              }
            });

          case 10:
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
exports.getGallery = getGallery;
var nextGallery = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res, next) {
    var id, AllGallery, gallery, nextId, nextGallery;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _gallery.default.find();

          case 3:
            AllGallery = _context3.sent;
            gallery = AllGallery.find(function (item) {
              return item._id.toString() === id;
            });

            if (gallery) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 7:
            _context3.next = 9;
            return _gallery.default.findOne({
              createdAt: {
                $gt: gallery.createdAt
              }
            });

          case 9:
            nextId = _context3.sent;
            nextGallery = nextId ? nextId : AllGallery.find(function (_, index) {
              return index === 0;
            });
            res.status(200).json({
              status: 'success',
              data: {
                gallery: nextGallery
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
exports.nextGallery = nextGallery;
var perviousGallery = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res, next) {
    var id, AllGallery, gallery, perviousId, perviousGallery;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _gallery.default.find();

          case 3:
            AllGallery = _context4.sent;
            gallery = AllGallery.find(function (item) {
              return item._id.toString() === id;
            });

            if (gallery) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 7:
            // const perviousId = await Gallery.findOne({
            //     createdAt: { $lt: gallery.createdAt },
            // })
            perviousId = AllGallery.findIndex(function (item) {
              return item._id === gallery._id;
            });
            perviousGallery = perviousId > 0 ? AllGallery.find(function (_, index) {
              return index === perviousId - 1;
            }) : AllGallery.find(function (_, index) {
              return index === AllGallery.length - 1;
            });
            res.status(200).json({
              status: 'success',
              data: {
                gallery: perviousGallery
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
exports.perviousGallery = perviousGallery;
var addGallery = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(req, res, next) {
    var _req$body, title_th, title_en, author, path, shortDescription_th, shortDescription_en, location, description, liveTime, contentImages, contentVideos, contentModels, descriptions, coverImageName, authorImageName, liveVideo, _req$files, coverImage, authorImage, contentVideo, contentImage, contentModel, live, time, arrModel, arrImg, arrVdo, contents, gallery;

    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _req$body = req.body, title_th = _req$body.title_th, title_en = _req$body.title_en, author = _req$body.author, path = _req$body.path, shortDescription_th = _req$body.shortDescription_th, shortDescription_en = _req$body.shortDescription_en, location = _req$body.location, description = _req$body.description, liveTime = _req$body.liveTime;
            contentImages = [];
            contentVideos = [];
            contentModels = [];
            descriptions = [];
            liveVideo = [];

            if (!req.files) {
              _context11.next = 32;
              break;
            }

            _req$files = req.files, coverImage = _req$files.coverImage, authorImage = _req$files.authorImage, contentVideo = _req$files.contentVideo, contentImage = _req$files.contentImage, contentModel = _req$files.contentModel, live = _req$files.live;

            if (contentModel) {
              if (contentModel.length > 0) {
                contentModels = contentModel;
              } else {
                contentModels.push(contentModel);
              }
            }

            if (contentImage) {
              if (contentImage.length > 0) {
                contentImages = contentImage;
              } else {
                contentImages.push(contentImage);
              }
            }

            if (contentVideo) {
              if (contentVideo.length > 0) {
                contentVideos = contentVideo;
              } else {
                contentVideos.push(contentVideo);
              }
            }

            if (!coverImage) {
              _context11.next = 17;
              break;
            }

            _context11.t0 = path;
            _context11.next = 15;
            return (0, _upload.uploadFile)(coverImage, path);

          case 15:
            _context11.t1 = _context11.sent;
            coverImageName = {
              path: _context11.t0,
              name: _context11.t1
            };

          case 17:
            if (!authorImage) {
              _context11.next = 23;
              break;
            }

            _context11.t2 = path;
            _context11.next = 21;
            return (0, _upload.uploadFile)(authorImage, path);

          case 21:
            _context11.t3 = _context11.sent;
            authorImageName = {
              path: _context11.t2,
              name: _context11.t3
            };

          case 23:
            if (!live) {
              _context11.next = 32;
              break;
            }

            time = JSON.parse(liveTime).liveTime;

            if (!(live.length > 0)) {
              _context11.next = 30;
              break;
            }

            _context11.next = 28;
            return Promise.all(live.map( /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(i, index) {
                var name;
                return _regenerator.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return (0, _upload.uploadVideo)(i, path);

                      case 2:
                        name = _context5.sent;

                        if (name) {
                          _context5.next = 5;
                          break;
                        }

                        return _context5.abrupt("return", next(new _errorHandler.default("Can't upload video! please try again.", 500)));

                      case 5:
                        liveVideo.push({
                          path: path,
                          name: name,
                          liveTime: time[index]
                        });

                      case 6:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x16, _x17) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 28:
            _context11.next = 32;
            break;

          case 30:
            _context11.next = 32;
            return Promise.all(time.map( /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(i) {
                var name;
                return _regenerator.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return (0, _upload.uploadVideo)(live, path);

                      case 2:
                        name = _context6.sent;

                        if (name) {
                          _context6.next = 5;
                          break;
                        }

                        return _context6.abrupt("return", next(new _errorHandler.default("Can't upload video! please try again.", 500)));

                      case 5:
                        liveVideo.push({
                          path: path,
                          name: name,
                          liveTime: i
                        });

                      case 6:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x18) {
                return _ref7.apply(this, arguments);
              };
            }()));

          case 32:
            // req.file
            arrModel = [];

            if (!(contentModels.length > 0)) {
              _context11.next = 36;
              break;
            }

            _context11.next = 36;
            return Promise.all(contentModels.map( /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(item) {
                var name;
                return _regenerator.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return (0, _upload.uploadModel)(item, path);

                      case 2:
                        name = _context7.sent;

                        if (name) {
                          _context7.next = 5;
                          break;
                        }

                        return _context7.abrupt("return", next(new _errorHandler.default("Can't upload model! please try again.", 500)));

                      case 5:
                        arrModel.push({
                          path: path,
                          contentType: 'Model',
                          contentValue: name,
                          contentName: item.name
                        });

                      case 6:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x19) {
                return _ref8.apply(this, arguments);
              };
            }()));

          case 36:
            arrImg = [];

            if (!(contentImages.length > 0)) {
              _context11.next = 40;
              break;
            }

            _context11.next = 40;
            return Promise.all(contentImages.map( /*#__PURE__*/function () {
              var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(item) {
                var name;
                return _regenerator.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return (0, _upload.uploadFile)(item, path);

                      case 2:
                        name = _context8.sent;

                        if (name) {
                          _context8.next = 5;
                          break;
                        }

                        return _context8.abrupt("return", next(new _errorHandler.default("Can't upload image! please try again.", 500)));

                      case 5:
                        arrImg.push({
                          path: path,
                          contentType: 'Image',
                          contentValue: name,
                          contentName: item.name
                        });

                      case 6:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x20) {
                return _ref9.apply(this, arguments);
              };
            }()));

          case 40:
            arrVdo = [];

            if (!(contentVideos && contentVideos.length > 0)) {
              _context11.next = 44;
              break;
            }

            _context11.next = 44;
            return Promise.all(contentVideos.map( /*#__PURE__*/function () {
              var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(item) {
                var name;
                return _regenerator.default.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return (0, _upload.uploadVideo)(item, path);

                      case 2:
                        name = _context9.sent;

                        if (name) {
                          _context9.next = 5;
                          break;
                        }

                        return _context9.abrupt("return", next(new _errorHandler.default("Can't upload video! please try again.", 500)));

                      case 5:
                        arrVdo.push({
                          path: path,
                          contentType: 'Video',
                          contentValue: name,
                          contentName: item.name
                        });

                      case 6:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x21) {
                return _ref10.apply(this, arguments);
              };
            }()));

          case 44:
            contents = [];

            if (!(description && description.length > 0)) {
              _context11.next = 49;
              break;
            }

            if (typeof description === 'string') {
              descriptions.push(description);
            } else {
              descriptions = description;
            }

            _context11.next = 49;
            return descriptions.map( /*#__PURE__*/function () {
              var _ref11 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(item) {
                var model, img, vdo, _JSON$parse, th, en;

                return _regenerator.default.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        model = arrModel.filter(function (i) {
                          return i.contentName === item;
                        });
                        img = arrImg.filter(function (i) {
                          return i.contentName === item;
                        });
                        vdo = arrVdo.filter(function (i) {
                          return i.contentName === item;
                        });

                        if (img.length > 0) {
                          contents.push({
                            path: img[0].path,
                            contentType: img[0].contentType,
                            contentValue: img[0].contentValue
                          });
                        } else if (model.length) {
                          contents.push({
                            path: model[0].path,
                            contentType: model[0].contentType,
                            contentValue: model[0].contentValue
                          });
                        } else if (vdo.length) {
                          contents.push({
                            path: vdo[0].path,
                            contentType: vdo[0].contentType,
                            contentValue: vdo[0].contentValue
                          });
                        } else {
                          _JSON$parse = JSON.parse(item), th = _JSON$parse.th, en = _JSON$parse.en;
                          contents.push({
                            contentType: 'Text',
                            contentValue_th: th,
                            contentValue_en: en
                          });
                        }

                      case 4:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              }));

              return function (_x22) {
                return _ref11.apply(this, arguments);
              };
            }());

          case 49:
            gallery = new _gallery.default({
              title_th: title_th,
              title_en: title_en,
              author: _objectSpread(_objectSpread({}, JSON.parse(author)), {}, {
                image: authorImageName
              }),
              coverImage: coverImageName,
              path: path,
              shortDescription_th: shortDescription_th,
              shortDescription_en: shortDescription_en,
              live: {
                videos: liveVideo
              },
              location: JSON.parse(location),
              content: contents,
              createdAt: Date.now(),
              updatedAt: Date.now()
            });
            _context11.next = 52;
            return gallery.save();

          case 52:
            res.status(201).json({
              status: 'success',
              data: gallery
            });

          case 53:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
exports.addGallery = addGallery;
var updateGallery = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18(req, res, next) {
    var _req$body2, title_th, title_en, author, path, shortDescription_th, shortDescription_en, location, description, oldFile, liveTime, id, gallery, contentImages, contentVideos, contentModels, coverImageName, authorImageName, liveVideo, _req$files2, coverImage, authorImage, contentVideo, contentImage, contentModel, live, time, arrModel, arrImg, arrVdo, contents;

    return _regenerator.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _req$body2 = req.body, title_th = _req$body2.title_th, title_en = _req$body2.title_en, author = _req$body2.author, path = _req$body2.path, shortDescription_th = _req$body2.shortDescription_th, shortDescription_en = _req$body2.shortDescription_en, location = _req$body2.location, description = _req$body2.description, oldFile = _req$body2.oldFile, liveTime = _req$body2.liveTime;
            id = req.params.id;
            _context18.next = 4;
            return _gallery.default.findById(id);

          case 4:
            gallery = _context18.sent;

            if (gallery) {
              _context18.next = 7;
              break;
            }

            return _context18.abrupt("return", next(new _errorHandler.default('Data not found', 404)));

          case 7:
            contentImages = [];
            contentVideos = [];
            contentModels = [];
            liveVideo = [];

            if (!req.files) {
              _context18.next = 43;
              break;
            }

            _req$files2 = req.files, coverImage = _req$files2.coverImage, authorImage = _req$files2.authorImage, contentVideo = _req$files2.contentVideo, contentImage = _req$files2.contentImage, contentModel = _req$files2.contentModel, live = _req$files2.live;

            if (contentModel) {
              if (contentModel.length > 0) {
                contentModels = contentModel;
              } else {
                contentModels.push(contentModel);
              }
            }

            if (contentImage) {
              if (contentImage.length > 0) {
                contentImages = contentImage;
              } else {
                contentImages.push(contentImage);
              }
            }

            if (contentVideo) {
              if (contentVideo.length > 0) {
                contentVideos = contentVideo;
              } else {
                contentVideos.push(contentVideo);
              }
            }

            if (!coverImage) {
              _context18.next = 24;
              break;
            }

            if (JSON.parse(oldFile) && JSON.parse(oldFile).coverImage && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/").concat(JSON.parse(oldFile).coverImage)))) {
              _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/"), JSON.parse(oldFile).coverImage));
            }

            _context18.t0 = path;
            _context18.next = 21;
            return (0, _upload.uploadFile)(coverImage, path);

          case 21:
            _context18.t1 = _context18.sent;
            coverImageName = {
              path: _context18.t0,
              name: _context18.t1
            };
            gallery.coverImage = coverImageName;

          case 24:
            if (!authorImage) {
              _context18.next = 32;
              break;
            }

            if (JSON.parse(oldFile) && JSON.parse(oldFile).authorImage && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/").concat(JSON.parse(oldFile).authorImage)))) {
              _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/"), JSON.parse(oldFile).authorImage));
            }

            _context18.t2 = path;
            _context18.next = 29;
            return (0, _upload.uploadFile)(authorImage, path);

          case 29:
            _context18.t3 = _context18.sent;
            authorImageName = {
              path: _context18.t2,
              name: _context18.t3
            };
            gallery.author.image = authorImageName;

          case 32:
            if (!live) {
              _context18.next = 43;
              break;
            }

            time = JSON.parse(liveTime).liveTime;

            if (!(live.length > 0)) {
              _context18.next = 40;
              break;
            }

            if (JSON.parse(oldFile) && JSON.parse(oldFile).liveVideo && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/videos/".concat(path, "/").concat(JSON.parse(oldFile).liveVideo)))) {
              _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/videos/".concat(path, "/"), JSON.parse(oldFile).liveVideo));
            }

            _context18.next = 38;
            return Promise.all(live.map( /*#__PURE__*/function () {
              var _ref13 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(i, index) {
                var name;
                return _regenerator.default.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return (0, _upload.uploadVideo)(i, path);

                      case 2:
                        name = _context12.sent;

                        if (name) {
                          _context12.next = 5;
                          break;
                        }

                        return _context12.abrupt("return", next(new _errorHandler.default("Can't upload video! please try again.", 500)));

                      case 5:
                        liveVideo.push({
                          path: path,
                          name: name,
                          liveTime: time[index]
                        });

                      case 6:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12);
              }));

              return function (_x26, _x27) {
                return _ref13.apply(this, arguments);
              };
            }()));

          case 38:
            _context18.next = 43;
            break;

          case 40:
            if (JSON.parse(oldFile) && JSON.parse(oldFile).liveVideo && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/").concat(JSON.parse(oldFile).liveVideo)))) {
              _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/"), JSON.parse(oldFile).liveVideo));
            }

            _context18.next = 43;
            return Promise.all(time.map( /*#__PURE__*/function () {
              var _ref14 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13(i) {
                var name;
                return _regenerator.default.wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.next = 2;
                        return (0, _upload.uploadVideo)(live, path);

                      case 2:
                        name = _context13.sent;

                        if (name) {
                          _context13.next = 5;
                          break;
                        }

                        return _context13.abrupt("return", next(new _errorHandler.default("Can't upload video! please try again.", 500)));

                      case 5:
                        liveVideo.push({
                          path: path,
                          name: name,
                          liveTime: i
                        });

                      case 6:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13);
              }));

              return function (_x28) {
                return _ref14.apply(this, arguments);
              };
            }()));

          case 43:
            // req.file
            arrModel = [];

            if (!(contentModels.length > 0)) {
              _context18.next = 48;
              break;
            }

            if (typeof JSON.parse(oldFile).contentModel === 'string') {
              if (JSON.parse(oldFile) && JSON.parse(oldFile).contentModel && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/models/".concat(path, "/").concat(JSON.parse(oldFile).contentModel)))) {
                _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/models/".concat(path, "/"), JSON.parse(oldFile).contentModel));
              }
            } else {
              JSON.parse(oldFile).contentModel.map(function (i) {
                if (JSON.parse(oldFile) && JSON.parse(oldFile).contentModel && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/models/".concat(path, "/").concat(JSON.parse(oldFile).contentModel)))) {
                  _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/models/".concat(path, "/"), i));
                }
              });
            }

            _context18.next = 48;
            return Promise.all(contentModels.map( /*#__PURE__*/function () {
              var _ref15 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(item) {
                var name;
                return _regenerator.default.wrap(function _callee14$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        _context14.next = 2;
                        return (0, _upload.uploadModel)(item, path);

                      case 2:
                        name = _context14.sent;

                        if (name) {
                          _context14.next = 5;
                          break;
                        }

                        return _context14.abrupt("return", next(new _errorHandler.default("Can't upload model! please try again.", 500)));

                      case 5:
                        arrModel.push({
                          path: path,
                          contentType: 'Model',
                          contentValue: name,
                          contentName: item.name
                        });

                      case 6:
                      case "end":
                        return _context14.stop();
                    }
                  }
                }, _callee14);
              }));

              return function (_x29) {
                return _ref15.apply(this, arguments);
              };
            }()));

          case 48:
            arrImg = [];

            if (!(contentImages.length > 0)) {
              _context18.next = 53;
              break;
            }

            if (typeof JSON.parse(oldFile).contentImage === 'string') {
              if (JSON.parse(oldFile) && JSON.parse(oldFile).contentImage && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/models/".concat(path, "/").concat(JSON.parse(oldFile).contentImage)))) {
                _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/"), JSON.parse(oldFile).contentImage));
              }
            } else {
              JSON.parse(oldFile).contentImage.map(function (i) {
                if (JSON.parse(oldFile) && JSON.parse(oldFile).contentImage && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/models/".concat(path, "/").concat(JSON.parse(oldFile).contentImage)))) {
                  _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/images/".concat(path, "/"), i));
                }
              });
            }

            _context18.next = 53;
            return Promise.all(contentImages.map( /*#__PURE__*/function () {
              var _ref16 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15(item) {
                var name;
                return _regenerator.default.wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.next = 2;
                        return (0, _upload.uploadFile)(item, path);

                      case 2:
                        name = _context15.sent;

                        if (name) {
                          _context15.next = 5;
                          break;
                        }

                        return _context15.abrupt("return", next(new _errorHandler.default("Can't upload image! please try again.", 500)));

                      case 5:
                        arrImg.push({
                          path: path,
                          contentType: 'Image',
                          contentValue: name,
                          contentName: item.name
                        });

                      case 6:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, _callee15);
              }));

              return function (_x30) {
                return _ref16.apply(this, arguments);
              };
            }()));

          case 53:
            arrVdo = [];

            if (!(contentVideos.length > 0)) {
              _context18.next = 59;
              break;
            }

            if (typeof JSON.parse(oldFile).contentVideo === 'string') {
              if (JSON.parse(oldFile) && JSON.parse(oldFile).contentVideo && _fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/videos/".concat(path, "/").concat(JSON.parse(oldFile).contentVideo)))) {
                _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/videos/".concat(path, "/"), JSON.parse(oldFile).contentVideo));
              }
            }

            if (JSON.parse(oldFile) && JSON.parse(oldFile).contentVideo && JSON.parse(oldFile).contentVideo.length > 0) {
              JSON.parse(oldFile).contentVideo.map(function (i) {
                if (_fs.default.existsSync(_path.default.join(__dirname, "../../../assets/uploads/videos/".concat(path, "/").concat(i)))) {
                  _fs.default.unlinkSync(_path.default.join(__dirname, "../../../assets/uploads/videos/".concat(path, "/"), i));
                }
              });
            }

            _context18.next = 59;
            return Promise.all(contentVideos.map( /*#__PURE__*/function () {
              var _ref17 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16(item) {
                var name;
                return _regenerator.default.wrap(function _callee16$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        _context16.next = 2;
                        return (0, _upload.uploadVideo)(item, path);

                      case 2:
                        name = _context16.sent;

                        if (name) {
                          _context16.next = 5;
                          break;
                        }

                        return _context16.abrupt("return", next(new _errorHandler.default("Can't upload video! please try again.", 500)));

                      case 5:
                        arrVdo.push({
                          path: path,
                          contentType: 'Video',
                          contentValue: name,
                          contentName: item.name
                        });

                      case 6:
                      case "end":
                        return _context16.stop();
                    }
                  }
                }, _callee16);
              }));

              return function (_x31) {
                return _ref17.apply(this, arguments);
              };
            }()));

          case 59:
            contents = [];

            if (!(description && description.length > 0)) {
              _context18.next = 64;
              break;
            }

            _context18.next = 63;
            return description.map( /*#__PURE__*/function () {
              var _ref18 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17(item) {
                var model, img, vdo, _JSON$parse2, th, en;

                return _regenerator.default.wrap(function _callee17$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        model = arrModel.filter(function (i) {
                          return i.contentName === item;
                        });
                        img = arrImg.filter(function (i) {
                          return i.contentName === item;
                        });
                        vdo = arrVdo.filter(function (i) {
                          return i.contentName === item;
                        });

                        if (img.length > 0) {
                          contents.push({
                            path: img[0].path,
                            contentType: img[0].contentType,
                            contentValue: img[0].contentValue
                          });
                        } else if (model.length) {
                          contents.push({
                            path: model[0].path,
                            contentType: model[0].contentType,
                            contentValue: model[0].contentValue
                          });
                        } else if (vdo.length) {
                          contents.push({
                            path: vdo[0].path,
                            contentType: vdo[0].contentType,
                            contentValue: vdo[0].contentValue
                          });
                        } else {
                          _JSON$parse2 = JSON.parse(item), th = _JSON$parse2.th, en = _JSON$parse2.en;
                          contents.push({
                            contentType: 'Text',
                            contentValue_th: th,
                            contentValue_en: en
                          });
                        }

                      case 4:
                      case "end":
                        return _context17.stop();
                    }
                  }
                }, _callee17);
              }));

              return function (_x32) {
                return _ref18.apply(this, arguments);
              };
            }());

          case 63:
            gallery.content = contents;

          case 64:
            gallery.title_th = title_th;
            gallery.title_en = title_en;
            gallery.author.name_th = JSON.parse(author).name_th;
            gallery.author.name_en = JSON.parse(author).name_en;
            gallery.author.group = JSON.parse(author).group;
            gallery.author.contact.facebook = JSON.parse(author).contact.facebook;
            gallery.author.contact.line = JSON.parse(author).contact.line;
            gallery.author.contact.email = JSON.parse(author).contact.email;
            gallery.author.contact.phone = JSON.parse(author).contact.phone;
            gallery.path = path;
            gallery.shortDescription_th = shortDescription_th;
            gallery.shortDescription_en = shortDescription_en;
            gallery.location = JSON.parse(location);
            gallery.updatedAt = Date.now();
            gallery.live.videos = liveVideo;
            gallery.live.updatedAt = Date.now();
            _context18.next = 82;
            return gallery.save();

          case 82:
            res.status(200).json({
              status: 'success',
              data: gallery
            });

          case 83:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));

  return function (_x23, _x24, _x25) {
    return _ref12.apply(this, arguments);
  };
}());
exports.updateGallery = updateGallery;
var deleteGallery = (0, _catchAsync.default)( /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19(req, res, next) {
    var id, gallery, path, imageDirectory, videoDirectory, modelDirectory;
    return _regenerator.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            id = req.params.id;
            _context19.next = 3;
            return _gallery.default.findById(id);

          case 3:
            gallery = _context19.sent;
            path = gallery.coverImage.path;
            imageDirectory = _path.default.join(__dirname, "../../../assets/uploads/images/".concat(path));
            videoDirectory = _path.default.join(__dirname, "../../../assets/uploads/videos/".concat(path));
            modelDirectory = _path.default.join(__dirname, "../../../assets/uploads/models/".concat(path));
            _context19.next = 10;
            return checkImages(imageDirectory);

          case 10:
            _context19.next = 12;
            return checkImages(videoDirectory);

          case 12:
            _context19.next = 14;
            return checkImages(modelDirectory);

          case 14:
            _context19.next = 16;
            return _gallery.default.deleteOne({
              _id: id
            });

          case 16:
            res.status(204);

          case 17:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));

  return function (_x33, _x34, _x35) {
    return _ref19.apply(this, arguments);
  };
}());
exports.deleteGallery = deleteGallery;

var checkImages = /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20(directory) {
    var files, unlinkPromises;
    return _regenerator.default.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return readdir(directory);

          case 2:
            files = _context20.sent;
            _context20.next = 5;
            return Promise.all(files.map(function (filename) {
              return unlink("".concat(directory, "/").concat(filename));
            }));

          case 5:
            unlinkPromises = _context20.sent;
            _context20.next = 8;
            return rmdir(directory);

          case 8:
            return _context20.abrupt("return", unlinkPromises);

          case 9:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }));

  return function checkImages(_x36) {
    return _ref20.apply(this, arguments);
  };
}();
//# sourceMappingURL=gallery.controller.js.map