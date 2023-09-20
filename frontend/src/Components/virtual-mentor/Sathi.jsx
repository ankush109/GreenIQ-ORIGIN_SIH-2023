import React, { useState, useRef, useEffect } from "react";
import { AskSathiChatBot } from "../../api/virtual-mentor";
import Leftbar from "../Leftbar";
import SendIcon from "@mui/icons-material/Send";
function Sathi() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: inputMessage },
    ];

    setMessages(updatedMessages);
    setInputMessage("");

    const response = await AskSathiChatBot(inputMessage);
    const updatedMessagesWithChatbot = [
      ...updatedMessages,
      { role: "chatbot", content: response.data.content },
    ];
    setMessages(updatedMessagesWithChatbot);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex">
      <div className="w-1/4 h-screen">
        <Leftbar />
      </div>
      <div className="p-4 w-3/4">
        <header className="bg-green-500 text-white py-4 text-center">
          <h1 className="text-2xl font-semibold">Sathi Chatbot</h1>
        </header>
        <div className="flex-grow flex flex-col items-center justify-center my-10">
          <div
            className="border p-4 rounded-lg shadow-lg max-w-[900px] w-full"
            ref={messagesEndRef}
          >
            <div
              className="border p-2 min-h-10 overflow-y-auto"
              style={{ maxHeight: "400px" }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.role === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`bg-${
                      message.role === "user" ? "blue" : "green"
                    }-200 p-2 rounded-lg inline-block`}
                  >
                    {message.role === "chatbot" ? (
                      <div className="flex items-center">
                        <img
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                          src="https://www.iconarchive.com/download/i143625/iconarchive/robot-avatar/Blue-1-Robot-Avatar.1024.png"
                          alt="Chatbot Avatar"
                        />
                        <span className="ml-2">{message.content}</span>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              <div></div>
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                className="flex-grow border rounded p-2 mr-2"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyUp={handleKeyPress}
              />
              <SendIcon
                size={20}
                style={{
                  marginTop: "10px",
                  color: "green",
                }}
                color="green"
                onClick={sendMessage}
              >
                Send
              </SendIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sathi;
