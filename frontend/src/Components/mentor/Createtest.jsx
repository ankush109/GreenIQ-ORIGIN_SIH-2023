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
    subjectname: "",
    classname: "",
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

      if (response.success) {
        toast.success("Test created successfully");

        setTestInfo({
          title: "",
          description: "",
          subjectname: "",
          classname: "",
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
        <Link to="/mentor/my-Test">
          <Button variant="contained" color="primary">
            Get mentor's Test
          </Button>
        </Link>
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
            name="subjectname"
            label="Subject"
            value={testInfo.subjectname}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="classname"
            label="Class"
            value={testInfo.classname}
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
