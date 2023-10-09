import React from "react";

const LeadersList = () => {
  const leaders = [
    {
      name: "Ankush ",
      marks: 2195,
      subject: "Math",
      remarks: "Excellent",
    },
    {
      name: "Souvik ",
      marks: 1998,
      subject: "Science",
      remarks: "Very Good",
    },
    { name: "Kaushan ", marks: 1871, subject: "History", remarks: "Great" },
    { name: "Anuvab", marks: 1500, subject: "History", remarks: "Great" },
    { name: "Debanjan", marks: 1230, subject: "History", remarks: "Great" },
    { name: "Bristi", marks: 1069, subject: "History", remarks: "Great" },
    // Add more leader data as needed
  ];

  return (
    <div className="bg-gray-100 p-4 m-6">
      <h2 className="text-2xl font-bold mb-4">Top Scorers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Ratings</th>
              <th className="px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-4 py-2">{leader.name}</td>
                <td className="border px-4 py-2">{leader.marks}</td>

                <td className="border px-4 py-2">{leader.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadersList;
