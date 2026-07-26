import { QdrantVectorStore } from "@langchain/qdrant";
import type { Document } from "@langchain/core/documents";
export declare const vectorstore: (docs: Document[], collection: string) => Promise<QdrantVectorStore>;
