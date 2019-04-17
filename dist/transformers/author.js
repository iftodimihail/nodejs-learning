'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return {
    id: data.id,
    name: data.name,
    created_at: data.createdAt ? data.createdAt : '-',
    updated_at: data.updatedAt ? data.updatedAt : '-'
  };
};
//# sourceMappingURL=author.js.map