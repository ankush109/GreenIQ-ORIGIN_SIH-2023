import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const testController = {

  async giveScoreTest(req,res){
  try{
    const { attemptId ,score }= req.body;

     await prisma.testAttempt.update({
      where:{
          id :attemptId
      },
      data:{
          score:score
      }
      
    })
    res.status(200).json({
      success:true,
      message:"score successfully"
    })
  }catch(err){
    console.log(err,"erre")
  res.status(200).json({
      success:false,
      message:"scoring failed"
    }) 
  }
},
async getMySubmissions(req,res){
  try{
    const userId= req.user.id;
    const findSub= await prisma.testAttempt.findMany({
      where:{
        userId:userId
      },
      include:{
        test:true
      }
    })
    res.status(200).json({
      success:true,
      message:findSub
    })
  }catch(err){
  res.status(200).json({
      success:false,
      message:err
    }) 
  }
},
  async getSubmissionsByTestId(req,res){
try{
 const {id} =req.params;
 const submissions = await prisma.testAttempt.findMany({
  where:{
    testId:id
  },
  include:{
    user:true
  }
 })
 res.status(200).json({
  success:true,
  message:submissions
 })
}catch(err){
res.status(400).json({
  success:false,
  message:err
 })
}
  },
 async getSubmissionDetails(req,res){
try{
 const {id} =req.params;
 const submissions = await prisma.testSubmission.findMany({
  where:{
    attemptId:id
  },
  include:{
    question:true,
    attempt:{
      include:{
        test:true
      }
    }
  
  },

 })
 res.status(200).json({
  success:true,
  message:submissions
 })
}catch(err){
res.status(400).json({
  success:false,
  message:err
 })
}
  },
  async getQuestions(req,res){
    try{
        const { id } =req.params;
        const questions= await prisma.testQuestion.findMany({
          where:{
            testId:id
          }
        })
        res.status(200).json({
          success:true,
          message:questions
        })
    }catch(err){
  res.status(400).json({
          success:false,
          message:err
        })
    }
  },
   async createTest(req, res) {
    try {
      const { subjectname, classname, description, title, questions } = req.body;

  
      let classRecord = await prisma.class.findFirst({
        where: { name: classname },
      });

      if (!classRecord) {
        classRecord = await prisma.class.create({
          data: { name: classname },
        });
      }

 
      let subjectRecord = await prisma.subject.findFirst({
        where: {
          name: subjectname,
          classId: classRecord.id,
        },
      });

      if (!subjectRecord) {
        subjectRecord = await prisma.subject.create({
          data: { name: subjectname, classId: classRecord.id },
        });
      }


      const newTest = await prisma.test.create({
        data: {
          description,
          title,
          owner: { connect: { id: req.user.id } }, // Mentor creating the test
          class: { connect: { id: classRecord.id } },
          subject: { connect: { id: subjectRecord.id } },
        },
      });

      
      if (questions && questions.length > 0) {
        for (const question of questions) {
          await prisma.testQuestion.create({
            data: {
              question: question.question,
              test: { connect: { id: newTest.id } },
            },
          });
        }
      }

      res.json({ success: true, message: "Test created successfully", newTest });
    } catch (error) {
      console.error("Error creating test:", error);
      res.status(500).json({ success: false, message: error.message });
    } finally {
      await prisma.$disconnect();
    }
  },
   async startTestAttempt(req, res) {
    try {
      const { testId } = req.body;

      // Check if test exists
      const test = await prisma.test.findUnique({
        where: { 
          id: testId
         },
        include: { 
          questions: true 
        }, 
      });

      if (!test) {
        return res.status(404).json({ success: false, message: "Test not found" });
      }

   
      const newAttempt = await prisma.testAttempt.create({
        data: {
          user: { connect: { id: req.user.id } },
          test: { connect: { id: testId } },
          status: "in_progress",
        },
      });

      res.json({
        success: true,
        message: "Test attempt started",
        test: {
          id: test.id,
          title: test.title,
          description: test.description,
          questions: test.questions.map(q => ({
            id: q.id,
            question: q.question,
          })),
        },
        attemptId: newAttempt.id,
      });
    } catch (error) {
      console.error("Error starting test attempt:", error);
      res.status(500).json({ success: false, message: "Error starting test attempt" });
    } finally {
      await prisma.$disconnect();
    }
  },
  async submitAnswer(req, res, next) {
  try {
    const { testId, questionId, answer } = req.body;

  
    const attempt = await prisma.testAttempt.findFirst({
      where: {
        testId: testId,
        userId: req.user.id, 
        status: 'in_progress', 
      },
    });

    if (!attempt) {
      return res.status(404).json({ message: "Test attempt not found" });
    }


    const existingSubmission = await prisma.testSubmission.findFirst({
      where: {
        attemptId: attempt.id,
        questionId: questionId,
      },
    });

    let submission;

    if (existingSubmission) {

      submission = await prisma.testSubmission.update({
        where: {
          id: existingSubmission.id,
        },
        data: {
          answer,
          submittedAt: new Date(),
        },
      });

      return res.json({
        success: true,
        message: "Answer updated successfully",
        submission,
      });
    } else {
      
      submission = await prisma.testSubmission.create({
        data: {
          attemptId: attempt.id,
          questionId: questionId,
          answer,
          submittedAt: new Date(),
        },
      });

      return res.json({
        success: true,
        message: "Answer submitted successfully",
        submission,
      });
    }
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting answer",
    });
  } finally {
    await prisma.$disconnect();
  }
},

  async finishTestAttempt(req, res, next) {
    try {
       const { testId } = req.body;
    const attempt = await prisma.testAttempt.findFirst({
      where: {
        testId: testId,
        userId: req.user.id, 
        status: 'in_progress', 
      },
      include: {
        test: {
          include: {
            questions: true,
          },
        },
        submissions: true,
      },
    });


      if (!attempt) {
        return res.status(404).json({ message: "Test attempt not found" });
      }
    
      const updatedAttempt = await prisma.testAttempt.update({
        where: { id: attempt.id },
        data: {
          completedAt: new Date(),
          status: "completed",
        },
      });

      return res.json({
        success: true,
        message: "Test attempt completed successfully",
        attempt: updatedAttempt,
      });
    } catch (error) {
      console.error("Error finishing test attempt:", error);
      res.status(500).json({
        success: false,
        message: "Error finishing test attempt",
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
           questions: true,
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
