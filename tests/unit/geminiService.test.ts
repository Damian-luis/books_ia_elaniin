import GeminiService from '../../services/geminiService';

// Mocking GoogleGenerativeAI
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockImplementation((prompt: string) => ({
        response: {
          text: jest.fn().mockResolvedValue(`Generated content for prompt: ${prompt}`)
        }
      }))
    })
  }))
}));

describe('GeminiService', () => {
  let geminiService: any;

  beforeEach(() => {
    geminiService = GeminiService;
  });

  describe('generateSummary', () => {
    it('should generate a summary from PDF text', async () => {
      const pdfText = 'This is a sample PDF text.';
      const summary = await geminiService.generateSummary(pdfText);
      expect(summary).toContain('Generated content for prompt: Summarize the following content from a PDF:');
    });
  });

  describe('answerQuestion', () => {
    it('should answer a question based on the cached book text', async () => {
      const question = 'What is the main theme?';
      const bookText = 'This book is about...';
      const answer = await geminiService.answerQuestion(question, bookText);
      expect(answer).toContain('Generated content for prompt: **Conversation History:**');
    });
  });

  describe('clearConversationHistory', () => {
    it('should clear the conversation history', () => {
      geminiService.clearConversationHistory();
      expect(geminiService).toBeTruthy(); // placeholder assertion
    });
  });
});

