import { Request,Response } from "express"
import GeminiService from "../services/geminiService"

async function uploadBook(req: Request, res: Response): Promise<void> {
    try {
        if (!req.file || !req.file.buffer) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }
        const pdfBuffer = req.file.buffer;
        const summary = await GeminiService.generateSummary(pdfBuffer);
        res.status(200).json({ summary });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}



async function queryBook(req: Request, res: Response): Promise<void> {
    try {
        const { question } = req.body;
        const answer = await GeminiService.askQuestion(question);
        res.status(200).json({ answer });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}


export {uploadBook, queryBook}