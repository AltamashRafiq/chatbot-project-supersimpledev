import { useState } from "react";
import { Chatbot, has_google_api_key } from "../Chatbot";
import dayjs from "dayjs";
import LoadingSpinnerGif from "../assets/loading-spinner.gif";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
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
      },
    ]);

    setIsLoading(true);
    const response = has_google_api_key
      ? await Chatbot.getResponseAsync(newChatMessages)
      : await Chatbot.getResponseAsync(inputText);
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

  function handleKeyDown(event) {
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
        size="30"
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
