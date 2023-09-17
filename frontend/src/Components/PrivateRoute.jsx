import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { GetUserQuery } from "../api/user";

const ProtectedRoute = () => {
  const data = GetUserQuery();
  const isAuthenticated = data?.data?.name;
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
