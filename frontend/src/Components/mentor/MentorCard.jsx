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
    <div className="flex-row-between w-full bg-green-200 rounded-lg text-sm font-comf px-5 py-3">
      <div className="gap-3">
        <p>Name: {name}</p>
        <p>Phone Number: {phonenumber}</p>
        <p>Email: {email}</p>
        
      </div>
      <div className="">
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
    </div>
  );
}

export default MentorCard;
