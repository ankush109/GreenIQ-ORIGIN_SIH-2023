import React, { useState } from "react";

export function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState("");

  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };

  return (
    <div className="flex justify-center h-screen items-center bg-gray-300">
      <div className="bg-blue-900 p-10 rounded-lg shadow-lg text-white w-96">
        <h2 className="text-2xl mb-4 font-semibold text-center">Join Meeting</h2>
        <input
          type="text"
          className="w-full p-3 rounded-lg mb-4 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
        <div className="flex flex-col space-y-4">
          <button
            onClick={onClick}
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg shadow-md font-semibold transition-colors duration-300"
          >
            Join Meeting
          </button>

          <button
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-md font-semibold transition-colors duration-300"
          >
            Create Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
