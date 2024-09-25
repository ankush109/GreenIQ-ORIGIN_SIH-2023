import React, { useEffect, useState } from "react";
import {
  answerReply,
  deleteMyQuestion,
  getAllquestionsInfo,
  getAllquestionsInfoQuery,
  postQuestion,
} from "../../api/questions/question";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetUserQuery } from "../../api/user";
import Leftbar from "../Leftbar";
import Loading from "../Loading";

function Discuss() {
  const q = GetUserQuery();
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
  const [openCommentsMap, setOpenCommentsMap] = useState({});
  const [activeTab, setActiveTab] = useState("all"); // "all" or "my"
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (questions) {
      setData(questions);
    }
  }, [questions]);
  const searchQuestion = async () => {
    await getAllquestionsInfo(searchText);
  };
  const handleReply = (questionId) => {
    setReplyingTo(questionId);
  };

  const handleComments = (questionId) => {
    setOpenCommentsMap((prevMap) => ({
      ...prevMap,
      [questionId]: !prevMap[questionId],
    }));
  };

  const deleteQuestion = async (id) => {
    const res = await deleteMyQuestion(id);
    if (res.success) {
      toast.success("Post has been deleted");
      refetch();
    } else {
      toast.error(res.message);
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newQuestion.trim() === "") {
      toast.error("Please enter a question.");
      return;
    }
    const res = await postQuestion(newQuestion);

    if (res.success) {
      toast.success("Post made successfully");
      refetch();
      setNewQuestion("");
    }
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
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
          className="border border-gray-300 rounded-lg p-2 w-[600px]"
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

  const filteredData =
    data.length > 0 &&
    data?.filter((question) => {
      
      const textMatch = question.text.includes(searchText);
      const tabMatch =
        activeTab === "all" ||
        (activeTab === "my" && question?.userId === q?.data.id);

      return textMatch && tabMatch;
    });

  return (
    <div className="flex justify-center">
      <div className=" w-full p-2 m-2 bg-white shadow-md rounded-lg">
      

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
        <div>
          <div className="flex bg-gray-200 w-[200px] p-2 m-4 rounded-lg justify-center">
            <div
              className={`cursor-pointer mr-4 ${
                activeTab === "all"
                  ? "text-blue-500 font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Posts
            </div>
            <div
              className={`cursor-pointer ${
                activeTab === "my"
                  ? "text-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("my")}
            >
              My Posts
            </div>
          </div>
        </div>
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : isError ? (
          <p className="text-red-600 text-center">Error loading questions.</p>
        ) : (
          <div>
            {filteredData.length > 0 &&
              filteredData?.map((question,idx) => (
                <>
                  <div
                    key={question.id}
                    className="mb-4 border border-gray-500 p-4 rounded-lg"
                  >
                    <div className="flex gap-2">
                      <h1 className="text-xl font-semi-bold mb-2">
                        #{idx+1}
                        {")"}
                      </h1>
                      <h3 className="text-lg font-bold mb-2">
                        {question?.text}
                      </h3>
                    </div>

                    <div className="flex justify-between">
                      <div className="">
                        <button
                          type="button"
                          className="text-zinc-700 bg-gray-200 p-3 rounded-lg hover:underline m-2"
                          onClick={() => handleComments(question?.id)}
                        >
                          Comments
                        </button>

                        {replyingTo === question?.id &&
                          renderReplyInput(question?.id)}
                        <button
                          onClick={() => handleReply(question.id)}
                          className=" bg-blue-500 text-white px-4 mx-3 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                          Add Comment
                        </button>
                        {question?.User?.id === q?.data?.id ? (
                          <Button
                            onClick={() => {
                              deleteQuestion(question?.id);
                            }}
                          >
                            <DeleteIcon
                              color="red"
                              style={{
                                color: "red",
                              }}
                            />
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-lg font-semibold">
                          {question?.answers?.length} Comments
                        </div>
                        <div className="">
                          <h1
                            className="text-md font-se
                    text-blue-500
                    font-bold
                    
                    mi-bold mx-12"
                          >
                           Posted By {question?.user.id == q?.data.id ? "You" :question?.user?.name}
                          </h1>
                          <h1
                            className="text-md font-se
                    text-zinc-500
                    font-bold
                    
                    mi-bold mx-12"
                          >
                            {" "}
                            ({" "}
                            {new Date(question.createdAt).toLocaleDateString(
                              "en-US",
                              options
                            )}
                            )
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    {openCommentsMap[question.id] &&
                      question?.answers?.length > 0 && (
                        <div className="mx-7 ">
                          <h1 className="font-bold m-2">Answers : </h1>
                          {question.answers.map((answer) => (
                            <div
                              key={answer?.id}
                              className="mb-2  border border-blue-600 p-5 rounded-lg"
                            >
                              <div className="font-medium ">
                                {answer?.owner?.name}
                              </div>
                              <div> {answer?.text} </div>
                              {new Date(question.createdAt).toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Discuss;
