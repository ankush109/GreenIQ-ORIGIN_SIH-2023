import { getCoursesQuery } from "../../api/course";
import Leftbar from "../Leftbar";

function Courses() {
  const { data, isLoading, isError } = getCoursesQuery("11");

  if (isLoading) {
    return <div className="p-4 bg-gray-200">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-500 text-white">Error loading courses.</div>
    );
  }

  // Check if data is empty
  if (data && data.length === 0) {
    return (
      <div className="max-w-screen max-h-screen flex overflow-hidden">
        <div className="w-1/4 h-screen">
          <Leftbar />
        </div>
        <div className="p-4   overflow-y-auto">Courses not found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="w-1/4 h-screen">
        <Leftbar />
      </div>
      <div className="p-4 w-3/4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Courses for class 11</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg shadow-lg bg-white p-4"
            >
              <img
                src={course.img}
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

export default Courses;
