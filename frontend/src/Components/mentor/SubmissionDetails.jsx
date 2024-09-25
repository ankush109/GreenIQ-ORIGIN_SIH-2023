import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSubmissionDetails } from '../../api/test'; // Adjust the path as needed
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';

function SubmissionDetails() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getter = async () => {
    try {
      const data = await getSubmissionDetails(id);
      console.log(data, 'data');
      setDetails(data.message);
    } catch (error) {
      console.error('Error fetching submission details:', error);
      toast.error('Failed to load submission details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getter();
  }, []);

  return (
    <div className="py-[5vh] w-3/4 mx-auto">
      <h1 className="text-3xl font-merri mb-5">Submission Details</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="details-container">
          {details.length > 0 ? (
            details.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.question.question}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" className="mt-2">
                    <strong>Answer:</strong> {item.answer || 'No answer provided'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" className="mt-1">
                    <strong>Submitted At:</strong> {new Date(item.submittedAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No details found for this submission.
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}

export default SubmissionDetails;
