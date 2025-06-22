import { useState } from "react";
import { Chatbot } from "../Chatbot";
import type { ChatMessagesType } from "../types";
import dayjs from "dayjs";
import LoadingSpinnerGif from "../assets/loading-spinner.gif";
import "./ChatInput.css";
import TextareaAutosize from "react-textarea-autosize";

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

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    /* This was very not easy to implement and may still have bugs :( */
    if (event.key === "Enter") {
      if (event.shiftKey) {
        // shift enter to add new line :) Thanks GPT
        return;
      }

      if (inputText !== "" && !isLoading) {
        // some text is available and not loading
        event.preventDefault(); // prevent newline
        sendMessage();
      } else {
        // if no text or in loading state, cannot make new line either
        event.preventDefault();
      }
    }

    if (event.key === "Escape") {
      setInputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }

  return (
    <div className="chat-input-container">
      <TextareaAutosize
        placeholder="Send a message to Chatbot"
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
