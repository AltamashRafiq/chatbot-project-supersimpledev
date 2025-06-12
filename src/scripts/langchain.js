import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
  model: "models/gemini-2.0-flash-lite",
  temperature: 0,
});

console.log("init model");

const result = await llm.invoke([
  ["system", "You are a helpful AI chatbot. Converse with the human."],
  ["human", "I love programming."],
]);

console.log(result.content);
