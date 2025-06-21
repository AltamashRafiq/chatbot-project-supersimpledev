import { isValidElement } from "react";
import Markdown from "react-markdown";
import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/ammara.jpg";
import "./ChatMessage.css";

type ChatMessageProps = {
  message: string | React.ReactElement;
  sender: string;
  time: string;
};

export function ChatMessage({ message, sender, time }: ChatMessageProps) {
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {isValidElement(message) ? (
          message
        ) : (
          <div className="chat-message-markdown">
            <Markdown>{message}</Markdown>
          </div>
        )}
        <p className="chat-message-timestamp">{time ? time : ""}</p>
      </div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}
