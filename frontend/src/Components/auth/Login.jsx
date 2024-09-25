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
    <div className="flex h-screen ">
      <div className=" hidden lg:block w-1/2  bg-blue-400">
        <img
          className="object-cover h-full w-full"
          src="https://newlookschool.com/wp-content/uploads/2021/08/Knolage-and-Learning.jpg"
        />
      </div>
      <div className=" mx-auto ml-auto mt-auto mb-auto ">
        <div className="flex  mx-auto  flex-col gap-4 h-1/2">
          <h1 className="text-center font-bold text-3xl m-5 text-green-600 border-red-500">
            Welcome to GreenIQ
          </h1>
      
        
          <h1 className="font-bold text-3xl font-mono">Login</h1>
          <div>New User ?  <a href="/register" className="text-blue-700 font-bold">Create new Account</a></div>
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
           
               {
              isSubmitting ? (
            <div className="bg-blue-500  text-white flex items-center h-16">
  <span className="text-center ml-2">Verifying Credentials ... </span>
  <Loading />
</div>

              ) : (
                 <button  className="bg-blue-500 p-3 rounded-xl w-full text-white">
                Register
              </button>
              )
             }
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
