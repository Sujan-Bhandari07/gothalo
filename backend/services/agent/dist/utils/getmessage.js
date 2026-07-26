import { Conversation } from "../models/conversationmodel.js";
export const getmessage = async (conversationid) => {
    if (!conversationid)
        return;
    const res = await Conversation.findById(conversationid).populate("messages").sort({ updatedAt: -1 });
    if (!res)
        return;
    return res;
};
