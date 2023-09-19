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

const getmaterial = async (classname = "11", subjectname = "maths") => {
  const { data } = await AuthAPI().get("/user/get-materials", {
    classname,
    subjectname,
  });
  return data;
};
const getmaterialQuery = () =>
  useQuery({
    queryKey: ["get-materials"],
    queryFn: () => getmaterial,
    select: (data) => {
      const res = data.message;
      return res;
    },
  });
export { getmaterialQuery };
