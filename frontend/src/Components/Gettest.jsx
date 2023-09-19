import React from "react";
import Leftbar from "./Leftbar";

function Gettest() {
  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="hidden lg:block w-1/4 h-screen">
        <Leftbar />
      </div>
    </div>
  );
}

export default Gettest;
