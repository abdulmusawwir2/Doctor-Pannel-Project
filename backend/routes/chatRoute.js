import { Router } from "express";
import { chat } from "../controllers/chatController.js";
import authUser from "../middlewares/authUser.js";
const router = Router();

router.post("/", authUser,chat); // POST /api/chat
export default router;
