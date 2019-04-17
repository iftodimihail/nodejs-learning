'use strict';

module.exports = function (sequelize, DataTypes) {
  var Author = sequelize.define('Author', {
    name: DataTypes.STRING
  }, {});
  Author.associate = function (models) {
    // associations can be defined here
    Author.belongsToMany(models.Book, { through: 'authors_books_pivot', as: { singular: 'book', plural: 'books' } });
  };
  return Author;
};
//# sourceMappingURL=author.js.map