import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import type { ChatMessagesType } from "../types";
import "./ChatMessages.css";

type ChatMessagesProps = {
  chatMessages: ChatMessagesType;
};

function useAutoScroll(dependencies: ChatMessagesType[]) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = ref.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, dependencies);

  return ref;
}

export function ChatMessages({ chatMessages }: ChatMessagesProps) {
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
