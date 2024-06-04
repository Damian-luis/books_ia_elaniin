import { Request,Response } from "express"
import GeminiService from "../services/geminiService"
import Book from "../models/Book";
import * as cache from 'memory-cache'
import pdfParse from 'pdf-parse'
import { HTTP_CODES, RESPONSE_MESSAGES } from '../constant/index';

async function uploadBook(req: Request, res: Response): Promise<void> {
  try {
      const { title, type } = req.body;
      if (req.file && req.file.fieldname !== "file") {
        req.file.fieldname = "file";
      }
      if (!req.file || !req.file.buffer) {
          res.status(HTTP_CODES.BAD_REQUEST).json({ error: RESPONSE_MESSAGES.INVALID_REQUEST });
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

      res.status(HTTP_CODES.CREATED).json({ book });
  } catch (error: any) {
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}


  async function deleteBook(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params; 
        const deletedBook = await Book.findByPk(id); 

        if (!deletedBook) {
            res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.BOOK_NOT_FOUND });
            return;
        }

        await deletedBook.destroy();

        res.status(HTTP_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.BOOK_DELETED_SUCCESSFULLY });
    } catch (error: any) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

async function queryBook(req: Request, res: Response): Promise<void> {
    try {
        const { idBook } = req.params;
        const { question } = req.body;
        const cachedBookText =await cache.get(idBook.toString())

        if (cachedBookText) {
          const answer = await GeminiService.answerQuestion(question, cachedBookText);
          res.status(HTTP_CODES.SUCCESS).json({ answer });
        } else {
          const bookData = await Book.findByPk(idBook)
          if (!bookData) {
            res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.BOOK_NOT_FOUND });
            return;
          }

          const bookContent = bookData.content;
      await cache.put(idBook.toString(), bookContent);


      await GeminiService.clearConversationHistory()

      const answer = await GeminiService.answerQuestion(question, bookContent);
      console.log(answer)
      res.status(HTTP_CODES.SUCCESS).json({ answer });


    } 
  }
    catch (error:any) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}


async function getAllBooks(req: Request, res: Response): Promise<void> {
    try {

      const books = await Book.findAll();
      res.status(HTTP_CODES.SUCCESS).json({ books });
    } catch (error: any) {
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }

  async function getBookById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
  
      const book = await Book.findByPk(id);
  
      if (!book) {
        res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.BOOK_NOT_FOUND });
        return;
      }
  
      const bookData = {
        id: book.id,
        title: book.title,
        type: book.type,
        summary: book.summary,
        content: book.content,
      };
  
      res.status(HTTP_CODES.SUCCESS).json({ book: bookData });
    } catch (error: any) {
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }


export {uploadBook, queryBook,getAllBooks,deleteBook,getBookById}