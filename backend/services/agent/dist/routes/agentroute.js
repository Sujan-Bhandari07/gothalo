import express from "express";
import { createconversation, getallconversations, getconversationbyid, sendprompt } from "../controllers/messagecontroller.js";
import upload from "../config/multer.js";
const router = express.Router();
router.post("/sendprompt", upload.fields([{ name: "file", maxCount: 1 }]), sendprompt);
router.post("/createconversation", createconversation);
router.get("/getallconversation", getallconversations);
router.get("/getconversationbyid/:id", getconversationbyid);
export { router };
