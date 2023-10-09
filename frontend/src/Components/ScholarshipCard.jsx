import React from "react";

const ScholarshipCard = ({ title, des }) => {
  return (
    <div className="bg-white w border-2 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 w-[500px] flex flex-col justify-between">
      <div className="p-4 overflow-y-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{des}</p>
        <a href="#" className="text-blue-500 hover:underline">
          Read More
        </a>
      </div>
    </div>
  );
};

export default ScholarshipCard;
