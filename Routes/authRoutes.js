import express from "express";
import {
  registerController,
  loginController,
} from "../Controllers/authController.js";

//router object
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

export default router;
