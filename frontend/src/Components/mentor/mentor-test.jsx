import React, { useEffect, useState } from "react";
import Leftbar from "../Leftbar";
import { mentorTestQuery } from "../../api/test";

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
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="hidden lg:block w-1/4 h-screen">
        <Leftbar />
      </div>
      <div className="w-full lg:w-3/4">
        <div className="px-4 py-6">
          <h1 className="text-4xl font-bold mb-6">Your Created Tests</h1>
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 rounded-lg border border-gray-300"
          />
          <div className="overflow-auto rounded-lg bg-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-4  gap-2 px-4 py-2 font-semibold bg-gray-300">
              <div>Subject</div>
              <div>Description</div>
              <div>Title</div>
              <div>Subject</div>
            </div>
            {filteredTests?.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-4 py-2 border-t border-gray-300"
              >
                <div>{item.description || "dummy t1"}</div>
                <div>{item.title || "dummy t1"}</div>
                <div>{item.subject.name || "dummy t1"}</div>

                <div>
                  {new Date(item.createdAt).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mentortest;
