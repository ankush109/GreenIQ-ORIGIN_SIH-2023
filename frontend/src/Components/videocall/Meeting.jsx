// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../config/Api";
import ReactPlayer from "react-player";
import { JoinScreen } from "./JoinScreen";
import { MeetingView } from "./MeetingView";

export function Meet() {
  const [meetingId, setMeetingId] = useState(null);

  //Getting the meeting id by calling the api we just wrote
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
  };
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmNTdjNjAzMy1mMTZkLTQ2NzYtODdiZS01NmJhNWEzYjYxMTQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNzI5NTIyNywiZXhwIjoxNzI3MzgxNjI3fQ.580q7VZQGeObm6x2eEWEDV6ijE0erNDEUwws2sUiMi8"
  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId: "pwxs-zije-lu4v",
        micEnabled: true,
        webcamEnabled: true,
        name: "ANKUSH's Org",
      }}
      token={TOKEN}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default Meet;
