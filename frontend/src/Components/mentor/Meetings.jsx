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
      <Searchbox/>
      <hr className="gap-10"/>
      <div className="my-5 gap-5 flex-col flex justify-center items-center">
        {meet?.length > 0 ? (
          meet?.map((meeting) => (
            <div
              key={meeting.id}
              className={`p-5 rounded-lg font-comf  w-5/6 ${meeting.status=="confirmed"?'bg-green-200':'bg-orange-100'} text-sm flex-row-between`}
            >
                <div className=" font-semibold gap-2">
                  <p>Student Name : {meeting.host.name}</p>
                  <p>Meeting ID: {meeting.id}</p>
                  <p>Status: {meeting.status}</p>

                </div>
              
                <div>
                  {meeting?.dates?.map((date, index) => (
                    <p key={index} className="mt-2">
                      Date: {format(new Date(date.date)," yyyy-MM-dd',' HH:mm")}
                    </p>
                  ))}
                </div>
              {meeting.status === "confirmed" ? 
                  <Button  style={{ marginTop: "12px", }}   variant="contained" color="error" > Cancel </Button> : 
                  <Button  onClick={() => {  confirmMeeting(meeting.id);  } } style={{ marginTop: "12px",  }} variant="contained" >  Accept </Button>
              }
            </div>
            ))):
                <h1>No meetings found</h1>
          }
        </div>
      
    </div>)}
    </>
  );
}

export default Meetings;
