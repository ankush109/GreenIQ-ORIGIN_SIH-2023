import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DateTime from "./DateTime";
import { useNavigate, useParams } from "react-router";
import { bookMeeting } from "../api/meetings";
import { Button, Input } from "@mui/material";
import toast from "react-hot-toast";

function ConfirmBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDates, setSelectedDates] = useState([]);
  const [notes, setNotes] = useState("");
  const bookmeeting = async () => {
    const meetingInfo = {
      dates: selectedDates,
      guestId: id,
      notes: notes,
    };
    if (notes.length < 10) {
      toast.error("please enter more than 10 words ");
    }
    if (selectedDates.length > 0 && notes.length > 10) {
      const res = await bookMeeting(meetingInfo);

      if (res.success) {
        toast.success("meeting request");
        navigate("/book-meeting");
      }
    } else {
      toast.error("please fill all the fields");
    }
  };
  const handleChildData = (dateTimeArray) => {
    setSelectedDates(dateTimeArray);
  };

  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="w-1/4 h-screen">
        <Sidebar />
      </div>
      <div className="bg-gray-200 w-full p-5  justify-center items-center">
        <h1 className="text-2xl font-bold my-5 ">Please give the dates </h1>
        <DateTime onData={handleChildData} />
        <div className="my-10">
          <h1 className="font-bold my-4">You need guidance in </h1>
          <textarea
            className="w-1/2 h-32 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter text here"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
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
