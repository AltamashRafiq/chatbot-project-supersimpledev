import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Chatbot as SuperSimpleDevChatbot } from "supersimpledev";
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
} from "@langchain/core/messages";
import type { ChatMessageLiteType } from "./types";

class ChatbotClass {
  llm: ChatGoogleGenerativeAI;
  messages: (SystemMessage | HumanMessage | AIMessage)[];
  preSetResponses: Record<string, string>;

  constructor() {
    this.llm = new ChatGoogleGenerativeAI({
      model: "models/gemini-2.0-flash-lite",
      temperature: 0,
      apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    });

    const cachedMessages = localStorage.getItem("messages");
    const chatMessages = cachedMessages ? JSON.parse(cachedMessages) : [];
    this.messages = [
      new SystemMessage(
        "You are a helpful AI chatbot. Converse with the user."
      ),
    ];
    chatMessages.map((chatMessage: ChatMessageLiteType) => {
      if (chatMessage.sender == "robot") {
        this.messages.push(new AIMessage(chatMessage.message));
        return;
      }
      this.messages.push(new HumanMessage(chatMessage.message));
    });
    this.preSetResponses = {};
  }

  addResponses(preSetResponses: Record<string, string>) {
    this.preSetResponses = preSetResponses;
  }

  async getResponseAsync(message: string) {
    let result;

    this.messages.push(new HumanMessage(message));
    if (this.preSetResponses[message]) {
      result = this.preSetResponses[message];
      this.messages.push(new AIMessage(result));

      return result;
    }

    result = (await this.llm.invoke(this.messages)).content.toString();
    this.messages.push(new AIMessage(result));

    return result;
  }
}

export const has_google_api_key = import.meta.env.VITE_GOOGLE_API_KEY;
export const Chatbot = has_google_api_key
  ? new ChatbotClass()
  : SuperSimpleDevChatbot;
