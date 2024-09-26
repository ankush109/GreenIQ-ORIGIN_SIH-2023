// @ts-nocheck
import React, { useEffect, useState } from "react";
import { getMentorsQuery, myRequestedMeetingsQuery } from "../../api/meetings";
import Loading from "../Loading";
import Error from "../Error";
import { Badge } from "../../Components/ui/badge";

function PersonalBookings() {
  const { data: mentorsData } = getMentorsQuery();
  const {
    data: myRequestedMeetings,
    isLoading,
    isError,
  } = myRequestedMeetingsQuery();
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    if (mentorsData && myRequestedMeetings) {
      setMeetings(myRequestedMeetings);
    }
  }, [mentorsData, myRequestedMeetings]);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-3xl font-semibold mb-5">
        Booked <span className="text-theme">Calls</span>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="p-2 border border-gray-300">Date</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Guest Name</th>
            <th className="p-2 border border-gray-300">Notes</th>
          </tr>
        </thead>
        <tbody>
          {meetings?.length > 0 ? (
            meetings.map((meeting) => (
              <tr
                key={meeting.id}
                className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition duration-200"
              >
                <td className="p-2 border border-gray-300 text-center">
                  {meeting?.dates.map((x) => (
                    <Badge
                      key={x.date}
                      variant="outline"
                      className="bg-gray-600 text-white mb-1 inline-block"
                    >
                      {formatDate(x.date)}
                    </Badge>
                  ))}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  {meeting.status === "requested" ? (
                    <Badge
                      variant="outline"
                      className="bg-red-600 p-2 text-white"
                    >
                      {meeting.status}
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-green-600 p-2 text-white"
                    >
                      {meeting.status}
                    </Badge>
                  )}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  {meeting.guest.name}
                </td>
                <td className="p-2 border border-gray-300">{meeting.notes}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="bg-green-100 text-center p-5 text-lg">
                No booked meetings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PersonalBookings;
