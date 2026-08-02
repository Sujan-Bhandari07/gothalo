import { err, redis, success, tryCatch } from "@gothalo/shared";
import { graph } from "../agents/graph.js";
import { Conversation } from "../models/conversationmodel.js";
import { Message } from "../models/messagemodel.js";

const createconversation = tryCatch(async (req, res) => {
  const id = req.headers["user-id"];

  if (!id) {
    return err(res, "Something went wrong");
  }
  const conversation = await Conversation.create({
    owner: id as string,
  });
  if (conversation) {
    return success(res, "Conversation created successfully",conversation);
  }
});

const getallconversations = tryCatch(async (req, res) => {
  const id = req.headers["user-id"];
  if (!id) {
    return err(res, "Something went wrong");
  }

  const conversations = await Conversation.find({
    owner: id,
  }).sort({createdAt:-1});
  if (!conversations || conversations.length < 1) {
    return err(res, "No conversations found");
  }

  return success(res, "Conversation found successfully", conversations);
});

const sendprompt = tryCatch(async (req, res) => {
  const { prompt, conversationid ,agent} = req.body;

  
  const id = req.headers["user-id"];
  console.log("id",id)
  if(!id)return err(res,"Not authorized")

  if (!prompt || !conversationid) {
    return err(res, "pls provide prompt");
  }
  
  const files = req.files as {
  [fieldname: string]: Express.Multer.File[] | undefined;
};

const image = files.file?.[0];
console.log("url",image)

  const response = await graph.invoke({
    prompt,
    file:image,
    id:id as string,
    airesponse:"",
    
    conversationid,
    agent,
    files: [],
  });
  console.log("controller", response);
  if(response.limit && response.limit.message){
    return err(res,response.limit.message)
  }
  if (!response || !response.airesponse ) {
    return err(res, "Something went wrong");
  }
  const conver = await Conversation.findById(conversationid);
  if (!conver) {
    return err(res, "Couldnt find conversation");
  }
  const message = await Message.create({
    prompt,
    agent:response.agent,
    response: response.airesponse,
    
    conversationid: conversationid,
    files: response.files,
    images:response.images

  });
  const title = prompt.length > 100
  ? `${prompt.slice(0, 100)}...`
  : prompt;
  conver.messages.push(message._id);
  conver.title = title;
  await conver.save();
  await redis.del(`conversation-${conversationid}`)
  return success(res, "Send", message);
});

const getconversationbyid = tryCatch(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return err(res, "Something went wrong");
  }

  const data = await redis.get(`conversation-${id}`);
  if (data) {
    return success(res, "found", JSON.parse(data));
  }
  const conversation = await Conversation.findById(id).populate({
    path: "messages",
  });
  if (!conversation) {
    return err(res, "No conversation found");
  }
  await redis.set(
    `conversation-${id}`,
    JSON.stringify(conversation),
    "EX",
    30 * 60,
  );
  return success(res, "found", conversation);
});

export {
  createconversation,
  getallconversations, getconversationbyid, sendprompt
};

