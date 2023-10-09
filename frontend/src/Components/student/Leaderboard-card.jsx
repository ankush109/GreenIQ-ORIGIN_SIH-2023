import React from "react";

const Leader = ({ name, rating }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg text-center">
      <div className="text-xl font-semibold mb-2">{name}</div>
      <div className="text-gray-600 text-sm">{rating} Stars</div>
    </div>
  );
};

export default Leader;
