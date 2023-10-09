import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function MentorCard({ id, name, phonenumber, email }) {
  const navigate = useNavigate();

  return (
    <div className="bg-lime-200 flex flex-col shadow-lg rounded-lg w-full h-[150px] items-center transition ease-in hover:-translate-y-1 ">
      <div className="px-5 py-2 font-comf gap-2 text-md ">
        <p className="">{name}</p>
        <p className="">Phone Number: {phonenumber}</p>
        <p className="">Email: {email}</p>
      </div>
      <div className="px-6 py-4 flex justify-center">
        <Button
          variant="contained"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
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
