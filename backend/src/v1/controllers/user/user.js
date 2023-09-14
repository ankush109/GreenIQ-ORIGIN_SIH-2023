import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ms from "ms";
import { customResponse } from "../../../utils/Response";


const prisma = new PrismaClient();

const userController ={
async userDetails(req,res,next){
    try{
        // find the user 
        let user ;
        user=await prisma.user.findFirst({
            where:{
                id:req.user.id
            }
        })
        res.json(customResponse(200,user));
    }
    catch(err){
        res.json(customResponse(400, err));
        console.log(err,"err")
    }

}
}
export default userController