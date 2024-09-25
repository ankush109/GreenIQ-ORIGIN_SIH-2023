import React, { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import toast from "react-hot-toast";
function DateTime({ onData }) {
  const [selectedDates, setSelectedDates] = useState([]);
  const [dateVal, setdateVal] = useState("");
  const handleDateChange = (newDate) => {
    const dateValue = newDate.$d;
    setdateVal(dateValue);
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const deleteDate = (date) => {
    console.log(date,"d")
    const updatedlist = selectedDates.filter((time) => {
      time !== date;
    });
    setSelectedDates(updatedlist);
  };
  const addDates = () => {
    if (selectedDates.length == 3) {
      toast.error("You can choose only 3 dates ");
    }
    let present = false;

    selectedDates.forEach((date) => {
      if (date === dateVal.toISOString()) {
        present = true;
      }
    });
    if (present) {
      toast.error("Date already added choose a different date");
    }
    if (!present) {
      setSelectedDates([...selectedDates, dateVal.toISOString()]);
    }
  };

  useEffect(() => {
    onData(selectedDates);
  }, [selectedDates, onData]);

  return (
    <div>
      <DateTimePicker
        label="Select a date"
        onChange={(newDate) => handleDateChange(newDate)}
      />
      <Button
        onClick={() => {
          addDates();
        }}
        style={{
          margin: "10px",
        }}
        variant="contained"
      >
        Select this date
      </Button>
      <Button
        onClick={() => {
          setSelectedDates([]);

          setdateVal(" ");
        }}
        style={{
          color: "red",
        }}
        variant="outlined"
      >
        reset
      </Button>
      <div className="">
        <h2 className="text-xl font-bold my-2 ">Selected Dates :</h2>
        <ul className="flex gap-5">
          {selectedDates?.map((date, index) => (
            <div
              className="flex w-80 text-sm justify-between bg-green-300 p-5 rounded-lg my-4"
              key={index}
            >
              <div>{new Date(date).toLocaleDateString("en-US", options)}</div>
              <div
                onClick={() => {
                  deleteDate(date);
                }}
              >
                <DeleteIcon color="red" />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DateTime;
