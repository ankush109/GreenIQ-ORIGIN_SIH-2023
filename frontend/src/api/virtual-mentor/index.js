import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// sending the access token (jwt token) to the authenticated urls to validate if the user is logged in

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
const AskSathiChatBot = async (prompt) => {
  const { data } = await AuthAPI().post(
    "https://green-iq-backend.onrender.com/find-complexity",
    { prompt }
  );
  return data;
};

export { AskSathiChatBot };
