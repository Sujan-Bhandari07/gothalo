import "dotenv/config";
import express from "express";
import { connectdb } from "./config/db.js";
import { router } from "./routes/agentroute.js";
const app = express();
const port = process.env.PORT;
connectdb();
app.use(express.json());
app.use("/", router);
app.listen(port, () => {
    console.log("agent started");
});
