import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetUserQuery } from "../api/user";
import { RiDiscussFill } from "react-icons/ri";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
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
import ClassIcon from "@mui/icons-material/Class";
import { LoaderIcon } from "react-hot-toast";

const Leftbar = () => {
  const data = GetUserQuery();
  const [user, setuser] = useState();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setuser(data.data);
    if (data.data) {
      setloading(false);
    }
  }, [data.data]);

  const [selected, setSelected] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    setSelected(path);
  }, []);

  return (
    <>
      {!loading ? (
        <div className="hidden lg:block h-full bg-white border-r fixed w-[300px] overflow-y-auto">
          <div className="flex items-center justify-center h-14 border-b">
            <div>
              {user ? (
                <h1 className="font-bold">
                  Hello, {user?.name.toUpperCase()}{" "}
                </h1>
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
              {user?.role === "student" && (
                <li>
                  <div
                    className={
                      selected === "/user/sathi"
                        ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4"></span>
                    <AssistantIcon className="text-xl" />
                    <span className="ml-2 text-sm tracking-wide truncate">
                      <Link
                        to="/user/sathi"
                        onClick={() => setSelected("/user/sathi")}
                      >
                        Virtual Mentor
                      </Link>
                    </span>
                  </div>
                </li>
              )}
              <li>
                <div
                  className={
                    selected === "/user/courses"
                      ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                      : "relative flex flex-row items-center h-11 focus:outline-none hover-bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  }
                >
                  <span className="inline-flex justify-center items-center ml-4"></span>
                  <SiBookstack className="text-xl" />
                  <span className="ml-2 text-sm tracking-wide truncate">
                    <Link
                      to="/user/courses"
                      onClick={() => setSelected("/user/courses")}
                    >
                      Courses
                    </Link>
                  </span>
                </div>
              </li>
              {user?.role === "mentor" ? (
                <li>
                  <div
                    className={
                      selected === "/mentor/my-test"
                        ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4"></span>
                    <PiExamFill className="text-xl" />
                    <span className="ml-2 text-sm tracking-wide truncate">
                      <Link
                        to="/mentor/my-test"
                        onClick={() => setSelected("/mentor/my-test")}
                      >
                        Mentor's Tests
                      </Link>
                    </span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                      New
                    </span>
                  </div>
                </li>
              ) : (
                <li>
                  <div
                    className={
                      selected === "/user/test"
                        ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4"></span>
                    <PiExamFill className="text-xl" />
                    <span className="ml-2 text-sm tracking-wide truncate">
                      <Link
                        to="/user/test"
                        onClick={() => setSelected("/user/test")}
                      >
                        Tests
                      </Link>
                    </span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                      New
                    </span>
                  </div>
                </li>
              )}
              {user?.role === "mentor" ? (
                <li>
                  <div
                    className={
                      selected === "/mentor/createtest"
                        ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4"></span>
                    <PiExamFill className="text-xl" />
                    <span className="ml-2 text-sm tracking-wide truncate">
                      <Link
                        to="/mentor/createtest"
                        onClick={() => setSelected("/mentor/createtest")}
                      >
                        Create test
                      </Link>
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
                <div
                  className={
                    selected === "/user/discuss"
                      ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                      : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  }
                >
                  <span className="inline-flex justify-center items-center ml-4"></span>
                  <RiDiscussFill className="text-xl" />
                  <span className="ml-2 text-sm tracking-wide truncate">
                    <Link
                      to="/user/discuss"
                      onClick={() => setSelected("/user/discuss")}
                    >
                      Discuss
                    </Link>
                  </span>
                </div>
              </li>
              {user?.role === "student" && (
                <li>
                  <div
                    className={
                      selected === "/user/book-meeting"
                        ? "border-zinc-700  bg-gray-50relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4"></span>
                    <MeetingRoomIcon className="text-xl" />
                    <span className="ml-2 text-sm tracking-wide truncate">
                      <Link
                        to="/user/book-meeting"
                        onClick={() => setSelected("/user/book-meeting")}
                      >
                        Book Meeting
                      </Link>
                    </span>
                  </div>
                </li>
              )}
              {/* <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4"></span>
                <BiSolidReport className="text-xl" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  <Link to="">Reports</Link>
                </span>
              </div>
            </li> */}
              <li>
                <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4"></span>
                  <HomeIcon className="text-xl" />
                  <span className="ml-2 text-sm tracking-wide truncate">
                    <Link to="/">Home</Link>
                  </span>
                </div>
              </li>
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
              </li>
              {user?.role === "mentor" ? (
                <li>
                  <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4"></span>
                    <ClassIcon className="text-xl" />
                    <span className="ml-2 text-sm tracking-wide truncate">
                      <Link to="/mentor/classroom">Your Classroom</Link>
                    </span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                      1.2k
                    </span>
                  </div>
                </li>
              ) : (
                ""
              )}
              <li>
                <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4"></span>
                  <FaNewspaper className="text-xl" />
                  <span className="ml-2 text-sm tracking-wide truncate">
                    <Link to="/user/newsfeed">News Feed</Link>
                  </span>
                </div>
              </li>
              {user?.role !== "mentor" ? (
                <li>
                  <div
                    className={
                      selected === "/user/material" ||
                      selected === "/mentor/material"
                        ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4"></span>
                    <MdAssignmentAdd className="text-xl" />
                    <span className="ml-2 text-sm tracking-wide truncate">
                      <Link
                        to={`${
                          user?.role === "student"
                            ? "/user/material"
                            : "/mentor/material"
                        }`}
                        onClick={() => setSelected("/user/material")}
                      >
                        Materials
                      </Link>
                    </span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">
                      15
                    </span>
                  </div>
                </li>
              ) : (
                ""
              )}{" "}
              {user?.role === "mentor" ? (
                <li>
                  <div
                    className={
                      selected === "/mentor/Meetings" ||
                      selected === "/mentor/Meetings"
                        ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4"></span>
                    <MdAssignmentAdd className="text-xl" />
                    <span className="ml-2 text-sm tracking-wide truncate">
                      <Link
                        to={`${
                          user?.role === "student"
                            ? "/mentor/Meetings"
                            : "/mentor/Meetings"
                        }`}
                        onClick={() => setSelected("/mentor/Meetings")}
                      >
                        Your Meetings
                      </Link>
                    </span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">
                      15
                    </span>
                  </div>
                </li>
              ) : (
                ""
              )}{" "}
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Settings
                  </div>
                </div>
              </li>
              <li>
                <div
                  className={
                    selected === "/user/profile"
                      ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                      : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  }
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <CgProfile className="text-xl" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    <Link
                      to="/user/profile"
                      onClick={() => setSelected("/user/profile")}
                    >
                      Profile
                    </Link>
                  </span>
                </div>
              </li>
              <li>
                <div
                  className={
                    selected === "/user/settings"
                      ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                      : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  }
                >
                  <span className="inline-flex justify-center items-center ml-4"></span>
                  <AiFillSetting className="text-xl" />
                  <span className="ml-2 text-sm tracking-wide truncate">
                    <Link
                      to="/user/settings"
                      onClick={() => setSelected("/user/settings")}
                    >
                      Settings
                    </Link>
                  </span>
                </div>
              </li>
              {user?.role === "mentor" && (
                <li>
                  <div
                    className={
                      selected === "/mentor/createMaterial"
                        ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4"></span>
                    <AiFillSetting className="text-xl" />
                    <span className="ml-2 text-sm tracking-wide truncate">
                      <Link
                        to="/mentor/createMaterial"
                        onClick={() => setSelected("/mentor/createMaterial")}
                      >
                        Create Material
                      </Link>
                    </span>
                  </div>
                </li>
              )}
              <li>
                <div
                  className={
                    selected === "/login"
                      ? "border-zinc-700  bg-gray-50 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                      : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  }
                >
                  <span className="inline-flex justify-center items-center ml-4"></span>
                  <BiSolidLogOut className="text-xl" />
                  <span className="ml-2 text-sm tracking-wide truncate">
                    <Link
                      onClick={() => {
                        localStorage.removeItem("token");
                      }}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center m-20">
          <LoaderIcon
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </div>
      )}
    </>
  );
};

export default Leftbar;
