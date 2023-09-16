import React from "react";

function BookedMeeting({ name, status }) {
  return (
    <div className=" bg-stone-300  m-10 w-96 p-5 h-full flex  flex-col justify-center items-baseline rounded-md">
      <div>Name of the mentor : {name}</div>
      <div>Status : {status}</div>
    </div>
  );
}

export default BookedMeeting;
