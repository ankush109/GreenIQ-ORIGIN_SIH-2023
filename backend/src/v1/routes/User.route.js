import express from "express";
import { meetController, userController,testController,courseController ,materialController} from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";
//import testController from "../controllers/test/test";

const router = express.Router();

router.post("/create-test", authMiddleware, testController.createTest);

router.get("/get-test", authMiddleware, testController.gettest);
router.delete("/delete-test", authMiddleware, testController.deleteTest);

router.get("/user-details", authMiddleware, userController.userDetails);
router.post("/book-meeting", authMiddleware, meetController.bookMeeting);
router.get("/get-meetings", authMiddleware, meetController.getMeetings);
router.get("/my-meetings", authMiddleware, meetController.showbookedMeetings);
router.get("/mentors", authMiddleware, meetController.getmentorsinfo);
router.post("/confirm-meeting", authMiddleware, meetController.confirmMeeting);
router.get("/get-course", authMiddleware, courseController.getcourse);
router.get("/get-material", authMiddleware, materialController.getmaterials);
export default router;
