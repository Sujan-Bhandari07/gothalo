import type { Statetype } from "./state.js";
declare const chatagent: (state: Statetype) => Promise<{
    limit: import("./state.js").ltype;
    prompt: string;
    id: string;
    agent: string;
    conversationid: string;
    images: string[];
    files: import("./state.js").AIFile[];
    file: Express.Multer.File | undefined;
    airesponse: string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[];
    searchresult: string;
}>;
export { chatagent };
