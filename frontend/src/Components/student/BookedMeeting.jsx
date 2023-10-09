import React from "react";

function BookedMeeting({ notes, name, status }) {
  return (
    <div className="bg-green-100 m-10 w-96  p-5 rounded-md shadow-md transition ease-out hover:-translate-y-1">
      <div className="mb-4 font-merri text-md">
        <p className=" font-semibold">Mentor: {name}</p>
        <p
          className={` ${
            status === "Confirmed" ? "text-green-500" : "text-red-500"
          }`}
        >
          Status: {status}
        </p>
      </div>
      <div className="text-gray-700 font-comf">
        <p className="text-lg">{notes}</p>
      </div>
    </div>
  );
}

export default BookedMeeting;
