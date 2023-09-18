import React from "react";

function Sidebar() {
  return (
    <div className="bg-blue-400 h-full w-full">
      <div className="bg-blue-600 p-3 flex justify-center items-center  text-white text-center font-bold">
        Welcome Ankush
      </div>
      <div className="flex flex-col items-center justify-center h-full gap-10">
        <div className="bg-white p-2 rounded-lg w-2/3 hover:font-bold">
          Course Records
        </div>
        <div className="bg-white p-2 rounded-lg w-2/3 hover:font-bold">
          Upcoming Tests
        </div>
        <div className="bg-white p-2 rounded-lg w-2/3 hover:font-bold">
          General Doubts
        </div>
        <div className="bg-white p-2 rounded-lg w-2/3 hover:font-bold">
          Doubt Session
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
