'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _response = require('../concerns/response');

var _response2 = _interopRequireDefault(_response);

var _author = require('../repositories/author');

var _author2 = _interopRequireDefault(_author);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _author3 = require('../validation/author');

var _author4 = _interopRequireDefault(_author3);

var _author5 = require('../transformers/author');

var _author6 = _interopRequireDefault(_author5);

var _authorbook = require('../transformers/authorbook');

var _authorbook2 = _interopRequireDefault(_authorbook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (db) {

  var api = new _express.Router();

  /**
   * List all resources
   * @swagger
   * /api/authors:
   *   get:
   *     tags:
   *       - Authors
   *     name: List authors
   *     summary: Lists all the authors
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of author objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var authors;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _author2.default)(db).index();

            case 3:
              authors = _context.sent;
              return _context.abrupt('return', (0, _response2.default)(res).collection(authors, _author6.default));

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
   * /api/authors:
   *   post:
   *     tags:
   *       - Authors
   *     name: Create author
   *     summary: Creates a new author
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
   *     responses:
   *       200:
   *         description: A author object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/', (0, _expressValidation2.default)(_author4.default.store), function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var author;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _author2.default)(db).store(req.body);

            case 3:
              author = _context2.sent;
              return _context2.abrupt('return', (0, _response2.default)(res).created({ id: author.id }));

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
   * /api/authors/{id}:
   *   get:
   *     tags:
   *       - Authors
   *     name: Show author
   *     summary: Shows an existing author
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
   *         description: A author object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var author;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _author2.default)(db).show(req.params.id);

            case 3:
              author = _context3.sent;

              if (!(author !== null)) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt('return', (0, _response2.default)(res).item(author, _author6.default));

            case 6:
              return _context3.abrupt('return', (0, _response2.default)(res).notFound('Author not found.'));

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
   * /api/authors/{id}:
   *   put:
   *     tags:
   *       - Authors
   *     name: Update author
   *     summary: Updates an existing author
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
  api.put('/:id', (0, _expressValidation2.default)(_author4.default.update), function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _author2.default)(db).update(req.params.id, req.body);

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
   * /api/authors/{id}:
   *   delete:
   *     tags:
   *       - Authors
   *     name: Delete author
   *     summary: Deletes an existing author
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
   *         description: A author object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.delete('/:id', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var author;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return (0, _author2.default)(db).destroy(req.params.id);

            case 3:
              author = _context5.sent;
              return _context5.abrupt('return', (0, _response2.default)(res).item(author, _author6.default));

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

  /**
   * Add a book to an existing resource
   * @swagger
   * /api/authors/{id}/book:
   *   post:
   *     tags:
   *       - Authors
   *     name: Add book to author
   *     summary: Adds a book to an existing author
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
   *             bookIds:
   *               type: array
   *         required:
   *           - bookIds
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A author-book object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.post('/:id/books', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var authorBook;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return (0, _author2.default)(db).storeBookForAuthor({ authorId: req.params.id, bookId: req.body.bookIds });

            case 3:
              authorBook = _context6.sent;
              return _context6.abrupt('return', (0, _response2.default)(res).created({ id: authorBook.id }));

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6['catch'](0);
              return _context6.abrupt('return', (0, _response2.default)(res).error(_context6.t0));

            case 10:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 7]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  /**
   * Get books for an existing resource
   * @swagger
   * /api/authors/{id}/books:
   *   get:
   *     tags:
   *       - Authors
   *     name: Get books from author
   *     summary: Gets books from an existing author
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
   *         description: A author-book object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.get('/:id/books', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
      var authorBooks;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return (0, _author2.default)(db).getBooksForAuthor(req.params.id);

            case 3:
              authorBooks = _context7.sent;
              return _context7.abrupt('return', (0, _response2.default)(res).collection(authorBooks, _authorbook2.default));

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7['catch'](0);
              return _context7.abrupt('return', (0, _response2.default)(res).error(_context7.t0));

            case 10:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[0, 7]]);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());

  return api;
};
//# sourceMappingURL=authors.js.map