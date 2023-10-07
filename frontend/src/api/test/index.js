import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AuthAPI = () => {
  if (typeof window !== "undefined") {
    return axios.create({
      baseURL: `https://green-iq-backend.onrender.com/v1/`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    return axios.create({
      baseURL: `https://green-iq-backend.onrender.com/v1/`,
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

export { createTest, mentorTestQuery, deleteTest, getTestsQuery };