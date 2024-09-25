import React, { useState } from "react";
import { createTest } from "../../api/test";
import { Button, TextField, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';

function CreateTest() {
  const [testInfo, setTestInfo] = useState({
    title: "",
    description: "",
    subjectname: "",
    classname: "",
  });
  
  const [questions, setQuestions] = useState([
    
  ]);

  const [newQuestion, setNewQuestion] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      [name]: value,
    }));
  };

  const handleQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions([...questions, { question: newQuestion }]);
      setNewQuestion("");
    }
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const createTestHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await createTest({ ...testInfo, questions });

      if (response.success) {
        toast.success("Test created successfully");

        setTestInfo({
          title: "",
          description: "",
          subjectname: "",
          classname: "",
        });
        setQuestions([]);
      } else {
        toast.error("Failed to create test");
      }
    } catch (error) {
      console.error("Error creating test:", error);
      toast.error("Error creating test: " + error.message);
    }
  };

  return (
    <div className="base-container py-[5vh] ">
      <h1 className="text-3xl font-merri">Create a Test</h1>
      <div className="base-container py-[5vh] w-3/4">
        <form className="font-comf">
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

          {/* Questions Section */}
          <div className="questions-section my-4">
            <h3 className="text-xl mb-2">Questions</h3>
            {questions.map((q, index) => (
              <div key={index} className="flex items-center mb-2">
                <TextField
                  value={q.question}
                  disabled
                  fullWidth
                  margin="normal"
                />
                <IconButton onClick={() => deleteQuestion(index)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}

            <div className="flex items-center mt-4">
              <TextField
                name="newQuestion"
                label="New Question"
                value={newQuestion}
                onChange={handleQuestionChange}
                fullWidth
                margin="normal"
              />
              <Button
                onClick={addQuestion}
                variant="contained"
                color="primary"
                className="ml-2"
              >
                Add Question
              </Button>
            </div>
          </div>

          <Button onClick={createTestHandler} variant="contained" color="primary">
            Create Test
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateTest;
