import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DateTime from "./DateTime";
import { useNavigate, useParams } from "react-router";
import { bookMeeting } from "../api/meetings";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
function ConfirmBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDates, setSelectedDates] = useState([]);
  const bookmeeting = async () => {
    const meetingInfo = {
      dates: selectedDates,
      guestId: id,
    };
    const res = await bookMeeting(meetingInfo);
    console.log(res.success);
    if (res.success) {
      toast.success("meeting request");
      navigate("/book-meeting");
    }
  };
  const handleChildData = (dateTimeArray) => {
    setSelectedDates(dateTimeArray);
    console.log(selectedDates);
  };

  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="w-1/4 h-screen">
        <Sidebar />
      </div>
      <div className="bg-gray-200 w-full p-5  justify-center items-center">
        <h1 className="text-2xl font-bold my-5 ">Please give the dates </h1>
        <DateTime onData={handleChildData} />
        <Button
          onClick={() => {
            bookmeeting();
          }}
          variant="contained"
        >
          Confirm Meeting
        </Button>
      </div>
    </div>
  );
}

export default ConfirmBooking;
