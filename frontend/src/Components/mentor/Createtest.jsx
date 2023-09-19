import React, { useState } from "react";
import { createTest } from "../../api/test";
import { Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import Leftbar from "../Leftbar";
import { Link } from "react-router-dom";

function CreateTest() {
  const [testInfo, setTestInfo] = useState({
    title: "",
    description: "",
    subjectId: "",
    classId: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      [name]: value,
    }));
  };

  const createTestHandler = async () => {
    try {
      const response = await createTest(testInfo);
      console.log("Response:", response.success);
      if (response.success) {
        toast.success("Test created successfully");

        setTestInfo({
          title: "",
          description: "",
          subjectId: "",
          classId: "",
        });
      } else {
        toast.error("Failed to create test");
      }
    } catch (error) {
      console.error("Error creating test:", error);
      toast.error("Error creating test: " + error.message);
    }
  };

  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="hidden lg:block w-1/4 h-screen">
        <Leftbar />
      </div>
      <div className="bg-gray-100 w-full lg:w-3/4 p-5 justify-center items-center">
        <h1 className="text-2xl font-bold my-5">Create a Test</h1>
        <Link to="/my-Test">Get my Test</Link>
        <form>
          <TextField
            name="title"
            label="Test Name"
            value={testInfo.title}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={testInfo.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            name="subjectId"
            label="Subject"
            value={testInfo.subjectId}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="classId"
            label="Class"
            value={testInfo.classId}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            onClick={createTestHandler}
            variant="contained"
            color="primary"
          >
            Create Test
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateTest;
