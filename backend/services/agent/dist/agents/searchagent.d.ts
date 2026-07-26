import type { Statetype } from "./state.js";
declare const searchagent: (state: Statetype) => Promise<{
    limit: import("./state.js").ltype;
    prompt: string;
    id: string;
    agent: string;
    conversationid: string;
    searchresult: string;
    files: import("./state.js").AIFile[];
    file: Express.Multer.File | undefined;
    airesponse: string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[];
    images: any;
} | {
    limit: import("./state.js").ltype;
    prompt: string;
    id: string;
    airesponse: string;
    agent: string;
    conversationid: string;
    files: import("./state.js").AIFile[];
    file: Express.Multer.File | undefined;
    searchresult: never[];
    images: never[];
}>;
export { searchagent };
