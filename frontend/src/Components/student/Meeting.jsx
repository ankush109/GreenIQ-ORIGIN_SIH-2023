import React, { useEffect, useState } from "react";
import Leftbar from "../Leftbar"
import { getMentorsQuery, myRequestedMeetingsQuery } from "../../api/meetings";
import MentorCard from "../mentor/MentorCard";
import BookedMeeting from "./BookedMeeting";
import Loading from "../Loading";
import Error from "../Error";

function Meeting() {
  const data = getMentorsQuery();
  const myrequestedmeetings = myRequestedMeetingsQuery();
    const {  isLoading:Meetingloading, isError:Meetingerror } = myRequestedMeetingsQuery();
      const {  isLoading:Mentorloading, isError:Mentorerror } = myRequestedMeetingsQuery();
  const [meetings, setMeetings] = useState([]);
  const [bookedmeetings, setbookmeetings] = useState([]);
  useEffect(() => {
    setMeetings(data?.data);
    setbookmeetings(myrequestedmeetings.data);
  }, [myrequestedmeetings]);
  if(Meetingerror){
    return <div><Error/></div>
  }
  if(Mentorerror){
    return <div><Error/></div>
  }
  return (
    <div className="flex ">
      <div className="w-1/4 h-screen ">
        <Leftbar />
      </div>

      <div className="bg-gray-200 w-full  justify-center ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center font-semibold text-4xl my-10">
            Doubt Sessions
          </h1>
          <div className="bg-red-400 w-56 rounded-lg flex justify-center h-10 items-center text-white font-bold">
            Book a 1:1 call
          </div>
        </div>
        <div className="text-2xl font-bold px-10">Available Mentors</div>
        {
          Mentorloading?(<div><Loading/></div>
          ):(
             <div className="flex flex-wrap">
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
          )
        }
       
        <div className="text-2xl font-bold px-10">Booked calls</div>
        {
          Meetingloading?(
            <div><Loading/></div>
          ):(
            <div className="flex flex-wrap">
          {bookedmeetings?.length > 0 ? (
            bookedmeetings?.map((meeting) => (
              <BookedMeeting
                dates={meeting.dates}
                status={meeting.status}
                name={meeting.guest.name}
                notes={meeting.notes}
              />
            ))
          ) : (
            <h1>No booked meetings found</h1>
          )}
        </div>
          )
        }
        
      </div>
    </div>
  );
}

export default Meeting;
