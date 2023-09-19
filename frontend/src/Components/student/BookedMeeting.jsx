import React from "react";

function BookedMeeting({ notes, name, status }) {
  return (
    <div className="bg-stone-300 m-10 w-96 p-5 h-full flex flex-col justify-center items-baseline rounded-md shadow-lg">
      <div className="text-xl font-bold mb-3">Name of the mentor: {name}</div>
      <div className="text-lg text-green-500 font-semibold">
        Status: {status}
      </div>
      <h1>{notes}</h1>
    </div>
  );
}

export default BookedMeeting;
