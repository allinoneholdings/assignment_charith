import express from "express";
import {loginUser, registerUser} from "../controller/auth.controller";

const router = express.Router();

router.post("/signUp",registerUser);
router.post("/login",loginUser);

export default router;