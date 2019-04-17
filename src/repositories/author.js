export default (db) => {

  const authorModel = db.Author;

  const index = async () => {
    try {
      return await authorModel.findAll({
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
      return await authorModel.create(body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const show = async (id) => {
    try {
      return await authorModel.findByPk(id);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const update = async (id, body) => {
    try {
      await authorModel.update(body, { where: { id } });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const destroy = async (id) => {
    try {
      const author = await authorModel.findByPk(id);
      if (author) {
        await author.setBooks([]);
        await author.destroy();
      }
      return author;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const storeBookForAuthor = async (body) => {
    try {
      const author = await authorModel.findByPk(body.authorId);
      await author.setBooks(body.bookIds);
      return author;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getBooksForAuthor = async (id) => {
    try {
      const author = await authorModel.findByPk(id);
      return await author.getBooks();
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
    storeBookForAuthor,
    getBooksForAuthor
  };
}
