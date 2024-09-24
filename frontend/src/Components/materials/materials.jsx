import React, { useEffect, useState } from "react";
import { getSubjectsQuery } from "../../api/material";
import Leftbar from "../Leftbar";
import { useNavigate } from "react-router";
import Loading from "../Loading";
import geo from "../../assets/geo.jpg";
import history from "../../assets/history.jpg";
import maths from "../../assets/maths.jpg";
import phy from "../../assets/physics.jpg";
import chemistry from "../../assets/chemistry.jpg";

function Material() {
  const data = getSubjectsQuery();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (data.isSuccess) {
      console.log(data.data);
      // Filter out the "Physics" subject from the data if it exists

      setSubjects(data.data); // Reverse the array here
    }
  }, [data?.data]);

  const cardStyle = {
    height: "320px",
  };

  return (
    <div className="">
      <div className="base-container py-[5vh]">
        <h2 className="text-3xl font-merri">Subjects for Class 11</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
          {subjects.length > 0 ? (
            subjects.map((course, index) => (
              <div
                onClick={() => {
                  navigate(`/user/material/${course.name}`);
                }}
                key={course.id}
                className="border rounded-lg shadow-lg bg-white p-4"
                style={cardStyle}
              >
                <img
                  src="https://qph.cf2.quoracdn.net/main-qimg-9e96b92ec2e1d42f8cb5378f9c7540c7-pjlq"
                  alt={course.name}
                  className="w-[400px] h-[250px]"
                />
                <h3 className="text-xl font-semibold text-center m-2">
                  {course.name.toUpperCase()}
                </h3>
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
