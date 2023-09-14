import express from "express";
import {
  loginController,
} from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";

const router = express.Router();

router.post("/login", loginController.login);
router.post("/register", loginController.register);
router.post("/logout", authMiddleware, loginController.logout);
export default router;
