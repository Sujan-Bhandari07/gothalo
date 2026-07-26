import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenRouter } from "@langchain/openrouter";
declare const getllm: (type: string) => ChatGoogleGenerativeAI | ChatGroq | ChatOpenRouter;
export { getllm };
