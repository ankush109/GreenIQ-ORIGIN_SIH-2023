import React from 'react';
import ScholarshipCard from './ScholarshipCard';
import Leftbar from './Leftbar';

const Newsfeed = () => {
  return (
    <div className="max-w-screen flex ">
      <div className="w-screen h-screen">
        <Leftbar />
      </div>
     
        <div className="flex flex-col items-center space-y-6 overflow-y-scroll no-scrollbar">
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
