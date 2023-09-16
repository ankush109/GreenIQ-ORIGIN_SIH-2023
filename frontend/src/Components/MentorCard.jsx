import React from "react";
import { Button } from "@mui/material";
import * as Dialog from "@radix-ui/react-dialog";
import { DialogActions, TextField, TextareaAutosize } from "@mui/material";
import DateTime from "./DateTime";
import { useNavigate } from "react-router";
import ConfirmBooking from "./ConfirmBooking";
function MentorCard({ id, name, phonenumber, email }) {
  const navigate = useNavigate();
  return (
    <div className=" bg-stone-300  m-10 w-96 p-5 h-full flex  flex-col justify-center items-baseline rounded-md">
      <h1 className="text-lg font-bold">Name : {name}</h1>
      <div>Phonenumber : {phonenumber}</div>
      <div>email : {email}</div>

      <Button
        variant="filled"
        onClick={() => {
          navigate(`/confirm-booking/${id}`);
        }}
      >
        Book a call
      </Button>
    </div>
  );
}

export default MentorCard;
