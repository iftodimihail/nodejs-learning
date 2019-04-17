'use strict';

module.exports = function (sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    page_no: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN
  }, {});
  Book.associate = function (models) {
    // associations can be defined here
    Book.belongsToMany(models.Author, { through: 'authors_books_pivot', as: 'authors' });
  };
  return Book;
};
//# sourceMappingURL=book.js.map