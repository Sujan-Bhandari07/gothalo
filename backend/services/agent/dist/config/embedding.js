import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001", // 768 dimensions
});
export { embeddings };
