import express from "express"
import dotenv from "dotenv"
dotenv.config()
import proxy from "express-http-proxy"
import { proxywithheader } from "./utils/proxy.js"
import { authmidd } from "./middleware/authmiddleware.js"
import cookieParser from "cookie-parser"


const app=express()
const port=process.env.PORT


app.use(express.json())
app.use(cookieParser())



app.use("/api/v1/auth",proxy(process.env.AUTH_URL as string))
app.use("/api/v1/agent",authmidd,proxywithheader(process.env.AGENT_URL as string))



app.listen(port,()=>{
    console.log("gateway started",port)
})


