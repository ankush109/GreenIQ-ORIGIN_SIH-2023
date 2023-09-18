/*import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

const createTest = async (testInfo) => {
  const { data } = await AuthAPI().post("/user/create-test", testInfo);
  return data;
};

const getTests = async (subjectId, classId) => {
  const params = { subjectId, classId };
  const { data } = await AuthAPI().get("/user/get-test", { params });
  return data;
};

const deleteTest = async (testId) => {
  const { data } = await AuthAPI().delete(`/user/delete-test?id=${testId}`);
  return data;
};


const getTestsQuery = (subjectId, classId) =>
  useQuery({
    queryKey: ["getTests", subjectId, classId],
    queryFn: () => getTests(subjectId, classId),
     select: (data) => {
      const res = data.message;
      return res;
    },
  });

const deleteTestQuery = (testId) =>
  useQuery({
    queryKey: ["deleteTest", testId],
    queryFn: () => deleteTest(testId),
  });

export { createTest, getTestsQuery, deleteTestQuery };
*/

// test/index.js
import axios from "axios";

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

const createTest = async (testInfo) => {
  const { data } = await AuthAPI().post("/user/create-test", testInfo);
  return data;
};

const getTests = async (subjectId, classId) => {
  const params = { subjectId, classId };
  const { data } = await AuthAPI().get("/user/get-test", { params });
  return data;
};

const deleteTest = async (testId) => {
  const { data } = await AuthAPI().delete(`/user/delete-test?id=${testId}`);
  return data;
};

export { createTest, getTests, deleteTest };
