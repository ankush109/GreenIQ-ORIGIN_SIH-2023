import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import createError from "http-errors";
import morgan from "morgan";
import path from "path";

import favicon from "serve-favicon";
import  { Server }from 'socket.io';
import "./v1/config/env.config";

import { authRoutes, userRoute } from "./v1/routes";
// New
import OpenAI from "openai";

import { PrismaClient } from "@prisma/client";
import { app, server } from "./socket";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: createError.TooManyRequests().status,
    message: createError.TooManyRequests().message,
  },
});
const prisma = new PrismaClient();
async function sendMessage(senderId, receiverId, message) {
  const chatMessage = await prisma.chat.create({
    data: {
      senderId,
      receiverId,
      message,
    },
  });
  return chatMessage;
}
const corsOptions = {
  origin: ["http://localhost:3000", "https://green-iq-deployed.vercel.app"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};


app.use(cors(corsOptions));
// Global variable appRoot with base dirname
global.appRoot = path.resolve(__dirname);

// Middlewares
app.use(helmet());
app.set("trust proxy", 1);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Welcome Route
app.all("/", (req, res, next) => {
  res.send({ message: "API is Up and Running on render 😎🚀" });
});

const apiVersion = "v1";

// Routes
app.use(`/${apiVersion}/auth`, authRoutes);
app.use(`/${apiVersion}/user`, userRoute);

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");


const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

app.post(`/find-complexity`, async (req, res) => {
  try {
    const {prompt} =req.body;
     const chatSession = model.startChat({
    generationConfig,
     
    history: [
    
    ],
  });
  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text())
    return res.status(200).json({
      success: true,
      data: JSON.stringify(result.response.text()),
    });
  } catch (error) {
    console.log(error);
  }
});























// 404 Handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});


// Server Configs
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 @ http://localhost:${PORT}`);
  console.log(`connected to ${process.env.DATABASE_URL}`);
});
