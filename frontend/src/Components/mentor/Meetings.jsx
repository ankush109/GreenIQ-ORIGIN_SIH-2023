import React, { useEffect, useState } from "react";
import {
  getMentorMeetingsQuery,
  updateMeetingMentor,
} from "../../api/meetings";
import { format } from "date-fns";
import { Button } from "@mui/material";
import Error from "../Error";
import Loading from "../Loading";
import Leftbar from "../Leftbar";

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
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="hidden lg:block w-1/4 h-screen">
        <Leftbar />
      </div>
      {isLoading?(
        <div> <Loading/></div>
        ):(
      
      <><div className="text-2xl font-semibold mb-4 flex justify-center m-10 p-2">
            Your Meetings ({meet?.length})
          </div><div className="flex flex-wrap gap-10 mx-10">
              {meet?.length > 0 ? (
                meet?.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="bg-gray-200 p-6 border rounded-lg w-[500px]"
                  >
                    <div className="text-xl font-semibold">
                      Name of the student : {meeting.host.name}
                    </div>
                    <div className="text-gray-600 ">Meeting ID: {meeting.id}</div>
                    <div className="text-green-500 font-bold">
                      Status: {meeting.status}
                    </div>
                    <div>
                      {meeting?.dates?.map((date, index) => (
                        <p key={index} className="mt-2">
                          Date: {format(new Date(date.date), "MMMM dd, yyyy, h:mm a")}
                        </p>
                      ))}
                    </div>
                    {meeting.status === "confirmed" ? (
                      <Button
                        style={{
                          marginTop: "12px",
                        }}
                        variant="contained"
                        color="error"
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          confirmMeeting(meeting.id);
                        } }
                        style={{
                          marginTop: "12px",
                        }}
                        variant="contained"
                      >
                        Accept
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <h1>No meetings found</h1>
              )}
            </div></>
        )}
    </div>
  );
}

export default Meetings;
