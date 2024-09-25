import React, { useEffect, useState } from "react";
import Leftbar from "../Leftbar";
import { getTestsQuery } from "../../api/test";
import Error from "../Error";
import Loading from "../Loading";
import Searchbox from "../SearchBox";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Test = () => {
  const { data } = getTestsQuery();
  const { isLoading, isError } = getTestsQuery();
  const [test, setTest] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (data) {
      setTest(data);
    } else {
      setTest([]);
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
              {filteredTests.length > 0 ? (
                filteredTests?.map((item) => (
                  <tr>
                    <td>{"Physics"}</td>
                    <td>
                      {item.description == "abc"
                        ? "Vector Calculus"
                        : item.description}
                    </td>
                    <td>
                      {new Date(item?.createdAt).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </td>
                    <td>{item.owner.name}</td>
                    <td className="flex-row-center mx-auto text-lg">
                      <Link to={`/user/test/${item.id}`}>
                      <AiFillEye /></Link>
                    </td>
                  </tr>
                ))
              ) : (
                <h1 className="bg-green-100 text-center text-sm p-5">
                  no test found
                </h1>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
