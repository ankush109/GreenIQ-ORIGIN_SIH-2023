import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DateTime from "./DateTime";
import { GetUserQuery } from "../api/user/index";
function Home() {
  const data = GetUserQuery();
  const [user, setuser] = useState();
  useEffect(() => {
    setuser(data.data);
  });
  return <div>hi there!</div>;
}

export default Home;
