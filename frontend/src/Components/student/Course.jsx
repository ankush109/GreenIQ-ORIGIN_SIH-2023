import { getCoursesQuery } from "../../api/course";
import Error from "../Error";
import Leftbar from "../Leftbar";
import Loading from "../Loading";
import Searchbox from "../SearchBox";
import React, { useState } from "react";

function Courses() {
  const { data, isLoading, isError } = getCoursesQuery("11");
  const [searchQuery, setSearchQuery] = useState("");

  if (isError) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  if (data && data.length === 0) {
    return (
      <div className="max-w-screen max-h-screen flex overflow-hidden">
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div className="p-4   overflow-y-auto">Courses not found.</div>
        )}
      </div>
    );
  }

  return (
    <div>
      {/*  <div className="w-1/4 h-screen">
        <Leftbar />
      </div> */}
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="base-container py-[5vh] ">
          <h2 className="text-3xl font-merri mb-5">Courses for Class 11</h2>
          <Searchbox
            text="Search"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <hr className="my-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.map((course) => (
              <div
                key={course.id}
                className="bg-green-200  flex  bg-cover items-center justify-center bg-no-repeat w-[250px] h-[180px] rounded-lg  group cursor-pointer shadow-lg"
                style={{ backgroundImage: `url(${course.img})` }}
              >
                {/* <img
                    src={course.img}
                    alt={course.name}
                    className="w-full h-auto mb-2"
                  /> */}

                <div className="group-hover:opacity-80 opacity-0 bg-theme text-center flex-col-center w-full h-full rounded-lg p-5 font-comf">
                  <h1 className="text-primary text-3xl font-merri">
                    {course.name}
                  </h1>
                  <p className="text-white">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
