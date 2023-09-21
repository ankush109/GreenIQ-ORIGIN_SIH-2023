import React from 'react';

const ScholarshipCard = () => {
  return (
    <div className="bg-white border-2 rounded-lg shadow-lg overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 h-96 w-2/3 flex flex-col justify-center items-center">
      <div className="flex m-4 justify-center items-center h-1/2">
        <img
          src="https://www.lbcc.edu/sites/main/files/imagecache/lightbox/main-images/scholarships.jpg"
          alt="Scholarship Image"
          className="w-full h-full  object-contain"
        />
      </div>
      <div className="p-2 h-1/2 overflow-y-scroll no-scrollbar text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Scholarship Title
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <a href="#" className="text-blue-500 hover:underline">
          Read More
        </a>
      </div>
    </div>
  );
};

export default ScholarshipCard;
