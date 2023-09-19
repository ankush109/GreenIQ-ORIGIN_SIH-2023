import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const courseController = {
  async creatCourse(req, res, next) {
    try {
      const { className, courseName, courseDescription, courseImg } = req.body;

      // Find the class by name
      let classRecord = await prisma.class.findFirst({
        where: {
          name: className,
        },
      });

      if (!classRecord) {
        return res.status(404).json({ error: "Class not found" });
      }

      // Create the course
      const newCourse = await prisma.course.create({
        data: {
          name: courseName,
          description: courseDescription,
          img: courseImg,
          classId: classRecord.id,
          userId: req.user.id,
        },
      });

      res.status(201).json(newCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getcourse(req, res, next) {
    try {
      if (!req.user) {
        return res.json(
          customResponse(403, "Access denied. User is not authenticated.")
        );
      }
      console.log("Parameters from URL:", req.query);

      const { classname } = req.query;
      const findclassId = await prisma.class.findFirst({
        where: {
          name: classname,
        },
      });

      if (!findclassId) {
        // Class not found, return an empty array as a message
        return res.status(200).json({
          success: true,
          message: [],
        });
      }

      const courses = await prisma.course.findMany({
        where: {
          classId: findclassId.id,
        },
      });

      if (courses.length === 0) {
        return res.status(200).json({
          success: true,
          message: [],
        });
      }

      res.json(customResponse(200, courses));
    } catch (err) {
      res.status(500).json(customResponse(500, "Internal server error"));
      console.error(err);
    }
  },
};

export default courseController;
