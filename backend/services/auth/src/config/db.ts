import mongoose from "mongoose"
import dotenv from "dotenv"


const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("mongo connected")
        
    } catch (error:any) {
        console.log(error.message)
    }
}
export {
    connectdb
}