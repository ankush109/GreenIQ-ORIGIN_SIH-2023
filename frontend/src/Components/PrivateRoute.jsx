import React, { useEffect, useState } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { GetUserQuery } from "../api/user";

const ProtectedRoute = () => {
  const data = GetUserQuery();
  const [user, setuser] = useState(true);
  useEffect(() => {
    setuser(data);
  }),
    [data.data];

  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
