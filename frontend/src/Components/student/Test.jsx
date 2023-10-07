import React, { useEffect, useState } from "react";
import Leftbar from "../Leftbar";
import { getTestsQuery } from "../../api/test";
import Error from "../Error";
import Loading from "../Loading";
import Searchbox from "../SearchBox";
import { AiFillEye } from "react-icons/ai";

const Test = () => {
  const { data } = getTestsQuery();
  const { isLoading, isError } = getTestsQuery();
  const [test, setTest] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("????????????????///",myTest)
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
  if (isError) {
    <div>
      <Error />
    </div>;
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* <div className="w-1/4 h-screen">
          <Leftbar />
        </div> */}
        <div className="w-full lg:w-3/4">
          <div className="px-4 py-6">
            <h1 className="text-4xl font-bold mb-6">Tests Available for You</h1>
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 mb-4 rounded-lg border border-gray-300"
            />
            <div className="overflow-auto rounded-lg bg-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 px-4 py-2 font-semibold bg-gray-300">
                <div>Subject</div>
                <div>Description</div>
                <div>Title</div>
                <div>Subject</div>
                <div>Created by</div>
              </div>
             
              {filteredTests?.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 lg:grid-cols-5 gap-2 px-4 py-2 border-t border-gray-300"
                >
                  <div>{item.description}</div>
                  <div>{item.title || "dummy t1"}</div>
                  <div>{item.subject.name}</div>
                  <div>{item.owner.name}</div>
                  <div>
                    {new Date(item.createdAt).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </div>
                </div>
              ))}
            </div>
              )
 */
}
