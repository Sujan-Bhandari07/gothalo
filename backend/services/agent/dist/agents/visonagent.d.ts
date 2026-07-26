import type { Statetype } from "./state.js";
declare const visionagent: (state: Statetype) => Promise<{
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
} | {
    limit: import("./state.js").ltype;
    prompt: string;
    id: string;
    airesponse: string;
    agent: string;
    conversationid: string;
    searchresult: string;
    files: import("./state.js").AIFile[];
    file: Express.Multer.File | undefined;
    images: never[];
    error: any;
}>;
export { visionagent };
