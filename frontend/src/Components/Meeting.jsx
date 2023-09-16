import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { getMentorsQuery, myRequestedMeetingsQuery } from "../api/meetings";
import MentorCard from "./MentorCard";
import BookedMeeting from "./BookedMeeting";

function Meeting() {
  const data = getMentorsQuery();
  const myrequestedmeetings = myRequestedMeetingsQuery();
  const [meetings, setMeetings] = useState([]);
  const [bookedmeetings, setbookmeetings] = useState([]);
  useEffect(() => {
    setMeetings(data?.data);
    setbookmeetings(myrequestedmeetings.data);
    console.log();
  }, [myrequestedmeetings]);
  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="w-1/4 h-screen">
        <Sidebar />
      </div>
      <div className="bg-gray-200 w-full  justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center font-semibold text-4xl my-10">
            Doubt Sessions
          </h1>
          <div className="bg-red-400 w-56 rounded-lg flex justify-center h-10 items-center">
            Book a 1:1 call
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="text-2xl font-bold px-10">Available Mentors</div>
          {meetings?.length > 0 ? (
            meetings?.map((meet) => (
              <MentorCard
                id={meet.id}
                phonenumber={meet.phonenumber}
                email={meet.email}
                name={meet.name}
              />
            ))
          ) : (
            <h1>no mentors found</h1>
          )}
        </div>
        <div className="text-2xl font-bold px-10">Booked calls</div>
        <div className="flex flex-wrap">
          {bookedmeetings?.length > 0 ? (
            bookedmeetings?.map((meeting) => (
              <BookedMeeting
                dates={meeting.dates}
                status={meeting.status}
                name={meeting.guest.name}
              />
            ))
          ) : (
            <h1>No booked meetings found</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Meeting;
