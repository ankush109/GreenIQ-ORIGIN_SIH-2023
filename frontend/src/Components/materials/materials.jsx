import React, { useEffect, useState } from "react";
import { getSubjectsQuery } from "../../api/material";
import Leftbar from "../Leftbar";
import { useNavigate } from "react-router";
import Loading from "../Loading";

function Material() {
  const data = getSubjectsQuery();
  const navigate = useNavigate();
  const [subjects, setsubjects] = useState([]);
  useEffect(() => {
    if (data.isSuccess) {
      setsubjects(data.data);
    } else {
      setsubjects([]);
    }
  }, [data?.data]);
  return (
    <div className="">
      
      <div className="base-container py-[5vh]">
        <h2 className="text-3xl font-merri">Subjects for class 11</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
          {!data.isLoading ? (
            subjects?.map((course) => (
              <div
                onClick={() => {
                  navigate(`${user.role=="student"?'user':'mentor'}/material/${course.name}`);
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
            ))
          ) : (
            <>
              <Loading />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Material;
