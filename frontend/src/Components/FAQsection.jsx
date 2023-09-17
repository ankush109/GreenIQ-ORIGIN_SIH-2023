import React, { useEffect, useState } from "react";
import {
  answerReply,
  getAllquestionsInfoQuery,
  postQuestion,
} from "../api/questions/question";
import toast from "react-hot-toast";

function FAQsection() {
  const {
    data: questions,
    isLoading,
    isError,
    refetch,
  } = getAllquestionsInfoQuery();
  const [data, setData] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    if (questions) {
      setData(questions);
    }
  }, [questions]);

  const handleReply = (questionId) => {
    setReplyingTo(questionId);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questions.length) {
      toast.error("Please enter 2 words.");
    }
    console.log(newQuestion);
    const res = await postQuestion(newQuestion);

    if (res.success) {
      toast.success("Post made successfully");
      refetch();
    }
  };

  const handleSubmitReply = async (questionId) => {
    if (replyText.trim() === "") {
      toast.error("Please enter a reply.");
      return;
    }

    const res = await answerReply(replyText, questionId);

    if (res.success) {
      toast.success("Reply posted successfully");
      refetch();
      setReplyingTo(null);
      setReplyText("");
    }
  };

  const renderReplyInput = (questionId) => {
    return (
      <div className="mb-2">
        <textarea
          rows="3"
          className="border border-gray-300 rounded-lg p-2 w-full"
          placeholder="Write your reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          required
        />
        <div className="mt-2">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mr-2"
            onClick={() => handleSubmitReply(questionId)}
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
            onClick={handleCancelReply}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">
        Frequently Asked Questions
      </h1>
      <div>
        <form onSubmit={handleSubmit} className="mb-4">
          <label
            htmlFor="newQuestion"
            className="block text-lg font-medium mb-2"
          >
            Ask a new question:
          </label>
          <input
            type="text"
            id="newQuestion"
            className="border border-gray-300 rounded-lg p-2 w-1/2 m-2"
            placeholder="Ask your question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Post Question
          </button>
        </form>
      </div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : isError ? (
        <p className="text-red-600 text-center">Error loading questions.</p>
      ) : (
        <div>
          {data.map((question) => (
            <div
              key={question.id}
              className="mb-4 border border-gray-500 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-2">{question.text}</h3>
              <button
                type="button"
                className="text-blue-500 hover:underline mt-2"
                onClick={() => handleReply(question.id)}
              >
                Reply
              </button>
              {replyingTo === question.id && renderReplyInput(question.id)}
              <div className="mt-4">
                <ul className="list-disc ml-6">
                  {question.answers.map((answer) => (
                    <li key={answer.id} className="mb-2">
                      {answer.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FAQsection;
