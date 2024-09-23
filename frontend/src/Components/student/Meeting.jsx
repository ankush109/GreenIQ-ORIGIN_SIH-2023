import React, { useEffect, useState } from "react";
import Leftbar from "../Leftbar";
import { getMentorsQuery, myRequestedMeetingsQuery } from "../../api/meetings";
import MentorCard from "../mentor/MentorCard";
import BookedMeeting from "./BookedMeeting";
import Loading from "../Loading";
import Error from "../Error";
import PersonalBookings from "./PersonalBookings";

function Meeting() {
  const data = getMentorsQuery();
  const myrequestedmeetings = myRequestedMeetingsQuery();
  const { isLoading: MeetingLoading, isError: MeetingError } =
    myRequestedMeetingsQuery();
  const { isLoading: MentorLoading, isError: MentorError } = getMentorsQuery();
  const [meetings, setMeetings] = useState([]);
  const [bookedmeetings, setbookmeetings] = useState([]);

  useEffect(() => {
    if (!MeetingLoading && !MentorLoading) {
      setMeetings(data?.data);
      setbookmeetings(myrequestedmeetings.data);
    }
  }, [myrequestedmeetings, MeetingLoading, MentorLoading]);

  if (MeetingError) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  if (MentorError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (MeetingLoading || MentorLoading) {
    return <Loading />;
  }

  return (
    <div className="">
   
     
      <div className=" ">
        <div className=" font-serif text-4xl m-5">
          Available <span className="font-comf text-theme">Mentors</span>
        </div>
        <hr className="my-5" />
        <div className="m-5">
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


      </div>
    </div>
  );
}

export default Meeting;
