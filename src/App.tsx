import { useEffect, useState } from "react";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
import { Chatbot } from "./Chatbot";
import "./App.css";

function App() {
  const cached = localStorage.getItem("messages");
  const [chatMessages, setChatMessages] = useState(
    cached ? JSON.parse(cached) : []
  );

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    Chatbot.addResponses({
      "Who is Ammara?": "Ammara is the cutest person in the world!",
      "Who is Altamash?": "Altamash is the handsome king of Lahore",
    });
  }, []);

  const title = `${chatMessages.length} Messages`;

  return (
    <>
      <title>{title}</title>
      <link rel="icon" type="image/png" href="/src/assets/robot.png" />

      <div className="app-container">
        {chatMessages.length === 0 ? (
          <>
            <p className="welcome-message">
              <strong>
                Welcome to the chatbot project! Send a message using the textbox
                below.
              </strong>{" "}
              Export <strong>VITE_GOOGLE_API_KEY</strong>=
              {"<your google api key>"} to chat with Gemini or leave it unset to
              talk to a stupid bot.
            </p>
          </>
        ) : (
          <ChatMessages chatMessages={chatMessages} />
        )}
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </>
  );
}

export default App;
