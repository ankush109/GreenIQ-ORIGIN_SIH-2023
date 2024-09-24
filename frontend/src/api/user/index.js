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
const GetUser = async () => {
  const { data } = await AuthAPI().get("/user/user-details");
  return data;
};
const getAllUsers = async () => {
  const { data } = await AuthAPI().get("/user/get-all-users");
  return data;
};
const sendMessage =async (message,receiverId,conversationId)=>{
  const {data } =await AuthAPI().post("/user/create-conversation",{
    message,receiverId,conversationId
  })
}
const getUserById =async (userId)=>{
  const {data } =await AuthAPI().get("/user/getuserbyid/userId")
  return data
}
const getMyConvos =async ()=>{
  const {data } =await AuthAPI().get("/user/all-convo");
  return data
}
const GetUserQuery = () =>
  useQuery({
    queryKey: ["user-details"],
    queryFn: () => GetUser(),
    select: (data) => {
      const res = data.message;
 
      return res;
    },
  });


  const GetAllUsersQuery = () =>
  useQuery({
    queryKey: ["all-users"],
    queryFn: () => getAllUsers(),
    select: (data) => {
      const res = data.message;
    
      return res;
    },
  });
  const GetAllConvoQuery = () =>
  useQuery({
    queryKey: ["all-convo"],
    queryFn: () => getMyConvos(),
    select: (data) => {
      const res = data.message;
      console.log("Res:", res);
      return res;
    },
  });

export { GetUserQuery,GetAllUsersQuery,GetAllConvoQuery,getUserById,sendMessage };
