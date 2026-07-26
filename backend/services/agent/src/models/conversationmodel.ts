import type { Types } from "mongoose";
import mongoose from "mongoose";

 export interface IConversation {
  messages: Types.ObjectId[];
    owner:string,
    title:string


}

const conversationschema = new mongoose.Schema<IConversation>(
  {
    messages:[{

        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    } ,

],
title:{
  type:String,
  default:"Chat"
},
owner:{
        type:String,
        required:true
    }
  },
  { timestamps: true },
);

const Conversation=mongoose.model<IConversation>("Conversation",conversationschema)
export{Conversation}
