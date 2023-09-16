import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetUserQuery } from "../api/user";

import {CgProfile}   from "react-icons/cg";
import {MdDashboard}  from "react-icons/md";
import {
  
  MdLeaderboard,
  MdAssignmentAdd
} from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import {PiExamFill}from "react-icons/pi";
import {BiSolidReport,BiSolidLogOut}from "react-icons/bi";
import {FaNewspaper}from "react-icons/fa";
import {AiFillSetting} from "react-icons/ai"
const Leftbar = () => {
   const data = GetUserQuery();
  const [user, setuser] = useState();
  useEffect(() => {
    console.log(data.data, "data");
    setuser(data.data);
  }, [data.data]);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    console.log(path);

    setSelectedTab(path);
  }, [selectedTab]);
  return (
  <>
  {/* component */}

    <div className="fixed flex flex-col  left-0 w-64 bg-white h-full border-r">
      <div className="flex items-center justify-center h-14 border-b">
        <div> {user ? (
                <h1>Hello {user?.name} </h1>
              ) : (
                <Link to="/login">Login</Link>
              )}</div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
                {/* <MdDashboard className="text-xl"/> */}
              <div className="text-sm font-light tracking-wide text-gray-500">
                Dashboard
              </div>
            </div>
          </li>
          <li>
            <div
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
               
              </span>
             <SiBookstack className="text-xl" />
              <span className="ml-2 text-sm tracking-wide truncate">
                <Link to="/courses">Courses</Link>
              </span>
            </div>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
                 <span className="inline-flex justify-center items-center ml-4">
               
              </span>
             <PiExamFill className='text-xl'/>
              <span className="ml-2 text-sm tracking-wide truncate">Tests</span>
              <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                New
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
             
              </span>
              <BiSolidReport className='text-xl'/>
              <span className="ml-2 text-sm tracking-wide truncate">
                Reports
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
               
              </span>
              <MdLeaderboard className='text-xl'/>
              <span className="ml-2 text-sm tracking-wide truncate">
                Leaderboard
              </span>
              <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                1.2k
              </span>
            </a>
          </li>
        
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">

              </span>
        <FaNewspaper className='text-xl'/>
              <span className="ml-2 text-sm tracking-wide truncate">
               NewsFeed
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
               
              </span>
              <MdAssignmentAdd className='text-xl'/>
              
              <span className="ml-2 text-sm tracking-wide truncate">
                Assignments
              </span>
              <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">
                15
              </span>
            </a>
          </li>
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">
                Settings
              </div>
            </div>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <CgProfile className='text-xl'/>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Profile
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                
              </span>
              <AiFillSetting className='text-xl'/>
              <span className="ml-2 text-sm tracking-wide truncate">
                Settings
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
               
              </span>
              <BiSolidLogOut className="text-xl"/>
              <span className="ml-2 text-sm tracking-wide truncate">
                Logout
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
 
</>

  )
}

export default Leftbar