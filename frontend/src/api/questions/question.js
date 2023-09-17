import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// sending the access token (jwt token) to the authenticated urls to validate if the user is logged in

const AuthAPI = () => {
  if (typeof window !== "undefined") {
    return axios.create({
      baseURL: `http://localhost:5000/v1/`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    return axios.create({
      baseURL: `http://localhost:5000/v1/`,
      headers: {
        authorization: `Bearer }`,
        "Content-Type": "application/json",
      },
    });
  }
};
const postQuestion = async (text) => {
  const { data } = await AuthAPI().post("/user/create-question", { text });
  return data;
};
const answerReply = async (text, questionId) => {
  const { data } = await AuthAPI().post("/user/answer-question", {
    text,
    questionId,
  });
  return data;
};
const getAllquestionsInfo = async () => {
  const { data } = await AuthAPI().get("/user/get-allquestions");
  return data;
};
const getAllquestionsInfoQuery = () =>
  useQuery({
    queryKey: ["questions"],
    queryFn: () => getAllquestionsInfo(),
    select: (data) => {
      return data.message;
    },
  });
export { getAllquestionsInfoQuery, postQuestion, answerReply };
