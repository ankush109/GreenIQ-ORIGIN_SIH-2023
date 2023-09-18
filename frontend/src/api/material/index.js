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

const getmaterial = async () => {
  const { data } = await AuthAPI().get("/user/get-material");
  return data;
};
const getmaterialQuery = () =>
  useQuery({
    queryKey: ["material"],
    queryFn: () => getmaterial,
    select: (data) => {
      const res = data.message;
      return res;
    },
  });
  export {getmaterialQuery}