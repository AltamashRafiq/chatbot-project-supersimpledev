import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

type ChatMessage = {
  message: string | React.ReactElement;
  sender: string;
  id: string;
  time: string;
};

type ChatMessages = ChatMessage[];

type ChatMessagesProps = {
  chatMessages: ChatMessages;
};

function useAutoScroll(dependencies: ChatMessages[]) {
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
