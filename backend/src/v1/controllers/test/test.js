import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const testController = {
  async createTest(req, res, next) {
    try {
      if (req.user.role !== 'mentor') {
        return res.status(403).json({ message: 'Access denied. You must be a mentor to create a test.' });
      }

      const { classId, subjectId, ...response } = req.body;

      // Check if the class and subject exist and are associated with the mentor
      const mentorId = req.user.id;
      const classExists = await prisma.class.findUnique({ where: { id: classId, tests: { some: { mentorId } } } });
      const subjectExists = await prisma.subject.findUnique({ where: { id: subjectId, tests: { some: { mentorId } } } });

      if (!classExists || !subjectExists) {
        return res.status(400).json({ message: 'Invalid class or subject for the mentor.' });
      }

      const test = await prisma.test.create({
        data: {
          ...response,
          userId: req.user.id,
          classId,
          subjectId,
        },
      });

      res.json(customResponse(200, "Test created successfully"));
    } catch (err) {
      res.json(customResponse(400, err));
      console.log(err, "err");
    }
  },

  // Your other controller methods here...

};
export default testController;
