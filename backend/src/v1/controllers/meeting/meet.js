import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ms from "ms";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const meetController = {
  // student to book their meeting with the mentor he wants
  async bookMeeting(req, res, next) {
    try {
      const { guestId, dateTime, status } = req.body;
      const hostId = req.user.id;

      const host = await prisma.user.findFirst({
        where: {
          id: hostId,
        },
      });

      if (!host) {
        return res.json(customResponse(400, "Host user not found"));
      }

      if (host.role != "student") {
        return res.json(customResponse(403, "Permission denied"));
      }

      const meeting = await prisma.meeting.create({
        data: {
          hostId: hostId,
          guestId: guestId,
          dateTime: dateTime,
          status: status,
        },
      });

      res.json(customResponse(200, meeting));
    } catch (err) {
      console.error(err);
      res.json(customResponse(500, err));
    }
  },

  // meeting creation
  // only the student can book a meeting and not the other way around
  // guest -> mentor
  // host -> student

  async getMeetings(req, res, next) {
    try {
      const userId = req.user.id;
      const mentor = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (mentor.role == "mentor") {
        const meetings = await prisma.meeting.findMany({
          where: {
            guestId: userId,
          },
        });
        res.json(meetings);
      } else {
        res.json({ message: "no meetings found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // for the student to see the booked meeting only one at a time with only a single mentor

  async showbookedMeetings(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (user) {
        const meeting = await prisma.meeting.findFirst({
          where: {
            hostId: userId,
          },
        });
        if (meeting) {
          res.json(meeting);
        } else {
          res.json({ message: "no bookings yet" });
        }
      }
    } catch (err) {}
  },
};
export default meetController;
