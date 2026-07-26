import type { Statetype } from "./state.js";
declare const pdfagent: (state: Statetype) => Promise<{
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
} | undefined>;
export { pdfagent };
