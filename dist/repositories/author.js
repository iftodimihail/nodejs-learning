'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (db) {

  var authorModel = db.Author;

  var index = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return authorModel.findAll({
                order: [['id', 'DESC']]
              });

            case 3:
              return _context.abrupt('return', _context.sent);

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](0);

              console.error(_context.t0);
              throw _context.t0;

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 6]]);
    }));

    return function index() {
      return _ref.apply(this, arguments);
    };
  }();

  var store = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(body) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return authorModel.create(body);

            case 3:
              return _context2.abrupt('return', _context2.sent);

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2['catch'](0);

              console.error(_context2.t0);
              throw _context2.t0;

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 6]]);
    }));

    return function store(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var show = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return authorModel.findByPk(id);

            case 3:
              return _context3.abrupt('return', _context3.sent);

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3['catch'](0);

              console.error(_context3.t0);
              throw _context3.t0;

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 6]]);
    }));

    return function show(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  var update = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, body) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return authorModel.update(body, { where: { id: id } });

            case 3:
              _context4.next = 9;
              break;

            case 5:
              _context4.prev = 5;
              _context4.t0 = _context4['catch'](0);

              console.error(_context4.t0);
              throw _context4.t0;

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 5]]);
    }));

    return function update(_x3, _x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var destroy = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      var author;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return authorModel.findByPk(id);

            case 3:
              author = _context5.sent;

              if (!author) {
                _context5.next = 7;
                break;
              }

              _context5.next = 7;
              return author.destroy();

            case 7:
              return _context5.abrupt('return', author);

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5['catch'](0);

              console.error(_context5.t0);
              throw _context5.t0;

            case 14:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 10]]);
    }));

    return function destroy(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();

  var storeBookForAuthor = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(body) {
      var author;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return authorModel.create(body);

            case 3:
              author = _context6.sent;
              _context6.next = 6;
              return author.setBooks(body.bookIds);

            case 6:
              return _context6.abrupt('return', author);

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6['catch'](0);

              console.error(_context6.t0);
              throw _context6.t0;

            case 13:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 9]]);
    }));

    return function storeBookForAuthor(_x6) {
      return _ref6.apply(this, arguments);
    };
  }();

  var getBooksForAuthor = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(id) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return authorBookModel.findAll({
                where: {
                  authorId: id
                }
              });

            case 3:
              return _context7.abrupt('return', _context7.sent);

            case 6:
              _context7.prev = 6;
              _context7.t0 = _context7['catch'](0);

              console.error(_context7.t0);
              throw _context7.t0;

            case 10:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[0, 6]]);
    }));

    return function getBooksForAuthor(_x7) {
      return _ref7.apply(this, arguments);
    };
  }();

  return {
    index: index,
    store: store,
    show: show,
    update: update,
    destroy: destroy,
    storeBookForAuthor: storeBookForAuthor,
    getBooksForAuthor: getBooksForAuthor
  };
};
//# sourceMappingURL=author.js.map