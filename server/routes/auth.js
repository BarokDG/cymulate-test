import express from "express";
import { signUp, login } from "../controllers/auth.js";

export const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
