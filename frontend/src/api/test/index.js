import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AuthAPI = () => {
  if (typeof window !== "undefined") {
    return axios.create({
      baseURL: `${import.meta.env.VITE_BASE_URL}/v1/`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    return axios.create({
      baseURL: `${import.meta.env.VITE_BASE_URL}/v1/`,
      headers: {
        authorization: `Bearer }`,
        "Content-Type": "application/json",
      },
    });
  }
};

const createTest = async (testInfo) => {
  const { data } = await AuthAPI().post("/user/create-test", testInfo);
  return data;
};

const submitIndividual = async (testId, questionId, answer) => {
  const { data } = await AuthAPI().post("/user/submit-answer", {
    testId,
    questionId,
    answer,
  });
  return data;
};

const startTest = async (testId) => {
  const { data } = await AuthAPI().post("/user/start-test", {
    testId,
  });
  return data;
};
const finishTest = async (testId) => {
  const { data } = await AuthAPI().post("/user/finish-test", {
    testId,
  });
  return data;
};
const getSubmissionsByTestId = async (testId) => {
  const { data } = await AuthAPI().get(`/user/get-sub/${testId}`);
  return data;
};
const getSubmissionDetails = async (attemptId) => {
  const { data } = await AuthAPI().get(`/user/get-sub-details/${attemptId}`);
  return data;
};
const scoreTestAttempt = async (attempt, score) => {
  const { data } = await AuthAPI().post(`/user/score`, {
    attemptId: attempt,
    score: parseInt(score),
  });
  return data;
};
const getQuestionByTestId = async (testId) => {
  const { data } = await AuthAPI().get(`/user/get-questions/${testId}`);
  return data;
};
const getMyTest = async () => {
  const { data } = await AuthAPI().get("/user/get-my-test", "11");
  return data;
};

const getMentorTest = async () => {
  const { data } = await AuthAPI().get("/user/get-test");
  return data;
};
const deleteTest = async (testId) => {
  const { data } = await AuthAPI().delete(`/user/delete-test?id=${testId}`);
  return data;
};
const getTestsQuery = () =>
  useQuery({
    queryKey: ["get-my-Tests"],
    queryFn: () => getMyTest(),
    select: (data) => {
      const res = data.message;
      return res;
    },
  });
const mentorTestQuery = () =>
  useQuery({
    queryKey: ["get-mentor-Tests"],
    queryFn: () => getMentorTest(),
    select: (data) => {
      const res = data.message;
      return res;
    },
  });

export {
  getSubmissionDetails,
  getSubmissionsByTestId,
  createTest,
  mentorTestQuery,
  deleteTest,
  finishTest,
  getTestsQuery,
  getQuestionByTestId,
  submitIndividual,
  startTest,
  scoreTestAttempt,
};
