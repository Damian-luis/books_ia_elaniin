import { Request,Response } from "express"
import GeminiService from "../services/geminiService"
import Book from "../models/Book";
async function uploadBook(req: Request, res: Response): Promise<void> {
    try {
      const { title, type } = req.body;
  
      if ( !req.file || !req.file.buffer) {
        res.status(400).json({ error: "Envie los datos necesarios" });
        return;
      }
  
      const pdfBuffer = req.file.buffer;
      const summary = await GeminiService.generateSummary(pdfBuffer);
  
      const book = await Book.create({
        title,
        type,
        summary
      });
  
      res.status(200).json({ book });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async function deleteBook(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params; 
        const deletedBook = await Book.findByPk(id); 

        if (!deletedBook) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }

        await deletedBook.destroy();

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

async function queryBook(req: Request, res: Response): Promise<void> {
    try {
        const { question } = req.body;
        const answer = await GeminiService.answerQuestion(question);
        res.status(200).json({ answer });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}


async function getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await Book.findAll();
      res.status(200).json({ books });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }


export {uploadBook, queryBook,getAllBooks,deleteBook}