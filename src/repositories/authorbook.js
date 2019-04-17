export default (db) => {
  const authorBookModel = db.authorbook;

  const index = async () => {
    try {
      return await authorBookModel.findAll({
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
      return await authorBookModel.create(body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const show = async (id) => {
    try {
      return await authorBookModel.findByPk(id);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const update = async (id, body) => {
    try {
      await authorBookModel.update(body, { where: { id } });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const destroy = async (id) => {
    try {
      const authorBook = await authorBookModel.findByPk(id);
      if (authorBook) {
        await authorBook.destroy();
      }
      return authorBook;
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
    destroy
  };
}
