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
      const searchText = req.query.searchText;
      const questions = await prisma.question.findMany({
        where: {
          text: {
            contains: searchText,
          },
        },
        include: {
          user:true,
          answers: {
            include: {
              owner: true,
            },
          },
        },
      });

      if (questions.length === 0) {
        return res.json({
          success: true,
          message: [],
        });
      }

      res.json({
        success: true,
        message: questions,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  },
  async getAllUser(req,res){
 try{
  const users = await prisma.user.findMany()
  res.status(200).json({
    success:true,
    message:users
  })
 }catch(err){
res.status(400).json({
    success:false,
    message:"failed to"
  })
 }
  },
  async  getMessages(req, res, next) {
  try{
    const messages = await prisma.chat.findMany({
    where:{
      senderId:req.user.id
    }
  })
  res.json({
          success: true,
          message:messages,
        });
 
  }
  catch(err){
    const messages = await prisma.chat.findMany({
    where:{
      senderId:req.user.id
    }
  })
  res.status(400).json({
          success: false,
          message:err,
     });
 
  }
},
async getUserById(req,res){
try{
const {id} =req.params;
const user = await prisma.user.findFirst({
  where:{
    id:id
  }
  
})
res.status(200).json({
    success:true,
    message:user
  })
}catch(err){
res.status(400).json({
    success:false,
    message:err
  })
}
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
        // fetch all the questions along with their answers
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
            message: "No questions found for this user",
          });
        }
      } else {
        res.json({
          success: false,
          message: "User not found",
        });
      }
    } catch (err) {
      console.error("Error fetching user's questions:", err);
      next(err); // Pass the error to the error handling middleware
    }
  },

  async deleteQuestion(req, res, next) {
    try {
      const userId = req.user.id;

      if (!userId) {
        res.json({
          message: "User ID is missing or undefined in req.user",
        });
        return;
      }

      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      // Check if user exists
      if (!user) {
        res.json({
          message: "User does not exist",
        });
        return;
      }
      console.log(req.params, "request");
      const question = await prisma.question.findFirst({
        where: {
          id: req.params.id,
        },
      });
      console.log(question);

      if (!question) {
        res.json({
          message: "Question does not exist",
        });
        return;
      }

      // Check if the user owns the question
      if (question.userId !== userId) {
        res.json({
          message: "Not the owner of this question",
        });
        return;
      }

      await prisma.question.delete({
        where: {
          id: req.params.id,
        },
      });

      res.json({
        success: true,
        message: "Question deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
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
          id: questionId,
        },
      });

      if (!existingQuestion) {
        return res.status(404).json({ error: "Question not found." });
      }

      const answer = await prisma.answer.create({
        data: {
          text: text,
          questionId: questionId,
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
        include:{
          
          tests:{
          
            include:{
              attempts:{
                include:{
                  submissions:{
                    include:{
                      question:true
                    }
                  }
                }
              }
            }
          },
          TestAttempt:true
        
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
