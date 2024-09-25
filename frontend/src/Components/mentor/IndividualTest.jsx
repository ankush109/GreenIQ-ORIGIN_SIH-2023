import React, { useEffect, useState } from 'react';
import { getSubmissionsByTestId } from '../../api/test'; // Assuming the function is exported from this path
import { useParams } from 'react-router';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function IndividualTest() {
  const { testId } = useParams();
  const [submissions, setSubmissions] = useState([]);

  const getSubmissions = async () => {
    try {
      const data = await getSubmissionsByTestId(testId);
      console.log(data, 'Data...');
      setSubmissions(data.message);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <div className="py-[5vh] w-3/4 mx-auto">
      <h1 className="text-3xl font-merri mb-5">Test Submissions</h1>
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
                    {format(new Date(submission.startedAt), 'PPpp')}
                  </TableCell>
                  <TableCell>
                    {format(new Date(submission.completedAt), 'PPpp')}
                  </TableCell>
                  <TableCell>{submission.status}</TableCell>
                  <TableCell>
                    {submission.score !== null ? submission.score : 'N/A'}
                  </TableCell>
                    <TableCell>
                   <Link to={`/mentor/submission-details/${submission.id}`}>Show Details</Link>
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
    </div>
  );
}

export default IndividualTest;
