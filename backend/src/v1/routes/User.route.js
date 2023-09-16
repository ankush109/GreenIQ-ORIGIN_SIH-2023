import express from "express";
import {
  userController,
} from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";
import testController from "../controllers/test/test";

const router = express.Router();

router.get("/user-details", authMiddleware,userController.userDetails);
router.post("/create-test", authMiddleware, testController.createTest);

export default router;
