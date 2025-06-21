import { useState } from "react";
import { Chatbot } from "../Chatbot";
import type { ChatMessagesType } from "../types";
import dayjs from "dayjs";
import LoadingSpinnerGif from "../assets/loading-spinner.gif";
import "./ChatInput.css";

type ChatInputProps = {
  chatMessages: ChatMessagesType;
  setChatMessages: (chatMessages: ChatMessagesType) => void;
};

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: { target: { value: string } }) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs(dayjs().valueOf()).format("h:mma"),
      },
    ];

    setInputText("");
    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingSpinnerGif} className="loading-spinner" />,
        sender: "robot",
        id: crypto.randomUUID(),
        time: "",
      },
    ]);

    setIsLoading(true);
    const response = await Chatbot.getResponseAsync(inputText);
    setIsLoading(false);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs(dayjs().valueOf()).format("h:mma"),
      },
    ]);
  }

  function handleKeyDown(event: { key: string }) {
    if (isLoading || inputText === "") {
      return;
    }

    if (event.key == "Enter") {
      sendMessage();
    }
    if (event.key == "Escape") {
      setInputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size={30}
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button onClick={clearMessages} className="send-button clear-button">
        Clear
      </button>
    </div>
  );
}
