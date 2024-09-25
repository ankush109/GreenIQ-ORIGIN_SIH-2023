//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmNTdjNjAzMy1mMTZkLTQ2NzYtODdiZS01NmJhNWEzYjYxMTQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sInZlcnNpb24iOjIsInJvb21JZCI6IjJreXYtZ3pheS02NHBnIiwicGFydGljaXBhbnRJZCI6Imx4dmRwbHd0Iiwicm9sZXMiOlsiY3Jhd2xlciIsInJ0YyJdLCJpYXQiOjE3MjcyOTM2MTQsImV4cCI6MTcyNzMwMDgxNH0.tflLUJNl_Vrj3NuYddY7_p88_DrSkReNMDTVxxagyVU";

// API call to create a meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};
