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
    setTest(data);
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
    <div>
      <Error />
    </div>;
  }
  return (
    <div>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="base-container py-[5vh]">
          <h1 className="font-merri text-3xl">Tests Available for You</h1>

          <Searchbox
            test="Search your test.."
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <hr className="my-5" />
          <div className="overflow-auto rounded-lg bg-green-100 text-center text-sm p-5 ">
            <table className="font-comf w-full">
              <tr className="font-mono">
                <th>Subject</th>
                <th>Description</th>
                <th>Date</th>
                <th>Created By</th>
                <th>Options</th>
              </tr>
              {filteredTests?.map((item) => (
                <tr>
                  <td>{item.subject.name}</td>
                  <td>{item.description}</td>
                  <td>
                    {new Date(item?.createdAt).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </td>
                  <td>{item.owner.name}</td>
                  <td className="flex-row-center mx-auto text-lg">
                    <AiFillEye />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;

{
  /* <div className="overflow-auto rounded-lg bg-gray-200">
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
