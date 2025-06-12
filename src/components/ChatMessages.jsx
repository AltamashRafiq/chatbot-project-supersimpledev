import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

function useAutoScroll(dependencies) {
  const ref = useRef(null);

  useEffect(() => {
    const containerElem = ref.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, dependencies);

  return ref;
}

export function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
            time={chatMessage.time}
          />
        );
      })}
    </div>
  );
}
