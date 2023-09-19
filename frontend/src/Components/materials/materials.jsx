import React, { useEffect, useState } from "react";
import { getSubjectsQuery } from "../../api/material";
import Leftbar from "../Leftbar";
import { useNavigate } from "react-router";

function Material() {
  const data = getSubjectsQuery();
  const navigate = useNavigate();
  const [subjects, setsubjects] = useState([]);
  useEffect(() => {
    setsubjects(data.data);
  }, [data?.data]);
  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="w-1/4 h-screen">
        <Leftbar />
      </div>
      <div className="p-4 w-3/4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">subjects for class 11</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects?.map((course) => (
            <div
              onClick={() => {
                navigate(`/user/material/${course.name}`);
              }}
              key={course.id}
              className="border rounded-lg shadow-lg bg-white p-4"
            >
              <img
                src={
                  "https://images.theconversation.com/files/191827/original/file-20171025-25516-g7rtyl.jpg?ixlib=rb-1.1.0&rect=0%2C70%2C7875%2C5667&q=45&auto=format&w=926&fit=clip"
                }
                alt={course.name}
                className="w-full h-auto mb-2"
              />
              <h3 className="text-xl font-semibold">{course.name}</h3>
              <p className="text-gray-600">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Material;
