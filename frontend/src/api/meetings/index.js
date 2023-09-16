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
const bookMeeting = async (meetinginfo) => {
  const { data } = await AuthAPI().post("/user/book-meeting", meetinginfo);
  return data;
};
const getMyRequestedMeetings = async () => {
  const { data } = await AuthAPI().get("/user/my-meetings");
  console.log;
  return data;
};
const GetMentors = async () => {
  const { data } = await AuthAPI().get("/user/mentors");
  return data;
};
const getMentorsQuery = () =>
  useQuery({
    queryKey: ["mentors"],
    queryFn: () => GetMentors(),
    select: (data) => {
      const res = data.message;
      return res;
    },
  });
const myRequestedMeetingsQuery = () =>
  useQuery({
    queryKey: ["meetings"],
    queryFn: () => getMyRequestedMeetings(),
    select: (data) => {
      const res = data.message;
      return res;
    },
  });

export { getMentorsQuery, bookMeeting, myRequestedMeetingsQuery };
