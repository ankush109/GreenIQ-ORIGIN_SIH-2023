import React, { useEffect, useState } from "react";
import Leftbar from "../Leftbar";
import { getMentorsQuery, myRequestedMeetingsQuery } from "../../api/meetings";
import MentorCard from "../mentor/MentorCard";
import BookedMeeting from "./BookedMeeting";
import Loading from "../Loading";
import Error from "../Error";
import { Badge } from "../../Components/ui/badge";
function PersonalBookings() {
  const data = getMentorsQuery();
  const myrequestedmeetings = myRequestedMeetingsQuery();
  const { isLoading: MeetingLoading, isError: MeetingError } =
    myRequestedMeetingsQuery();
  const { isLoading: MentorLoading, isError: MentorError } = getMentorsQuery();
  const [meetings, setMeetings] = useState([]);
  const [bookedmeetings, setbookmeetings] = useState([]);

  useEffect(() => {
    if (!MeetingLoading && !MentorLoading) {
      setMeetings(data?.data);
      setbookmeetings(myrequestedmeetings?.data);
    }
  }, [myrequestedmeetings, MeetingLoading, MentorLoading, data]);

  if (MeetingError || MentorError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (MeetingLoading || MentorLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className=" font-serif text-4xl mt-10 mb-5">
        Booked <span className="font-comf text-theme">Calls</span>
      </div>
      <hr className="m-5 " />
      {bookedmeetings?.length > 0 ? (
        bookedmeetings?.map((meeting) => (
          <div key={meeting?.id} className="grid grid-cols-4 gap-10">
            <div className="flex flex-col">
              <div className="font-semibold">Date</div>
              <p>
                {meeting?.dates.map((x) => {
                  const formattedDate = new Date(x.date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  );
                  return (
                    <Badge variant="outline" className="bg-gray-600 text-white">
                      {formattedDate}
                    </Badge>
                  );
                })}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="font-semibold">Status</div>

              {meeting.status == "requested" ? (
                <Badge
                  variant="outline"
                  className="bg-red-600 w-1/3 p-2 flex items-center text-white"
                >
                  {meeting.status}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-green-600 w-1/3 p-2 flex items-center text-white"
                >
                  {meeting.status}
                </Badge>
              )}
            </div>

            <div className="flex flex-col">
              <div className="font-semibold">Guest Name</div>
              <p className="text-lg">{meeting.guest.name}</p>
            </div>

            <div className="flex flex-col">
              <div className="font-semibold">Notes</div>
              <p>{meeting.notes}</p>
            </div>
          </div>
        ))
      ) : (
        <h1 className="col-span-4 text-center">No booked meetings found</h1>
      )}
    </div>
  );
}

export default PersonalBookings;
