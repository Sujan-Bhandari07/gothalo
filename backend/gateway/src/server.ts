import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import proxy from "express-http-proxy"
import { authmidd } from "./middleware/authmiddleware.js"
import { proxywithheader } from "./utils/proxy.js"
dotenv.config()


const app=express()
const port=process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173',   // your frontend origin
    credentials: true,                  // if you send cookies/auth headers
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));


app.use(express.json())
app.use(cookieParser())




app.use("/api/v1/auth", proxy(process.env.AUTH_URL as string))
app.use("/api/v1/agent", authmidd, proxywithheader(process.env.AGENT_URL as string))

app.get("/", (req, res) => {
    res.status(200).json({ message: "Gateway is running" })
})

app.listen(port,()=>{
    console.log("gateway started",port)
})


