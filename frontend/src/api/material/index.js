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
const getallSubjects = async () => {
  const { data } = await AuthAPI().get("/user/get-subjects");
  return data;
};
const getmaterial = async (subjectName) => {
  const { data } = await AuthAPI().get("/user/get-materials", {
    params: {
      subjectName,
    },
  });
  console.log(data);
  return data;
};
const createMaterial = async (formdata) => {
  const { data } = await AuthAPI().post("/user/create-material", formdata);
  return data;
};
const getSubjectsQuery = () =>
  useQuery({
    queryKey: ["get-subjects"],
    queryFn: () => getallSubjects(),
    select: (data) => {
      const res = data.message;
      return res;
    },
  });

export { getmaterial, getSubjectsQuery, createMaterial };
