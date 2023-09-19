import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { GetUserQuery } from "../api/user";

function Navbar() {
  const data = GetUserQuery();
  const [user, setuser] = useState();
  useEffect(() => {
    setuser(data.data);
  }, [data.data]);
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50">
      <div className=" bg-zinc-700   p-4 ">
        <div className="flex justify-between ">
          <div>
            <a href="/">
              <h1 className="text-2xl font-bold text-white">GreenIQ</h1>
            </a>
          </div>
          <div>
            <ul className="flex space-x-4 text-white">
              {user ? (
                <h1>Hello {user?.name} </h1>
              ) : (
                <Link to="/login">Login</Link>
              )}
              {user?.role === "mentor" ? (
                <Link to="/mentor/Meetings">Meetings</Link>
              ) : (
                <Link to="/user/book-meeting">book a call</Link>
              )}

              {user ? (
                <li
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="font-bold hover:cursor-pointer"
                >
                  Logout
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
