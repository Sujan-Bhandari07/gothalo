import mongoose, { Types } from "mongoose";

interface IMessage {
  prompt: string;
  response: string;
  images:string[];
  agent:string
  conversationid: Types.ObjectId;
files: [
  {
    name: String,
    content: String,
  },
],
}

const agentSchema = new mongoose.Schema<IMessage>(
  {
    prompt: {
      type: String,
      required: true,
    },
    agent:String,
    response: {
      type: String,
    },
    images:[{
      type:String,
      
    }],
    files: [
    {
      name: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
    conversationid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model<IMessage>("Message", agentSchema);
export { Message };
