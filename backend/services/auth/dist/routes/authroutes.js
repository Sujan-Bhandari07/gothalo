import express from "express";
import { login, logout, signup } from "../controllers/authcontroller.js";
import { limit } from "../utils/limit.js";
const authrouter = express.Router();
authrouter.post("/signup", limit, signup);
authrouter.post("/signin", limit, login);
authrouter.post("/logout", logout);
export { authrouter };
