import React, { useEffect, useState } from "react";
import {
  getMentorMeetingsQuery,
  updateMeetingMentor,
} from "../../api/meetings";
import { format } from "date-fns";
import { Button } from "@mui/material";
import Searchbox from "../SearchBox";
import Error from "../Error";
import Loading from "../Loading";
import { Badge } from "../ui/badge";

function Meetings() {
  const {  isLoading, isError } =  getMentorMeetingsQuery();

  const meetings = getMentorMeetingsQuery();
  const [status, setstatus] = useState("");
  const [meet, setmeet] = useState([]);
  const confirmMeeting = async (meetingId) => {
    await updateMeetingMentor(meetingId);
    await meetings.refetch();
  };
  useEffect(() => {
    setmeet(meetings?.data);
  }, [meetings.data]);
  if(isError){
    return <div><Error/></div>
  }

  return (
    <>
    {isLoading?(
      <div> <Loading/></div>
    ):(
    <div className="base-container py-[5vh] ">

      <div className="my-5 font-merri text-3xl ">
        Your Meetings ({meet?.length})
      </div>
      
      <hr className="gap-10"/>
      <div className="my-5 gap-5 flex-col flex justify-center items-center">
    <div className="w-full" >
  {meet?.length > 0 ? (
    meet?.map((meeting) => (
      <div
        key={meeting.id}
        className="grid grid-cols-4 gap-4 p-5 w-full items-center bg-gray-100 rounded-lg"
      >
        <div>
          <div className="font-semibold">Student Name</div>
          <p>{meeting.host.name}</p>
        </div>
        
        <div>
          <div className="font-semibold">Status</div>
          <p>{meeting.status}</p>
        </div>

        <div>
          <div className="font-semibold">Dates</div>
          {meeting?.dates?.map((date, index) => (
            <p key={index} className="mt-2">
              <Badge>{format(new Date(date.date), " yyyy-MM-dd',' HH:mm")}</Badge>
            </p>
          ))}
        </div>

        <div className="flex justify-end">
          {meeting.status === "confirmed" ? (
            <Button className="w-full" variant="contained" color="error">
              Cancel
            </Button>
          ) : (
            <Button
              onClick={() => {
                confirmMeeting(meeting.id);
              }}
              className="w-full"
              variant="contained"
            >
              Accept
            </Button>
          )}
        </div>
      </div>
    ))
  ) : (
    <h1>No meetings found</h1>
  )}
</div>

        </div>
      
    </div>)}
    </>
  );
}

export default Meetings;
