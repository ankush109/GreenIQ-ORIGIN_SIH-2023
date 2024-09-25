import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
export const CreateVideoAuthToken = async () => {
  const { data } = await AuthAPI().get("/user/create-video-token");
  return data.message;
};
