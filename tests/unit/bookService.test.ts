import { getAllBooks, getBookById } from '../../src/controllers';




jest.mock('../../src/models/bookModel', () => ({
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
}));

describe('Book Service', () => {
  it('should fetch all books', async () => {
    const mockBooks = [{ id: 1, title: 'Test Book' }];
    const bookModel = require('../../src/models/bookModel');
    bookModel.getAllBooks.mockResolvedValue(mockBooks);

    const books = await getAllBooks();
    expect(books).toEqual(mockBooks);
  });

  it('should fetch a book by ID', async () => {
    const mockBook = { id: 1, title: 'Test Book' };
    const bookModel = require('../../src/models/bookModel');
    bookModel.getBookById.mockResolvedValue(mockBook);

    const book = await getBookById(1);
    expect(book).toEqual(mockBook);
  });
});
