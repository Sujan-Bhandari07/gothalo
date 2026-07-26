import type { Statetype } from "./state.js";
declare const routeragent: (state: Statetype) => Promise<{
    limit: import("./state.js").ltype;
    prompt: string;
    id: string;
    airesponse: string;
    conversationid: string;
    searchresult: string;
    images: string[];
    files: import("./state.js").AIFile[];
    file: Express.Multer.File | undefined;
    agent: string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[];
} | undefined>;
export { routeragent };
