import { Request,Response } from "express"
import GeminiService from "../services/geminiService"
import Book from "../models/Book";
import * as cache from 'memory-cache'
import pdfParse from 'pdf-parse'

async function uploadBook(req: Request, res: Response): Promise<void> {
  try {
    console.log(req.body)
      const { title, type } = req.body;
      if (req.file && req.file.fieldname !== "file") {
        req.file.fieldname = "file";
      }
      if (!req.file || !req.file.buffer) {
          res.status(400).json({ error: "Envie los datos necesarios" });
          return;
      }

      const pdfBuffer = req.file.buffer;
      const pdfData = await pdfParse(pdfBuffer);
      const pdfText = pdfData.text;
      const summary = await GeminiService.generateSummary(pdfText);

      const book = await Book.create({
          title,
          type,
          summary,
          content: pdfText
      });

      if (process.env.ENABLE_CACHING === 'true') {
          const bookId = book.id;
          cache.put(bookId.toString(), pdfText);
          cache.put('activeBookId', bookId.toString());
          console.log("se guardo en cache")
      }

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
        const { idBook } = req.params;
        const { question } = req.body;
        const cachedBookText =await cache.get(idBook.toString())

        if (cachedBookText) {
          const answer = await GeminiService.answerQuestion(question, cachedBookText);
          res.status(200).json({ answer });
        } else {
          const bookData = await Book.findByPk(idBook)
          if (!bookData) {
            res.status(404).json({ error: "Book not found" });
            return;
          }

          const bookContent = bookData.content;
      await cache.put(idBook.toString(), bookContent);


      await GeminiService.clearConversationHistory()

      const answer = await GeminiService.answerQuestion(question, bookContent);
      console.log(answer)
      res.status(200).json({ answer });


    } 
  }
    catch (error:any) {
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

  async function getBookById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
  
      const book = await Book.findByPk(id);
  
      if (!book) {
        res.status(404).json({ error: "Book not found" });
        return;
      }
  
      const bookData = {
        id: book.id,
        title: book.title,
        type: book.type,
        summary: book.summary,
        content: book.content,
      };
  
      res.status(200).json({ book: bookData });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }


export {uploadBook, queryBook,getAllBooks,deleteBook,getBookById}