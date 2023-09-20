import React, { useEffect, useState } from "react";
import Leftbar from "../Leftbar";
import { mentorTestQuery } from "../../api/test";
import Searchbox from "../Searchbox";

function Mentortest() {
  const myTest = mentorTestQuery();
  const [test, setTest] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setTest(myTest.data);
  }, [myTest]);

  const filteredTests = test?.filter((item) =>
    item.subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
  
      
        <div className="base-container py-[5vh]">

          <h1 className="text-3xl font-merri my-5">Your Created Tests</h1>

          <Searchbox text="Search Subjects" searchQuery={searchQuery} 
                 setSearchQuery={setSearchQuery}/>
          <hr className="gap-10"/>
         {/*  <input
            type="text"
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 rounded-lg border border-gray-300"
          /> */}

          <div className="my-5 gap-5 ">

                <div className="grid grid-cols-1 lg:grid-cols-5  gap-2 px-4 py-2 font-semibold bg-gray-300">
                  <div>Title</div>
                  <div>Subject</div>
                  <div>Description</div>
                  <div>Date</div>
                  <div>class</div>
                </div>

                  {filteredTests?.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 lg:grid-cols-5 gap-2 px-4 py-2 border-t border-gray-300"
                    >
                      <div>{item?.title || "dummy t1"}</div>
                      <div>{item?.description || "dummy t1"}</div>
                      <div>{item?.subject?.name || "dummy t1"}</div>
                      <div>
                        {new Date(item?.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </div>
                      <div>{item.class.name || "dummy t1"}</div>
                    </div>
                  ))}

          </div>

        </div>
    
  );
}

export default Mentortest;
