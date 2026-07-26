import type { Statetype } from "./state.js";
declare const pptagent: (state: Statetype) => Promise<{
    prompt: string;
    id: string;
    airesponse: string;
    agent: string;
    conversationid: string;
    searchresult: string;
    images: string[];
    files: import("./state.js").AIFile[];
    file: Express.Multer.File | undefined;
    limit: {
        success: boolean;
        message: string;
    };
    state?: never;
} | {
    state: import("@langchain/langgraph").StateType<{
        limit: import("@langchain/langgraph").LastValue<import("./state.js").ltype>;
        prompt: import("@langchain/langgraph").LastValue<string>;
        id: import("@langchain/langgraph").LastValue<string>;
        airesponse: import("@langchain/langgraph").LastValue<string>;
        agent: import("@langchain/langgraph").LastValue<string>;
        conversationid: import("@langchain/langgraph").LastValue<string>;
        searchresult: import("@langchain/langgraph").LastValue<string>;
        images: import("@langchain/langgraph").LastValue<string[]>;
        files: import("@langchain/langgraph").LastValue<import("./state.js").AIFile[]>;
        file: import("@langchain/langgraph").LastValue<Express.Multer.File | undefined>;
    }>;
}>;
export { pptagent };
