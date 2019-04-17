'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _response = require('../concerns/response');

var _response2 = _interopRequireDefault(_response);

var _book = require('../repositories/book');

var _book2 = _interopRequireDefault(_book);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _book3 = require('../validation/book');

var _book4 = _interopRequireDefault(_book3);

var _book5 = require('../transformers/book');

var _book6 = _interopRequireDefault(_book5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (db) {

  var api = new _express.Router();

  /**
   * List all resources
   * @swagger
   * /api/books:
   *   get:
   *     tags:
   *       - Books
   *     name: List books
   *     summary: Lists all the books
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of book objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var books;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _book2.default)(db).index();

            case 3:
              books = _context.sent;
              return _context.abrupt('return', (0, _response2.default)(res).collection(books, _book6.default));

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', (0, _response2.default)(res).error(_context.t0));

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  /**
   * Create a new resource
   * @swagger
   * /api/books:
   *   post:
   *     tags:
   *       - Books
   *     name: Create book
   *     summary: Creates a new book
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             page_no:
   *               type: integer
   *             read:
   *               type: boolean
   *         required:
   *           - name
   *           - page_no
   *           - read
   *     responses:
   *       200:
   *         description: A book object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/', (0, _expressValidation2.default)(_book4.default.store), function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var book;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _book2.default)(db).store(req.body);

            case 3:
              book = _context2.sent;
              return _context2.abrupt('return', (0, _response2.default)(res).created({ id: book.id }));

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](0);
              return _context2.abrupt('return', (0, _response2.default)(res).error(_context2.t0));

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 7]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  /**
   * Show an existing resource
   * @swagger
   * /api/books/{id}:
   *   get:
   *     tags:
   *       - Books
   *     name: Show book
   *     summary: Shows an existing book
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A book object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var book;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _book2.default)(db).show(req.params.id);

            case 3:
              book = _context3.sent;

              if (!(book !== null)) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt('return', (0, _response2.default)(res).item(book, _book6.default));

            case 6:
              return _context3.abrupt('return', (0, _response2.default)(res).notFound('Book not found.'));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', (0, _response2.default)(res).error(_context3.t0));

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 9]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  /**
   * Update an existing resource
   * @swagger
   * /api/books/{id}:
   *   put:
   *     tags:
   *       - Books
   *     name: Update book
   *     summary: Updates an existing book
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *         required:
   *           - name
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       204:
   *         description: No content
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.put('/:id', (0, _expressValidation2.default)(_book4.default.update), function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _book2.default)(db).update(req.params.id, req.body);

            case 3:
              return _context4.abrupt('return', (0, _response2.default)(res).noContent());

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4['catch'](0);
              return _context4.abrupt('return', (0, _response2.default)(res).error(_context4.t0));

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 6]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  /**
   * Destroy an existing resource
   * @swagger
   * /api/books/{id}:
   *   delete:
   *     tags:
   *       - Books
   *     name: Delete book
   *     summary: Deletes an existing book
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A book object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.delete('/:id', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var book;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return (0, _book2.default)(db).destroy(req.params.id);

            case 3:
              book = _context5.sent;
              return _context5.abrupt('return', (0, _response2.default)(res).item(book, _book6.default));

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5['catch'](0);
              return _context5.abrupt('return', (0, _response2.default)(res).error(_context5.t0));

            case 10:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 7]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  return api;
};
//# sourceMappingURL=books.js.map