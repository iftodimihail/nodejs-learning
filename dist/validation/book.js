'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  store: {
    body: {
      name: _joi2.default.string().required(),
      page_no: _joi2.default.number().integer().required(),
      read: _joi2.default.boolean().required()
    }
  },
  update: {
    body: {
      name: _joi2.default.string().required(),
      page_no: _joi2.default.number().integer().required(),
      read: _joi2.default.boolean().required()
    }
  }
};
//# sourceMappingURL=book.js.map