import mongoose from "mongoose"



const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        } catch (error:any) {
        }
}
export {
    connectdb
}