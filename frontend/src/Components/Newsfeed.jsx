import React from "react";
import ScholarshipCard from "./ScholarshipCard";
import Leftbar from "./Leftbar";

const Newsfeed = () => {
  return (
    <div className=" base-container py-[5vh] ">
      <div>
        <h2 className="text-3xl font-merri mb-5 m-3">News</h2>
      </div>
      <div className="flex flex-col items-center gap-4">
        <ScholarshipCard />
        <ScholarshipCard />
        <ScholarshipCard />
        <ScholarshipCard />
        <ScholarshipCard />
      </div>
    </div>
  );
};

export default Newsfeed;
