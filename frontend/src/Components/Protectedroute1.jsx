/*import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GetUserQuery } from "../api/user";

const Protectedroute1 = () => {
  const data = GetUserQuery();
  console.log("Data:",data.data);
  const [user, setUser] = useState(true);

  useEffect(() => {
    setUser(data.data); // Move the setUser inside the useEffect callback
  }, [data.data]); // Place the dependencies array here

console.log("User:",user);
  const isMentor = user && user.role === "mentor";

  return isMentor ? <Outlet /> : <Navigate to="/login" />;
 
};

export default Protectedroute1;
*/

import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GetUserQuery } from "../api/user";

const ProtectedRoute = () => {
  const data = GetUserQuery();
  console.log("Data:",data);
  const [user, setUser] = useState(true);

  useEffect(() => {
  
    if (data.isAuthenticated) {
      setUser(data);
    }
  }, [data.isAuthenticated]); 
  console.log("User:",user);
  
  console.log("User role:",user.data.role);
  const isMentor = user && user.data && user.data.role === "mentor";

  return isMentor ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;


