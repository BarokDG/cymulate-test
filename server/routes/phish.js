import express from "express";
import {
  phishEmployee,
  getAllPhishes,
  getPhishById,
  updatePhishStatus,
} from "../controllers/phish.js";

import { authenticate } from "../middlewares/auth.js";

export const router = express.Router();

router.get("/getAll", authenticate, getAllPhishes);
router.get("/:id", authenticate, getPhishById);
router.post("/send", authenticate, phishEmployee);

router.get("/clicked/:id", updatePhishStatus);
