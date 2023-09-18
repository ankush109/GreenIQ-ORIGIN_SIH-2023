import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const courseController = {
  async getcourse(req, res, next) {
    try {
      if (!req.user) {
        return res.json(customResponse(403, "Access denied. User is not authenticated."));
      }
      console.log("Parameters from URL:", req.query);

      const { classId } = req.query;
      console.log("classId from URL:", classId);


      const courses = await prisma.course.findMany({
        where: {
          classId: classId,
        },
      });

   
      if (courses.length === 0) {
        return res.status(404).json(customResponse(404, "Class not found."));
      }

      res.json(customResponse(200, courses));
    } catch (err) {
      res.status(500).json(customResponse(500, "Internal server error"));
      console.error(err);
    }
  },


};

export default courseController;
