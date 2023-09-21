import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetUserQuery } from "../api/user";
import { RiDiscussFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdLeaderboard, MdAssignmentAdd } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { PiExamFill } from "react-icons/pi";
import { BiSolidReport, BiSolidLogOut } from "react-icons/bi";
import { FaNewspaper } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import AssistantIcon from "@mui/icons-material/Assistant";
import HomeIcon from "@mui/icons-material/Home";
const Leftbar = () => {
  const data = GetUserQuery();
  const [user, setuser] = useState();
  useEffect(() => {
    setuser(data.data);
  }, [data.data]);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    const path = window.location.pathname;

    setSelectedTab(path);
  }, [selectedTab]);
  return (
    <>
      <div className=" hidden lg:block h-full  bg-white border-r fixed w-[300px] overflow-y-auto">
        <div className="flex items-center justify-center h-14 border-b">
          <div>
            {user ? (
              <h1>Hello {user?.name} </h1>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Dashboard
                </div>
              </div>
            </li>
            {user?.role=="student" && 
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <AssistantIcon className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="/user/sathi">Virtual Mentor</Link>
                </span>
              </div>
            </li>}
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <SiBookstack className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="/user/courses">Courses</Link>
                </span>
              </div>
            </li>
            {user?.role == "mentor" ? (
              <li>
                <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4"></span>
                  <PiExamFill className="text-xl" />
                  <span className="ml-2 text-sm tracking-wide truncate">
                    {" "}
                    <Link to="/mentor/my-test">Mentor's Tests</Link>
                  </span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                    New
                  </span>
                </div>
              </li>
            ) : (
              <li>
                <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4"></span>
                  <PiExamFill className="text-xl" />
                  <span className="ml-2 text-sm tracking-wide truncate">
                    {" "}
                    <Link to="/user/test">Tests</Link>
                  </span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                    New
                  </span>
                </div>
              </li>
            )}
            {user?.role == "mentor" ? (
              <li>
                <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4"></span>
                  <PiExamFill className="text-xl" />
                  <span className="ml-2 text-sm tracking-wide truncate">
                    {" "}
                    <Link to="/mentor/createtest">Create test</Link>
                  </span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                    New
                  </span>
                </div>
              </li>
            ) : (
              ""
            )}
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <BiSolidReport className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="">Reports</Link>
                </span>
              </div>
            </li>
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <HomeIcon className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="/">Home</Link>
                </span>
              </div>
            </li>
            {user?.role=="student" &&
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <MdLeaderboard className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="/user/leaderboard">Leaderboard</Link>
                </span>
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                  1.2k
                </span>
              </div>
            </li>}

            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <FaNewspaper className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="">News Feed</Link>
                </span>
              </div>
            </li>
            {user?.role=="mentor" && 
             <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <FaNewspaper className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="/mentor/Meetings">Meetings</Link>
                </span>
              </div>
            </li>}
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <RiDiscussFill className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="/user/discuss">Discuss</Link>
                </span>
              </div>
            </li>
            {user?.role=="student" &&
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <RiDiscussFill className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="/user/book-meeting">Book Meeting</Link>
                </span>
              </div>
            </li>}
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <MdAssignmentAdd className="text-xl" />

                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to={`${user?.role=="student"?'/user/material':'/mentor/material'}`}>Materials</Link>
                </span>
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">
                  15
                </span>
              </div>
            </li>
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Settings
                </div>
              </div>
            </li>
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <CgProfile className="text-xl" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="/user/profile">Profile</Link>
                </span>
              </div>
            </li>
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <AiFillSetting className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="/user/settings">Settings</Link>
                </span>
              </div>
            </li>
            {user?.role=="mentor" && 
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <AiFillSetting className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="/mentor/createMaterial">Create Material</Link>
                </span>
              </div>
            </li>}
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <BiSolidLogOut className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                    to=""
                  >
                    Logout
                  </Link>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Leftbar;
