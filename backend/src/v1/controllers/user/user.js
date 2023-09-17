import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ms from "ms";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const userController = {
  async getAllQuestionandAnswer(req, res, next) {
    try {
      const allquestions = await prisma.question.findMany({
        include: {
          answers: true,
        },
      });
      res.json({
        success: true,
        message: allquestions,
      });
    } catch (err) {}
  },
  async getQuestionOfUser(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (user) {
        // fetch all the questions along with theier answer
        const questions = await prisma.question.findMany({
          where: {
            userId: userId,
          },
          include: {
            answers: {
              include: {
                owner: true,
              },
            },
          },
        });
        if (questions) {
          res.json({
            success: true,
            message: questions,
          });
        } else {
          res.json({
            success: true,
            message: "no question found",
          });
        }
      }
    } catch (err) {}
  },
  async createQuestion(req, res, next) {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text field is required." });
      }

      const question = await prisma.question.create({
        data: {
          text: text,
          userId: req.user.id,
        },
      });

      res.status(201).json({
        success: true,
        question,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({ error: err });
    }
  },
  async answerQuestion(req, res, next) {
    try {
      const { text } = req.body;
      const { questionId } = req.body;
      const userId = req.user.id;

      if (!text) {
        return res.status(400).json({ error: "Text field is required." });
      }

      const existingQuestion = await prisma.question.findUnique({
        where: {
          id: parseInt(questionId),
        },
      });

      if (!existingQuestion) {
        return res.status(404).json({ error: "Question not found." });
      }

      const answer = await prisma.answer.create({
        data: {
          text: text,
          questionId: parseInt(questionId),
          userId: userId,
        },
      });

      res.status(201).json({
        success: true,
        answer,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  },

  async userDetails(req, res, next) {
    try {
      // find the user
      let user;
      user = await prisma.user.findFirst({
        where: {
          id: req.user.id,
        },
      });
      res.json(customResponse(200, user));
    } catch (err) {
      res.json(customResponse(400, err));
      console.log(err, "err");
    }
  },
};
export default userController;
