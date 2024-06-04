
import { GoogleGenerativeAI,GenerateContentRequest } from "@google/generative-ai";
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
  public async generateSummary(pdfText: any): Promise<string> {
    try {
      const prompt = `Sumariza el siguiente contenido del PDF en español y responde preguntas relacionadas con este libro:\n\n${pdfText}\n\n[ES]`;
      console.log("intentara conseguir prompt")
      const result = await model.generateContent(prompt)
      console.log(result)
      const response = await result.response;
      const text = await response.text();
    console.log("llega al generador")
    console.log(text)
      return text;
    } catch (error) {
      console.error("Error generating summary:", error);
      throw new Error("Failed to generate summary");
    }
  }

  
  public async answerQuestion(question: string,cachedBookText:any): Promise<string> {
    try {
      const conversationSummary = summarizeConversationHistory(messageHistory);

      const prompt = `**Conversation History:**\n${conversationSummary} \n\n**Book Content:**\n${cachedBookText} \n\n
      **New Question:** ${question}\nIf que new question is not related to the Content (the book) i want you to reply 
      "Estoy programado para responder preguntas sobre este libro. ¿Hay algo específico que te gustaría discutir?",
       also always reply in spanish, even when the question is in english.\n\n[ES]`;
  
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

  public clearConversationHistory(): void {
    messageHistory = []; 
  }


}

export default new GeminiService();
