import React from "react";

function Sidebar() {
  return (
    <div className="bg-blue-400 p-7 h-screen">
      <div className="bg-white p-3 rounded-lg text-center font-bold">
        Welcome Ankush{" "}
      </div>
      <div className="flex  flex-col items-center justify-center h-full gap-10  ">
        <div className="bg-white p-2 rounded-lg w-2/3  hover:font-bold">
          Course Records
        </div>
        <div className="bg-white p-2 rounded-lg w-2/3  hover:font-bold">
          {" "}
          Upcoming Tests
        </div>
        <div className="bg-white p-2 rounded-lg  w-2/3 hover:font-bold">
          General Doubts
        </div>
        <div className="bg-white p-2 rounded-lg w-2/3 hover:font-bold ">
          Doubt Session
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
