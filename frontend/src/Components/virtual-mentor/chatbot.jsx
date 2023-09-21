import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        `question=${encodeURIComponent(question)}`, // Serialize the question as form data
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Set the Content-Type header
          },
        }
      );
      setAnswer(response.data.answer);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="chatbot">
        <div className="chat">
          {/* Display chat messages here */}
          {answer && (
            <div className="chat-message">
              <strong>User:</strong> {question}
            </div>
          )}
          {answer && (
            <div className="chat-message">
              <strong>Chatbot:</strong> {answer}
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          placeholder="Ask a question"
          value={question}
          onChange={handleQuestionChange}
          className="chat-input"
        />
        <button type="submit" className="chat-button">
          Ask
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
