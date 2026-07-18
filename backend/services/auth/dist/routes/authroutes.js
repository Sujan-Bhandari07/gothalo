import express from "express";
import { signup } from "../controllers/authcontroller.js";
const authrouter = express.Router();
authrouter.post("/signup", signup);
export { authrouter };
