
import request from 'supertest';
import Server from "../../server/index"
import { uploadBook, queryBook, getAllBooks, deleteBook, getBookById } from "../../controllers/index"

const server = new Server();
beforeAll(() => {
    server.startServer();
});


// Después de todas las pruebas, cierra el servidor


// Prueba para el controlador uploadBook
/*describe('POST /api/upload', () => {
    it('should upload a book', async () => {
        const response = await request(server.app)
            .post('/api/upload')
            .attach('file', 'test/sample.pdf') 
            .field('title', 'Sample Book')
            .field('type', 'fiction');

        expect(response.status).toBe(201); // Verificar que se haya creado correctamente el libro
        // Agrega más afirmaciones según sea necesario para verificar la respuesta
    });
});
*/
// Prueba para el controlador queryBook
describe('POST /api/query/:idBook', () => {
    it('should query a book',async () => {
        jest.setTimeout(1000000)
        const response = await request(server.app)
            .post('/api/query/8')
            .send({ question: 'What is the main theme?' });
        expect(response.status).toBe(200); 
    });
});

// Prueba para el controlador getAllBooks
describe('POST /api/get', () => {
    it('should get all books', async () => {
        jest.setTimeout(10000)
        const response = await request(server.app)
            .post('/api/get');
        expect(response.status).toBe(200);
    });
});

// Prueba para el controlador deleteBook
describe('DELETE /api/delete/:id', () => {
    it('should delete a book', async () => {
        const response = await request(server.app)
            .delete('/api/delete/10'); 

        expect(response.status).toBe(200);
    });
});

// Prueba para el controlador getBookById
describe('GET /api/getBook/:id', () => {
    it('should get a book by ID', async () => {
        const response = await request(server.app)
            .get('/api/getBook/1');
        expect(response.status).toBe(200); 

    });
});
