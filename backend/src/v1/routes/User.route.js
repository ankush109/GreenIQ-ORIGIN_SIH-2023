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
router.post("/create-course", authMiddleware, courseController.creatCourse);
router.get(
  "/get-test",
  authMiddleware,
  testController.getAllTestsCreatedByUser
);
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
export default router;
