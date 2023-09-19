import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const testController = {
  // allows mentor to create a test by providing a particular class and subject
  async createTest(req, res, next) {
    try {
      const { subjectname, classname, description, title } = req.body;

      // Find the Class by name
      let classRecord = await prisma.class.findFirst({
        where: {
          name: classname,
        },
      });

      // If the class doesn't exist, create a new class
      if (!classRecord) {
        classRecord = await prisma.class.create({
          data: {
            name: classname,
            // Add any other class-related fields here
          },
        });
      }

      // Find the Subject by name within the Class
      let subjectRecord = await prisma.subject.findFirst({
        where: {
          name: subjectname,
          classId: classRecord.id,
        },
      });

      // If the subject doesn't exist, create a new subject
      if (!subjectRecord) {
        subjectRecord = await prisma.subject.create({
          data: {
            name: subjectname,
            classId: classRecord.id,
            // Add any other subject-related fields here
          },
        });
      }

      // Create a new Test associated with the found Class and Subject
      const newTest = await prisma.test.create({
        data: {
          description: description,
          title: title,
          owner: { connect: { id: req.user.id } }, // Connect the test to the user
          class: { connect: { id: classRecord.id } },
          subject: { connect: { id: subjectRecord.id } },
        },
      });

      res.json({
        success: true,
        message: newTest,
      });

      console.log("Test created:", newTest);
    } catch (error) {
      console.error("Error creating test:", error);
      res.json({
        success: false,
        message: error.message,
      });
    } finally {
      await prisma.$disconnect();
    }
  },

  // alows to get mentor all the test he/she has created til yet
  async getAllTestsCreatedByUser(req, res, next) {
    try {
      // Get the user's ID from the request (assuming you have a way to identify the user)
      const userId = req.user.id;

      // Find all tests created by the user
      const tests = await prisma.test.findMany({
        where: {
          mentorId: userId,
        },
        include: {
          class: true,
          subject: true,
        },
      });

      res.json({
        success: true,
        message: tests,
      });
    } catch (error) {
      console.error("Error getting tests:", error);
      res.status(500).json({
        success: false,
        message: "Error getting tests.",
      });
    } finally {
      await prisma.$disconnect();
    }
  },

  async deleteTest(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Test ID is required." });
      }

      const test = await prisma.test.findUnique({
        where: {
          id,
        },
      });

      if (!test) {
        return res.status(404).json({ message: "Test not found." });
      }

      if (req.user.role !== "mentor") {
        return res.status(403).json({
          message: "Access denied. You must be a mentor to delete a test.",
        });
      }

      if (test.mentorId !== req.user.id) {
        return res.status(403).json({
          message:
            "Access denied. You must be the creator of the test to delete it.",
        });
      }

      await prisma.test.delete({
        where: {
          id,
        },
      });

      res.json(customResponse(200, "Test deleted successfully"));
    } catch (err) {
      res.json(customResponse(400, err));
      console.error(err);
    }
  },
  async getUserTestByClass(req, res, next) {
    try {
      const findclassId = await prisma.class.findFirst({
        where: {
          name: req.user.classname,
        },
      });
      console.log(findclassId, "class ID");
      let Tests = [];
      if (findclassId) {
        Tests = await prisma.test.findMany({
          where: {
            classId: findclassId.id,
          },
          include: {
            subject: true,
            owner: true,
          },
        });
        console.log(Tests);
      }
      if (Tests) {
        res.json({
          success: true,
          message: Tests,
        });
      } else {
        res.json({
          success: false,
          message: [],
        });
      }
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        message: err,
      });
    }
  },
};

export default testController;
