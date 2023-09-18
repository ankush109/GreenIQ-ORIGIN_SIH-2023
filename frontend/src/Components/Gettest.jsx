
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTests, deleteTest } from "../api/test";

const Gettest = () => {
  const [tests, setTests] = useState([]);
  const [deletingTestId, setDeletingTestId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [filterError, setFilterError] = useState("");
  const [isQueryEnabled, setIsQueryEnabled] = useState(false); 

  const { data: testsResponse, error: testsError } = useQuery(
    ["getTests", subjectId, classId],
    () => getTests(subjectId, classId),
    {
      enabled: isQueryEnabled,
    }
  );

  useEffect(() => {
    if (testsResponse) {
      setTests(testsResponse.message);
    }

    if (testsError) {
      setTests([]);
      setFilterError("An error occurred while fetching tests: " + testsError.message);
    }
  }, [testsResponse, testsError]);

  const handleDeleteTest = async (testId) => {
    try {
      setDeletingTestId(testId);
      await deleteTest(testId);
      setTests((prevTests) => prevTests.filter((test) => test.id !== testId));
      setDeletingTestId(null);
      setDeleteError(null);
    } catch (error) {
      setDeleteError(error.message);
      setDeletingTestId(null);
    }
  };

  const handleFilterSubmit = () => {
    if (classId && subjectId) {
      setIsQueryEnabled(true); 
      setFilterError("");
    } else {
      setIsQueryEnabled(false); 
      setFilterError("Please enter both Class ID and Subject ID.");
      setTests([]); 
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Test List</h2>
      <div className="mb-4">
        <label htmlFor="classId" className="block text-sm font-medium text-gray-700">
          Class ID:
        </label>
        <input
          type="text"
          id="classId"
          name="classId"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700">
          Subject ID:
        </label>
        <input
          type="text"
          id="subjectId"
          name="subjectId"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={handleFilterSubmit}
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Apply Filters
      </button>
      {filterError && <div className="text-red-500 mt-2">{filterError}</div>}
      {tests.length === 0 && !filterError && (
        <div className="text-gray-500 mt-2">No tests found for the selected filters.</div>
      )}
      {tests.length > 0 && !filterError && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tests.map((test) => (
            <div key={test.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold">{test.name}</h3>
              <p className="text-gray-500">{test.description}</p>
              {deletingTestId === test.id ? (
                <div className="text-red-500 font-semibold mt-2">Deleting...</div>
              ) : (
                <button
                  onClick={() => handleDeleteTest(test.id)}
                  className="text-red-500 hover:underline mt-2"
                >
                  Delete
                </button>
              )}
              {deleteError && deletingTestId === test.id && (
                <div className="text-red-500 mt-2">{deleteError}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gettest;

