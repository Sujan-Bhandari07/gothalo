import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from "./embedding.js";
export const vectorstore = async (docs, collection) => {
    return await QdrantVectorStore.fromDocuments(docs, embeddings, {
        url: process.env.QDRANT_URL,
        collectionName: collection,
    });
};
