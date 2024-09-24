import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function MentorCard({ id, name, phonenumber, email }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 ">
    
        <div className="flex flex-col">
          <div className="font-semibold">Name</div>
          {name}
        </div>
        <p >
          <div className="font-semibold">
            Phone Number
          </div>
           {phonenumber}</p>
        <p >
          <div className="font-semibold">
            Email</div> {email}</p>
  
      <div className="px-6 py-4 flex justify-center">
          <Button
          variant="contained"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold  rounded-full"
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
