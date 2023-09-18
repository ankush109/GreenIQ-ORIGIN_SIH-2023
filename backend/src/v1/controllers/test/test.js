import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const testController = {
  async createTest(req, res, next) {
    try {
      // Find the Class by name
      const { subjectname, classname, description } = req.body;
      const classRecord = await prisma.class.findFirst({
        where: {
          name: "1",
        },
      });

      if (!classRecord) {
        throw new Error(`Class with name ${classname} not found.`);
      }

      // Find the Subject by name within the Class
      const subjectRecord = await prisma.subject.findFirst({
        where: {
          name: subjectname,
          classId: classRecord.id,
        },
      });
      console.log(subjectRecord);
      if (!subjectRecord) {
        throw new Error(
          `Subject with name ${subjectname} not found in class ${classname}.`
        );
      }

      // Create a new Test associated with the found Class and Subject
      const newTest = await prisma.test.create({
        data: {
          description: description,
          mentorId: req.user.id,
          class: {
            connect: {
              id: classRecord.id,
            },
          },
          subject: {
            connect: {
              id: subjectRecord.id,
            },
          },
        },
      });
      res.json({
        succuss: true,
        message: newTest,
      });
      console.log("Test created:", newTest);
    } catch (error) {
      console.error("Error creating test:", error);
      res.json({
        succuss: false,
        message: error,
      });
    } finally {
      await prisma.$disconnect();
    }
  },
  async gettest(req, res, next) {},
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
};

export default testController;
