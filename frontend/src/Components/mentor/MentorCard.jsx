import React from "react";
import { Button } from "@mui/material";
import * as Dialog from "@radix-ui/react-dialog";
import { DialogActions, TextField, TextareaAutosize } from "@mui/material";
import DateTime from "../DateTime";
import { useNavigate } from "react-router";
import ConfirmBooking from "./ConfirmBooking";

function MentorCard({ id, name, phonenumber, email }) {
  const navigate = useNavigate();
  return (
    <div className="bg-stone-300 m-10 w-96 p-5 h-full flex flex-col justify-center items-baseline rounded-md shadow-lg">
      <h1 className="text-lg font-bold mb-2">Name: {name}</h1>
      <div className="mb-2">Phone Number: {phonenumber}</div>
      <div className="mb-4">Email: {email}</div>

      <Button
        variant="contained"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          navigate(`/user/confirm-booking/${id}`);
        }}
      >
        Book a Call
      </Button>
    </div>
  );
}

export default MentorCard;
