import { TextField } from "@mui/material";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import { loginUser, registerUser } from "../../api";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { useNavigate } from "react-router";
import Loading from "../Loading";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [button, setbutton] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting, isValidating },
  } = useForm({
    mode: "onChange",

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (formData) => {
    setbutton(true);
    try {
      const response = await loginUser(formData);
      setbutton(true);
      const { data } = response;
      if (response.status === 200) {
        localStorage.setItem("token", data.message.accessToken);
        toast.success("Login Successful", { id: data.message });
        navigate("/");
      }
      reset();
      setApiError(null);
      setValue("email", "");
      setShowPassword(false);
    } catch (err) {
      setApiError("please verify your credentials");
      toast.error("Invalid Credentials");
      setbutton(false);
    }
    reset();

    setValue("email", "");
    setShowPassword(false);
  };
  return (
    <div className="flex">
      <div className=" hidden lg:block w-1/2 h-screen bg-blue-400">
        <img
          className="object-cover h-full w-full"
          src="https://newlookschool.com/wp-content/uploads/2021/08/Knolage-and-Learning.jpg"
        />
      </div>
      <div className="flex lg:w-1/2  sm:w-full  justify-center p-32">
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-bold text-3xl m-5 text-green-600 border-red-500">
            Welcome to GreenIQ
          </h1>

          <p className="text-gray-500 ">Existing User? </p>
          <h1 className="font-bold text-3xl font-mono">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8  my-10">
              <div className="">
                <TextField
                  required
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="w-full rounded-lg text-white"
                  {...register("email")}
                />
              </div>
              <div className="relative">
                <TextField
                  required
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  className="w-full rounded-lg text-white"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter  a password"
                  {...register("password")}
                />
                <div
                  className="absolute top-8 right-1 translate-x-[-50%] translate-y-[-50%] hover:cursor-pointer"
                  onClick={() => {
                    setShowPassword((showPassword) => !showPassword);
                  }}
                >
                  {showPassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex mx-10 p-5">
              <p
                className="
            text-gray-500 
          
            "
              >
                New User ?
              </p>
              <p
                className="text-blue-500 mx-1 hover: cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                {"  "}
                Sign up
              </p>
            </div>
            {!button ? (
              <button
                disabled={isSubmitting} // Disable the button while submitting
                className="py-2 px-10 mx-24 my-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-500 hover:text-white hover:scale-110 duration-300"
              >
                Login
              </button>
            ) : (
              <Loading />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
