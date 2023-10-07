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
    <div className="base-container py-[5vh] ">
      {/* <div className="w-1/4 h-screen ">
        <Leftbar />
      </div> */}



          <h1 className="text-3xl font-merri">
            Doubt Sessions{"("}Book a 1:1 call{")"}
          </h1>
          

        <div className="primary-container ">
            <div className="text-center font-serif text-4xl">Available <span className="font-comf text-theme">Mentors</span></div>
            <hr className="my-5" />
            <div className="flex-row-center">
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
            <div className="text-center font-serif text-4xl mt-10 mb-5">Booked <span className="font-comf text-theme">Calls</span></div>
        <hr className="my-5" />
        <div className="flex-row-center">
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
        </div>
       
      </div>
  );
}

export default Meeting;
