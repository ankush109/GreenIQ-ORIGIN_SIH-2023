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

 
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

 
  const onMeetingLeave = () => {
    setMeetingId(null);
  };
const TOKEN= token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmNTdjNjAzMy1mMTZkLTQ2NzYtODdiZS01NmJhNWEzYjYxMTQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNzM3NzMyMiwiZXhwIjoxNzI3NDYzNzIyfQ.QNCN9F4x0FZ5h89Ml0MCrf_b3J1WsjVmaEn423Goa3s"
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
