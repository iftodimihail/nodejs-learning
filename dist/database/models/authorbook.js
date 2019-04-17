'use strict';

module.exports = function (sequelize, DataTypes) {
  var AuthorBook = sequelize.define('author-books', {
    bookId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {});
  AuthorBook.associate = function (models) {
    // associations can be defined here
    models.book.belongsToMany(models.author, { through: AuthorBook });
    models.author.belongsToMany(models.book, { through: AuthorBook });
  };
  return AuthorBook;
};
//# sourceMappingURL=authorbook.js.map