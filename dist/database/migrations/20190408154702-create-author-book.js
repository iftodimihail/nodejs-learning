'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('authors_books_pivot', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: { model: 'books', key: "id" },
        allowNull: false
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: { model: 'authors', key: "id" },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('AuthorBooks');
  }
};
//# sourceMappingURL=20190408154702-create-author-book.js.map