import"dotenv/config"
import express from "express"


import { connectdb } from "./config/db.js"
import cookieParser from "cookie-parser"
import { connectRabbitMQ } from "@gothalo/shared"
import { authrouter } from "./routes/authroutes.js"
import { receiveemail } from "./utils/emailconsumer.js"



async function bootstrap (){
    const app=express()
    const PORT = process.env.PORT
    
    app.use(cookieParser())
    app.use(express.json())
    connectdb()

 await connectRabbitMQ()
 await receiveemail()

 app.use("/",authrouter)

app.listen(PORT,()=>{
    console.log("auth started")
})
}


bootstrap()


