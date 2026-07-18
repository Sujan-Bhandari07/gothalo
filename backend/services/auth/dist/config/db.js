import mongoose from "mongoose";
import dotenv from "dotenv";
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo connected");
    }
    catch (error) {
        console.log(error.message);
    }
};
export { connectdb };
