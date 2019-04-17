'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return {
    id: data.id,
    name: data.name,
    page_no: data.page_no,
    read: data.read,
    created_at: data.createdAt ? data.createdAt : '-',
    updated_at: data.updatedAt ? data.updatedAt : '-'
  };
};
//# sourceMappingURL=book.js.map