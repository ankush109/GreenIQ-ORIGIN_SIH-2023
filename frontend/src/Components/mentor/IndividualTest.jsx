import React, { useEffect, useState } from "react";
import { getSubmissionsByTestId } from "../../api/test"; // Assuming the function is exported from this path
import { useParams } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Check, CheckCheck } from "lucide-react";
import Loading from "../Loading";

function IndividualTest() {
  const { testId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setloading] = useState(false);
  const getSubmissions = async () => {
    try {
      setloading(true);
      const data = await getSubmissionsByTestId(testId);
      console.log(data, "Data...");
      setSubmissions(data.message);
      setloading(false);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setloading(false);
    }
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-merri mb-5">Test Submissions</h1>
      {!loading ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Started At</TableCell>
                <TableCell>Completed At</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.length > 0 ? (
                submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.user.name}</TableCell>
                    <TableCell>
                      {format(new Date(submission.startedAt), "PPpp")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(submission.completedAt), "PPpp")}
                    </TableCell>
                    <TableCell>{submission.status}</TableCell>
                    <TableCell>
                      {submission.score !== null ? submission.score : "N/A"}
                    </TableCell>
                    <TableCell>
                      {!submission?.score ? (
                        <Link
                          to={`/mentor/submission-details/${submission.id}`}
                        >
                          Show Details
                        </Link>
                      ) : (
                        <CheckCheck />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No submissions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default IndividualTest;
