import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma/index";
import config from "../config/env.config";

// all the request made from the frontend will have the access token as header and will be authenticated here

const authMiddleware = async (req, _res, next) => {
  const authHeader = req.headers.authorization;
   if (!authHeader) {
    // Return a 401 Unauthorized response if the Authorization header is missing
    return _res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  /* 0th index is "Bearer" and 1st index is the " JWT Token" */

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.USER_ACCESS_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded,
      },
    });
    if (!user) {
      return next(createError.Unauthorized());
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return next(createError.Unauthorized());
  }
};

export default authMiddleware;
