import React, { useState } from "react";
import { AskSathiChatBot } from "../../api/virtual-mentor";

function Sathi() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add user message to the messages array
    const updatedMessages = [
      ...messages,
      { role: "user", content: inputMessage },
    ];

    // Update messages state with user message
    setMessages(updatedMessages);

    // Call the chatbot API to get a response
    const response = await AskSathiChatBot(inputMessage);

    // Add chatbot's response to the messages array
    const updatedMessagesWithChatbot = [
      ...updatedMessages,
      { role: "chatbot", content: response.data.content },
    ];

    // Update messages state with chatbot response
    setMessages(updatedMessagesWithChatbot);

    // Clear the input field
    setInputMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-500 text-white py-4 text-center">
        <h1 className="text-2xl font-semibold">OpenAI Chatbot</h1>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="border p-4 rounded-lg shadow-lg w-96 max-w-full">
          <div className="border p-2 h-60 overflow-y-scroll">
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
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-grow border rounded p-2 mr-2"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white rounded p-2"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sathi;
