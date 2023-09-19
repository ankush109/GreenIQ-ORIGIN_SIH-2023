import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { GetUserQuery } from "../api/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const data = GetUserQuery();
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data?.data]);

  useEffect(() => {
    if (user && user.role !== "mentor") {
      setShowToast(true);
      notify();
      setTimeout(() => {
        navigate("/");
        notify();
      }, 3000);
    }
  }, [user, navigate]);

  const notify = () => {
    toast.error("You are not authorized to access this page.");
  };

  const isMentor = user && user.role === "mentor";

  return isMentor ? (
    <>
      <Outlet />
    </>
  ) : (
    <>{showToast && <ToastContainer />}</>
  );
};

export default ProtectedRoute;
