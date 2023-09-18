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
    const mentorId = req.user.id;


    if (!classId || !subjectId) {
      return res.status(400).json({ message: 'Both classId and subjectId are required to create a test.' });
    }

    const classExists = await prisma.class.findFirst({
      where: {
        id: classId,
      },
    });

    const subjectExists = await prisma.subject.findFirst({
      where: {
        id: subjectId,
      },
    });

    if (!classExists || !subjectExists) {
      return res.status(400).json({ message: 'Invalid class or subject.' });
    }

    const test = await prisma.test.create({
      data: {
        ...response,
        mentorId,
        classId,
        subjectId,
      },
    });

    res.json(customResponse(200,test));
  } catch (err) {
    res.status(400).json(customResponse(400, err));
    console.error(err);
  }
}
,
    async gettest(req, res, next) {
  try {
    const { subjectId, classId } = req.query;
    let tests;

    if (subjectId && classId) {

      tests = await prisma.test.findMany({
        where: {
          subjectId,
          classId,
        },
      });
    } else if (subjectId) {
    
      tests = await prisma.test.findMany({
        where: {
          subjectId,
        },
      });
    } else if (classId) {

      tests = await prisma.test.findMany({
        where: {
          classId,
        },
      });
    } else {
    
      tests = await prisma.test.findMany();
    }


    if (!tests || tests.length === 0) {
      return res.status(404).json({ message: 'No valid tests found for the specified criteria.' });
    }

    res.json(customResponse(200, tests));
  } catch (err) {
    res.status(400).json(customResponse(400, err));
    console.error(err);
  }
}
,
 async deleteTest(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Test ID is required.' });
    }

  
    const test = await prisma.test.findUnique({
      where: {
        id,
      },
    });

    if (!test) {
      return res.status(404).json({ message: 'Test not found.' });
    }

  
    if (req.user.role !== 'mentor') {
      return res.status(403).json({ message: 'Access denied. You must be a mentor to delete a test.' });
    }

    if (test.mentorId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied. You must be the creator of the test to delete it.' });
    }

    await prisma.test.delete({
      where: {
        id,
      },
    });

    res.json(customResponse(200, 'Test deleted successfully'));
  } catch (err) {
    res.json(customResponse(400, err));
    console.error(err);
  }
},

};

export default testController;
