import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenRouter } from "@langchain/openrouter";
const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
});
const deepseek = new ChatOpenRouter({
    model: "deepseek/deepseek-chat",
    temperature: 0,
    maxTokens: 2500
});
const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    temperature: 0,
});
const getllm = (type) => {
    switch (type) {
        case "chat":
            return groq;
        case "coding":
            return deepseek;
        case "search":
            return groq;
        case "image":
            return gemini;
        default:
            return groq;
    }
};
export { getllm };
