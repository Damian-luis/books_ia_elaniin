
import { GoogleGenerativeAI,GenerateContentRequest } from "@google/generative-ai";
import pdfParse from 'pdf-parse'
const genAI = new GoogleGenerativeAI("AIzaSyDJT3WV0LTV0ThanYYe8ABHzNfc99VljVQ");



const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


let messageHistory: { question: string; answer: string }[] = [];

function summarizeConversationHistory(history: { question: string; answer: string }[]): string {

  if (history.length === 0) {
    return "There is no previous conversation.";
  }
  let summary = "";
  for (const entry of history) {
    summary += `* User: ${entry.question}\n  * Gemini: ${entry.answer}\n`;
  }
  return summary;
}




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

  
  public async answerQuestion(question: string): Promise<string> {
    try {
      const conversationSummary = summarizeConversationHistory(messageHistory);

      const prompt = `**Conversation History:**\n${conversationSummary} \n\n**New Question:** ${question}`;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
  
      messageHistory.push({ question, answer: text }); 
  
      return text;
    } catch (error) {
      console.error("Error generating answer:", error);
      throw new Error("Failed to answer question");
    }
  }




}

export default new GeminiService();
