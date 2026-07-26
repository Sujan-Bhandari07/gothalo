import { QdrantVectorStore } from "@langchain/qdrant";
import type { Document } from "@langchain/core/documents";
import { embeddings } from "./embedding.js";

export const vectorstore = async (docs: Document[], collection: string) => {
  return await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: process.env.QDRANT_URL as string,
    collectionName: collection,
  });
};