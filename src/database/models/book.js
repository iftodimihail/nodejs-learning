'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    page_no: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN
  }, {
    tableName: 'books'
  });
  Book.associate = function(models) {
    // associations can be defined here
    Book.belongsToMany(models.Author,
      {
        through: 'authors_books_pivot',
        as: { singular: 'author', plural: 'authors' },
        foreignKey: 'bookId',
        otherKey: 'authorId'
      });
  };
  return Book;
};
