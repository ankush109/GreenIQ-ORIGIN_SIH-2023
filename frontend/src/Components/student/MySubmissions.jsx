import React from "react";
import { getSubmissionQuery } from "../../api/user";

function MySubmissions() {
  const { data: submissionData, isLoading } = getSubmissionQuery();

  const formatter = (data) => {
    return new Date(data).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
        <div className="text-3xl font-semibold m-2">All your Test Submissions</div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="p-2 border border-gray-300 ">Name</th>
            <th className="p-2 border border-gray-300 ">Status</th>
               <th className="p-2 border border-gray-300 ">Start Time</th>
            <th className="p-2 border border-gray-300 ">Completed Time</th>
            <th className="p-2 border border-gray-300 ">Score</th>
         
          </tr>
        </thead>
        <tbody>
          {submissionData.map((submission, index) => (
            submission.status === "completed" && (
              <tr
                key={index}
                className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition duration-200"
              >
                <td className="p-2 border border-gray-300">{submission.test.title}</td>
                <td className="p-2 border border-gray-300 text-green-600 font-semibold">
                  {submission.status}
                </td>
                    <td className="p-2 border border-gray-300">{formatter(submission?.startedAt)}</td>
                <td className="p-2 border border-gray-300">{formatter(submission?.completedAt)}</td>
               <td className="p-2 border border-gray-300">{submission.score? submission.score : "Not Yet Checked"}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MySubmissions;
