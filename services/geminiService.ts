
import { GoogleGenerativeAI,GenerateContentRequest } from "@google/generative-ai";
import pdfParse from 'pdf-parse'
const genAI = new GoogleGenerativeAI("AIzaSyDJT3WV0LTV0ThanYYe8ABHzNfc99VljVQ");

// ...

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});





class GeminiService {
  public async generateSummary(pdfBuffer: Buffer): Promise<string> {
    try {
      const pdfData = await pdfParse(pdfBuffer);
      const pdfText = pdfData.text;
      
      const prompt = `Summarize the following content from a PDF:\n\n${pdfText}`;

      const result = await model.generateContent(prompt );
      const response = await result.response;
      const text = await response.text();

      return text;
    } catch (error) {
      console.error("Error generating summary:", error);
      throw new Error("Failed to generate summary");
    }
  }

  public async askQuestion(question: string): Promise<string> {
    return "Respuesta generada";
  }
}

export default new GeminiService();
