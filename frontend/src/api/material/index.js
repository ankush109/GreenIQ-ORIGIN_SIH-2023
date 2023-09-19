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
const getallSubjects = async () => {
  const { data } = await AuthAPI().get("/user/get-subjects");
  return data;
};
const getmaterial = async (subjectname) => {
  const { data } = await AuthAPI().get("/user/get-materials", {
    subjectname,
  });
  return data;
};
const getSubjectsQuery = () =>
  useQuery({
    queryKey: ["get-subjects"],
    queryFn: () => getallSubjects,
    select: (data) => {
      const res = data.message;
      return res;
    },
  });
const getmaterialQuery = () =>
  useQuery({
    queryKey: ["get-materials"],
    queryFn: () => getmaterial,
    select: (data) => {
      const res = data.message;
      return res;
    },
  });
export { getmaterialQuery, getSubjectsQuery };
