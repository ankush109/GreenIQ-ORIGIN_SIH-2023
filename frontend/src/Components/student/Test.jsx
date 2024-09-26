import React, { useEffect, useState } from "react";
import { getTestsQuery } from "../../api/test";
import Error from "../Error";
import Loading from "../Loading";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GetUserQuery } from "../../api/user";
import { Check, ChecklistOutlined } from "@mui/icons-material";

const Test = () => {
  const { data } = getTestsQuery();
  const { data: userdata } = GetUserQuery();
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

  const formatter = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderSuccess = (testId) => {
    const isSubmitted = userdata?.TestAttempt?.some((x) => x.testId === testId);
    return isSubmitted;
  };

  if (isError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {isLoading ? (
        <div className="text-center py-4">
          <Loading />
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-semibold mb-4">Tests Available for You</h1>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border border-gray-300">Subject</th>
                <th className="p-2 border border-gray-300">Description</th>
                <th className="p-2 border border-gray-300">Date</th>
                <th className="p-2 border border-gray-300">Created By</th>
                <th className="p-2 border border-gray-300">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.length > 0 ? (
                filteredTests.map((item) => (
                  <tr
                    key={item.id}
                    className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition duration-200"
                  >
                    <td className="p-2 border border-gray-300">
                      {item.subject.name || "Physics"}
                    </td>
                    <td className="p-2 border border-gray-300 text-left">
                      {item.description === "abc"
                        ? "Vector Calculus"
                        : item.description}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {formatter(item.createdAt)}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.owner.name}
                    </td>
                    <td className="p-2 border border-gray-300 text-lg">
                      {renderSuccess(item.id) ? (
                        <span className="text-green-600 font-semibold">
                          <Check/>
                        </span>
                      ) : (
                        <Link to={`/user/test/${item.id}`}>
                          <AiFillEye className="inline-block" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="bg-green-100 text-center p-5">
                    No test found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Test;
