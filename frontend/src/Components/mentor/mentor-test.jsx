import React, { useEffect, useState } from "react";
import Leftbar from "../Leftbar";
import { AiFillEye } from "react-icons/ai";

import { mentorTestQuery } from "../../api/test";
import Searchbox from "../Searchbox";

function Mentortest() {
  const { data, isLoading, isError } = mentorTestQuery();

  const [test, setTest] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (data) {
      setTest(data);
    }
  }, [data]);
  const filteredTests = test?.filter((item) =>
    item.subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (isError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <div>
      {/* <div className="hidden lg:block w-1/4 h-screen">
        <Leftbar />
      </div> */}
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="base-container py-[5vh]">
          <h1 className="text-3xl font-merri">Your Created Tests</h1>
          <Searchbox
            text="Search for the test..."
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <hr className="my-5" />
          <div className="overflow-auto rounded-lg bg-green-100 text-center text-sm p-5">
            <table className="font-comf">
              <tr className="font-mono">
                <th>Subject</th>
                <th>Description</th>
                <th>Date</th>
                <th>Class</th>
                <th>Options</th>
              </tr>
              {filteredTests?.map((item) => (
                <tr>
                  <td>
                    {item?.subject?.name ? item?.subject?.name : "Physics"}
                  </td>
                  <td>
                    {item?.description ? item?.description : "test on heat"}
                  </td>
                  <td>
                    {new Date(item?.createdAt).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </td>
                  <td>{item.class.name}</td>
                  <td className="flex-row-center mx-auto text-lg">
                    <AiFillEye />
                  </td>
                </tr>
              ))}
            </table>
            {/* <div className="grid grid-cols-1 lg:grid-cols-5  gap-2 px-4 py-2 font-semibold bg-gray-300">
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
      )}
    </div>
  );
}

export default Mentortest;
