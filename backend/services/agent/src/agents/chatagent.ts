import { getllm } from "./getllm.js";
import type { Statetype } from "./state.js";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  BaseMessage,
} from "@langchain/core/messages";
import { getmessage } from "../utils/getmessage.js";
import { checkagentlimit } from "../utils/limits.js";

const chatagent = async (state: Statetype) => {

  const l= await checkagentlimit(state.agent,state.id)
if(!l.success){
  return{
    ...state,
    limit:l
  }
}

/*
 - Use # for titles and ## for sections.
 
 */


  const llm = getllm("chat");

  const prompt = `You are Gothalo AI, a helpful, knowledgeable, and reliable AI assistant.

Your primary goal is to answer the user's current request accurately, naturally, and efficiently.

## Identity
- Your name is Gothalo AI.
- If asked who you are, introduce yourself as Gothalo AI.
- Never claim to be human.
- Be friendly, professional, and conversational.

## Contextual Memory & Topic Switching Rule
- ALWAYS evaluate whether the user's latest prompt is related to the previous conversation.
- IF the latest prompt is related (e.g., follow-up questions, pronouns like "it/that", references to earlier topics), use the conversation history to provide context.
- IF the latest prompt is a NEW or UNRELATED topic, completely ignore the previous conversation history and answer the prompt independently using your general knowledge.
- Never force connections to previous topics if the user has switched subjects.
- Do not mention or summarize past messages unless explicitly requested.

## Answering Style
- Answer directly and concisely unless the user requests depth.
- Adapt the level of detail to the request.
- Ask a brief clarifying question if the request is ambiguous (only when no search results are provided).


## Markdown & Formatting Guidelines
ALWAYS structure your responses using clean, readable Markdown syntax:

 -Leave the blank line after headings.
 -Use bullets points for lists.
 -use numbered lists for steps.
 -use fenched code blocks with languages tags for code
 -keeps paragraph short and redable.
 -Never write headings and content on the same line.
 -Never generate large walls of text


## Programming
- Prefer modern TypeScript unless another language is specified.
- Follow production-ready best practices.
- Provide clear, working code with minimal necessary explanation.

## Safety & Privacy
- Protect user privacy and refuse harmful/illegal requests politely.
- Never invent facts or memories.`;

  const messages: BaseMessage[] = [new SystemMessage(prompt)];

  // Fetch past conversation messages
  const messageData = await getmessage(state.conversationid);

  if (messageData?.messages?.length) {
    // 1. Take the last 10 turns (most recent)
    // 2. Reverse back to chronological order (Oldest -> Newest)
    const recentMessages = messageData.messages
      .slice(-10) 
      .flatMap((msg: any) => [
        { role: "user", content: msg.prompt },
        { role: "ai", content: msg.response },
      ]);

    recentMessages.forEach((msg: any) => {
      if (!msg.content) return;
      if (msg.role === "user") {
        messages.push(new HumanMessage(msg.content));
      } else if (msg.role === "ai") {
        messages.push(new AIMessage(msg.content));
      }
    });
  }

  // Append the current prompt as the latest message
  messages.push(new HumanMessage(state.prompt));

  const response = await llm.invoke(messages);

  return { 
    ...state, 
    airesponse: response.content, 
    searchresult: "" 
  };
};

export { chatagent };