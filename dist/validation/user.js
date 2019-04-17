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
      email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
      password: _joi2.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  },
  update: {
    body: {
      email: _joi2.default.string().email({ minDomainAtoms: 2 }).required()
    }
  }
};
//# sourceMappingURL=user.js.map