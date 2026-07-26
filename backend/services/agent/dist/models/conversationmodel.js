import mongoose from "mongoose";
const conversationschema = new mongoose.Schema({
    messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
    title: {
        type: String,
        default: "Chat"
    },
    owner: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Conversation = mongoose.model("Conversation", conversationschema);
export { Conversation };
