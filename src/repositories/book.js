export default (db) => {

  const bookModel = db.Book;

  const index = async () => {
    try {
      return await bookModel.findAll({
        order: [
          ['id', 'DESC']
        ]
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const store = async (body) => {
    try {
      return await bookModel.create(body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const show = async (id) => {
    try {
      return await bookModel.findByPk(id);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const update = async (id, body) => {
    try {
      await bookModel.update(body, { where: { id } });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const destroy = async (id) => {
    try {
      const book = await bookModel.findByPk(id);
      if (book) {
        await book.setAuthors([]);
        await book.destroy();
      }
      return book;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const storeAuthorsForBook = async (body) => {
    try {
      const book = await bookModel.findByPk(body.bookId);
      await book.setAuthors(body.authorIds);
      return book;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getAuthorsForBook = async (id) => {
    try {
      const book = await bookModel.findByPk(id);
      return await book.getAuthors();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    index,
    store,
    show,
    update,
    destroy,
    storeAuthorsForBook,
    getAuthorsForBook
  };
}
