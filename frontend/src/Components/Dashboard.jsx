import React,{useState,useEffect} from 'react'
import Leftbar from './Leftbar';
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
 
  
  return (
   <div className=" w-1/4 h-screen">
        <Leftbar />
      </div>
  
  )
}

export default Dashboard