import mongoose, { Types } from "mongoose";
const agentSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    },
    agent: String,
    response: {
        type: String,
    },
    images: [{
            type: String,
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
}, {
    timestamps: true,
});
const Message = mongoose.model("Message", agentSchema);
export { Message };
