import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
dotenv.config()


const app=express()
const port=process.env.PORT


// app.use(express.json())



app.use("/auth",proxy(process.env.AUTH_URL as string))



app.listen(port,()=>{
    console.log("gateway started",port)
})


