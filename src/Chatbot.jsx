import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Chatbot as SuperSimpleDevChatbot } from "supersimpledev";

class ChatbotClass {
  constructor() {
    this.llm = new ChatGoogleGenerativeAI({
      model: "models/gemini-2.0-flash-lite",
      temperature: 0,
      apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    });
    this.preSetResponses = null;
  }

  addResponses(preSetResponses) {
    this.preSetResponses = preSetResponses;
  }

  async getResponseAsync(chatMessages) {
    const latestMessage = chatMessages[chatMessages.length - 1];
    if (
      latestMessage?.sender === "user" &&
      this.preSetResponses &&
      this.preSetResponses[latestMessage.message]
    ) {
      return this.preSetResponses[latestMessage.message];
    }

    const llmMessages = [
      ["system", "You are a helpful AI chatbot. Converse with the user."],
    ];

    chatMessages.map((chatMessage) => {
      const sender = chatMessage.sender == "user" ? "human" : "ai";
      llmMessages.push([sender, chatMessage.message]);
    });

    const result = await this.llm.invoke(llmMessages);

    return result.content;
  }
}

export const has_google_api_key = import.meta.env.VITE_GOOGLE_API_KEY;

export const Chatbot = has_google_api_key
  ? new ChatbotClass()
  : SuperSimpleDevChatbot;
