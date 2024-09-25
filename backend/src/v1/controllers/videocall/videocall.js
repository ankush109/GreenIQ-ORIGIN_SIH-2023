import jwt from "jsonwebtoken";
const API_KEY = process.env.VIDEO_SDK_API_KEY;
const SECRET = process.env.VIDEO_SDK_SECRET;

const options = {
  expiresIn: "120m",
  algorithm: "HS256",
};

const payload = {
  apikey: API_KEY,
  permissions: ["allow_join"], // `ask_join` || `allow_mod`
  version: 2, // OPTIONAL
  roomId: "11", // OPTIONAL
  participantId: "lxvdplwt", // OPTIONAL
  roles: ["crawler", "rtc"], // OPTIONAL
};

const videoCallController = {
  async createToken(req, res, next) {
    try {
      // Check if the environment variables are set correctly
      if (!API_KEY || !SECRET) {
        throw new Error("API key or Secret is missing");
      }

      // Log payload and secret for debugging
      console.log("Payload:", payload);
      console.log("Secret:", SECRET);

      const token = jwt.sign(payload, SECRET, options);
      res.status(200).json({
        success: true,
        message: token,
      });
    } catch (err) {
      console.error("Failed to generate tokens", err);
      res.status(400).json({
        success: false,
        message: "Failed to generate token",
      });
    }
  },
  async createMeeting(req,res,next){

  }
};

export default videoCallController;
