import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getSubmissionDetails, scoreTestAttempt } from "../../api/test"; // Adjust the path as needed
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import toast from "react-hot-toast";

function SubmissionDetails() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState("");
  const getter = async () => {
    try {
      const data = await getSubmissionDetails(id);
      console.log(data, "data");
      setDetails(data.message);
    } catch (error) {
      console.error("Error fetching submission details:", error);
      toast.error("Failed to load submission details");
    } finally {
      setLoading(false);
    }
  };

  const scoreTest = async () => {
    try {
      const data = await scoreTestAttempt(id, score);
      toast.success("Score submitted successfully.");
      navigate(`/mentor/submission/${details[0]?.attempt?.test?.id}`);
    } catch (err) {
      console.log(err, "err");
      toast.error("Failed to submit score.");
    }
  };

  useEffect(() => {
    getter();
  }, []);

  return (
    <div className=" p-5">
      <h1 className="text-3xl font-merri mb-5">Submission Details</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="details-container space-y-4">
          {details.length > 0 ? (
            details.map((item) => (
              <Card
                key={item.id}
                className="mb-4 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    className="font-semibold"
                  >
                    {item.question.question}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    className="mt-2"
                  >
                    <strong>Answer:</strong>{" "}
                    {item.answer || "No answer provided"}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    className="mt-1"
                  >
                    <strong>Submitted At:</strong>{" "}
                    {new Date(item.submittedAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No details found for this submission.
            </Typography>
          )}
          <div className="mt-6">
            <TextField
              label="Score"
              variant="outlined"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full md:w-1/3"
              type="number"
              inputProps={{ min: 0 }}
              size="small"
            />
            <div
              className="bg-blue-600 w-[200px] cursor-pointer p-2 text-white mt-2 rounded-lg"
              onClick={scoreTest}
            >
              Submit Score
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmissionDetails;
