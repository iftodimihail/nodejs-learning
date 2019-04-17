'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return {
    id: data.id,
    authorId: data.authorId,
    bookId: data.bookId,
    created_at: data.createdAt ? data.createdAt : '-',
    updated_at: data.updatedAt ? data.updatedAt : '-'
  };
};
//# sourceMappingURL=authorbook.js.map