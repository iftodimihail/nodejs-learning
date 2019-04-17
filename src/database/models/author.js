'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: DataTypes.STRING
  }, {
    tableName: 'authors'
  });
  Author.associate = function(models) {
    // associations can be defined here
    Author.belongsToMany(models.Book,
      {
        through: 'authors_books_pivot',
        as: { singular: 'Book', plural: 'books' },
        foreignKey: 'authorId',
        otherKey: 'bookId'
      });
  };
  return Author;
};
