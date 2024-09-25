import express from "express";
import {
  meetController,
  userController,
  testController,
  courseController,
  materialController,
  virtualMentor,
} from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";
import messageController from "../controllers/message/message";
import videoCallController from "../controllers/videocall/videocall";
//import testController from "../controllers/test/test";

const router = express.Router();
router.post(
  "/create-material",
  authMiddleware,
  materialController.createMaterialsMentor
);
router.get(
  "/get-materials",
  authMiddleware,
  materialController.getMaterialByClass
);
router.post("/create-test", authMiddleware, testController.createTest);
router.get("/get-sub/:id",authMiddleware,testController.getSubmissionsByTestId)
router.post("/start-test", authMiddleware, testController.startTestAttempt);
router.post("/submit-answer", authMiddleware, testController.submitAnswer);
router.get("/get-sub-details/:id",authMiddleware,testController.getSubmissionDetails)
router.post("/finish-test", authMiddleware, testController.finishTestAttempt);
router.post("/create-course", authMiddleware, courseController.creatCourse);
router.get("/get-questions/:id",authMiddleware,testController.getQuestions)
router.get(
  "/get-test",
  authMiddleware,
  testController.getAllTestsCreatedByUser
);
router.get("/create-video-token",authMiddleware,videoCallController.createToken)
router.get("/get-subjects", authMiddleware, materialController.getallSubjects);
router.delete("/delete-test", authMiddleware, testController.deleteTest);
router.get("/get-my-test", authMiddleware, testController.getUserTestByClass);
router.get("/user-details", authMiddleware, userController.userDetails);
router.post("/book-meeting", authMiddleware, meetController.bookMeeting);
router.get("/get-meetings", authMiddleware, meetController.getMeetings);
router.get("/my-meetings", authMiddleware, meetController.showbookedMeetings);
router.get("/mentors", authMiddleware, meetController.getmentorsinfo);
router.post("/confirm-meeting", authMiddleware, meetController.confirmMeeting);
router.post("/create-question", authMiddleware, userController.createQuestion);
router.post("/answer-question", authMiddleware, userController.answerQuestion);
router.get("/user-questions", authMiddleware, userController.getQuestionOfUser);
router.get("/get-allquestions", userController.getAllQuestionandAnswer);
router.delete(
  "/delete-question/:id",
  authMiddleware,
  userController.deleteQuestion
);
router.get("/get-course", authMiddleware, courseController.getcourse);
router.get("/get-material", authMiddleware, materialController.getmaterials);
router.post("/open-ai", authMiddleware, virtualMentor.openAianswer);
router.delete("/delete-subject/:id", materialController.deleteSubject);
router.post("/create-conversation",authMiddleware,messageController.sendMessage)
router.get("/get-conversation/:id",authMiddleware,messageController.getMessage)
router.get("/get-all-users",authMiddleware,userController.getAllUser)
router.get("/all-convo",authMiddleware,messageController.getAllConversations)
router.get("/getuserbyid/:id",authMiddleware,userController.getUserById)
export default router;

