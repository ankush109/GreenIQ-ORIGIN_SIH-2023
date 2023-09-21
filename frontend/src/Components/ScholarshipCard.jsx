import React from "react";

const ScholarshipCard = () => {
  return (
    <div className="bg-white w border-2 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 h-96 w-2/3 flex flex-col justify-between">
      <div className="flex justify-center items-center h-1/2">
        <img
          src="https://www.lbcc.edu/sites/main/files/imagecache/lightbox/main-images/scholarships.jpg"
          alt="Scholarship Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 h-1/2 overflow-y-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Scholarship Title
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          {/* Repeat this paragraph or use your scholarship content here */}
        </p>
        <a href="#" className="text-blue-500 hover:underline">
          Read More
        </a>
      </div>
    </div>
  );
};

export default ScholarshipCard;
