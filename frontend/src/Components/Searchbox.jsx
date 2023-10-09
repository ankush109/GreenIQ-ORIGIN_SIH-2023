import React from "react";

const Searchbox = ({ text, searchQuery, setSearchQuery }) => {
  return (
    <div className="space-x-5 my-5 h-[70px] font-comf flex-row-between mx-auto md:w-[500px] border-2 px-5 py-2 rounded-full">
      <input
        type="text"
        placeholder="Search ..."
        className="w-full outline-none"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <button className="mini-btn">Search</button>
    </div>
  );
};

export default Searchbox;
