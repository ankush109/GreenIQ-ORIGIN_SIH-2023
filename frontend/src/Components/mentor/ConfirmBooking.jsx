import React, { useState } from "react";
import Leftbar from "../Leftbar";
import DateTime from "../DateTime";
import { useNavigate, useParams } from "react-router";
import { bookMeeting } from "../../api/meetings";
import { Button, TextareaAutosize } from "@mui/material";
import toast from "react-hot-toast";

function ConfirmBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDates, setSelectedDates] = useState([]);
  const [notes, setNotes] = useState("");

  const bookMeetingHandler = async () => {
    const meetingInfo = {
      dates: selectedDates,
      guestId: id,
      notes: notes,
    };

    if (notes.length < 10) {
      toast.error("Please enter more than 10 words.");
    } else if (selectedDates.length > 0 && notes.length >= 10) {
      const res = await bookMeeting(meetingInfo);

      if (res.success) {
        toast.success("Meeting request sent successfully.");
        navigate("/user/book-meeting");
      }
    } else {
      toast.error("Please fill all the fields.");
    }
  };

  const handleChildData = (dateTimeArray) => {
    setSelectedDates(dateTimeArray);
  };

  return (
    <div className="flex justify-center m-10 bg-gray-50">
      <div className=" w-full p-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold my-5">Please select the dates</h1>
        <DateTime onData={handleChildData} />
        <div className="my-10">
          <h1 className="font-bold my-4">Tell us more about your needs</h1>
          <textarea
            className="w-[400px] h-32 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter details here"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <Button
          onClick={() => {
            bookMeetingHandler();
          }}
          variant="contained"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Confirm Meeting
        </Button>
      </div>
    </div>
  );
}

export default ConfirmBooking;
