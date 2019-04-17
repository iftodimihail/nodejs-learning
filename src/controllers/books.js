import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/book';
import validate from 'express-validation';
import validationRules from '../validation/book';
import transformer from '../transformers/book';
import authorBookTransformer from "../transformers/authorbook";

export default (db) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/books:
   *   get:
   *     tags:
   *       - Books
   *     name: List books
   *     summary: Lists all the books
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of book objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const books = await repository(db).index();
      return response(res).collection(books, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Create a new resource
   * @swagger
   * /api/books:
   *   post:
   *     tags:
   *       - Books
   *     name: Create book
   *     summary: Creates a new book
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
   *             page_no:
   *               type: integer
   *             read:
   *               type: boolean
   *         required:
   *           - name
   *           - page_no
   *           - read
   *     responses:
   *       200:
   *         description: A book object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/', validate(validationRules.store), async (req, res) => {
    try {
      const book = await repository(db).store(req.body);
      return response(res).created({ id: book.id });
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/books/{id}:
   *   get:
   *     tags:
   *       - Books
   *     name: Show book
   *     summary: Shows an existing book
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
   *         description: A book object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const book = await repository(db).show(req.params.id);
      if (book !== null) {
        return response(res).item(book, transformer);
      }
      return response(res).notFound('Book not found.');
    } catch (err) {
      return response(res).error(err);
    }

  });

  /**
   * Update an existing resource
   * @swagger
   * /api/books/{id}:
   *   put:
   *     tags:
   *       - Books
   *     name: Update book
   *     summary: Updates an existing book
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
   * /api/books/{id}:
   *   delete:
   *     tags:
   *       - Books
   *     name: Delete book
   *     summary: Deletes an existing book
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
   *         description: A book object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.delete('/:id', async (req, res) => {
    try {
      const book = await repository(db).destroy(req.params.id);
      return response(res).item(book, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Add authors to an existing resource
   * @swagger
   * /api/books/{id}/authors:
   *   post:
   *     tags:
   *       - Books
   *     name: Add authors to a book
   *     summary: Adds authors to an existing book
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
   *             authorIds:
   *               type: array
   *               items:
   *                  type: integer
   *         required:
   *           - authorIds
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
  api.post('/:id/authors', async (req, res) => {
    try {
      const authorBook = await repository(db).storeAuthorsForBook({ bookId: req.params.id, authorIds: req.body.authorIds});
      return response(res).created({ id: authorBook.id });
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Get authors for an existing resource
   * @swagger
   * /api/books/{id}/authors:
   *   get:
   *     tags:
   *       - Books
   *     name: Get authors from a book
   *     summary: Gets authors from an existing book
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
  api.get('/:id/authors', async (req, res) => {
    try {
      const authorBooks = await repository(db).getAuthorsForBook(req.params.id);
      return response(res).collection(authorBooks, authorBookTransformer);
    } catch (err) {
      return response(res).error(err);
    }
  });


  return api;
}
