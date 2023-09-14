import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {GetUserQuery} from "../api/user/index";
function Home() {
const data = GetUserQuery();
const [user,setuser]=useState();
useEffect(()=>{
  console.log(data.data,'data')
  setuser(data.data)
})
  return (
    <div>
      <Navbar />
     
    </div>
  );
}

export default Home;
