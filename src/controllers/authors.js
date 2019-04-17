import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/author';
import validate from 'express-validation';
import validationRules from '../validation/author';
import transformer from '../transformers/author';
import authorBookTransformer from '../transformers/authorbook';

export default (db) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/authors:
   *   get:
   *     tags:
   *       - Authors
   *     name: List authors
   *     summary: Lists all the authors
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of author objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const authors = await repository(db).index();
      return response(res).collection(authors, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Create a new resource
   * @swagger
   * /api/authors:
   *   post:
   *     tags:
   *       - Authors
   *     name: Create author
   *     summary: Creates a new author
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *         required:
   *           - name
   *     responses:
   *       200:
   *         description: A author object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/', validate(validationRules.store), async (req, res) => {
    try {
      const author = await repository(db).store(req.body);
      return response(res).created({ id: author.id });
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/authors/{id}:
   *   get:
   *     tags:
   *       - Authors
   *     name: Show author
   *     summary: Shows an existing author
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A author object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const author = await repository(db).show(req.params.id);
      if (author !== null) {
        return response(res).item(author, transformer);
      }
      return response(res).notFound('Author not found.');
    } catch (err) {
      return response(res).error(err);
    }

  });

  /**
   * Update an existing resource
   * @swagger
   * /api/authors/{id}:
   *   put:
   *     tags:
   *       - Authors
   *     name: Update author
   *     summary: Updates an existing author
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *         required:
   *           - name
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       204:
   *         description: No content
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.put('/:id', validate(validationRules.update), async (req, res) => {
    try {
      await repository(db).update(req.params.id, req.body);
      return response(res).noContent();
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Destroy an existing resource
   * @swagger
   * /api/authors/{id}:
   *   delete:
   *     tags:
   *       - Authors
   *     name: Delete author
   *     summary: Deletes an existing author
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A author object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.delete('/:id', async (req, res) => {
    try {
      const author = await repository(db).destroy(req.params.id);
      return response(res).item(author, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Add a book to an existing resource
   * @swagger
   * /api/authors/{id}/books:
   *   post:
   *     tags:
   *       - Authors
   *     name: Add book to author
   *     summary: Adds a book to an existing author
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             bookIds:
   *               type: array
   *               items:
   *                  type: integer
   *         required:
   *           - bookIds
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A author-book object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.post('/:id/books', async (req, res) => {
    try {
      const authorBook = await repository(db).storeBookForAuthor({ authorId: req.params.id, bookIds: req.body.bookIds});
      return response(res).created({ id: authorBook.id });
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Get books for an existing resource
   * @swagger
   * /api/authors/{id}/books:
   *   get:
   *     tags:
   *       - Authors
   *     name: Get books from author
   *     summary: Gets books from an existing author
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A author-book object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.get('/:id/books', async (req, res) => {
    try {
      const authorBooks = await repository(db).getBooksForAuthor(req.params.id);
      return response(res).collection(authorBooks, authorBookTransformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  return api;
}
