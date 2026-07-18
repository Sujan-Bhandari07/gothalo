import mongoose from "mongoose";
import type { IAuth } from "../types/modeltype.js";



const authSchema= new mongoose.Schema<IAuth>({

    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Auth= mongoose.model<IAuth>("Auth",authSchema)
export {Auth}