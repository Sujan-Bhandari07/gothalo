export interface AIFile {
    name: string;
    content: string;
}
export interface ltype {
    success: boolean;
    message: string;
}
export type Statetype = typeof state.State;
declare const state: import("@langchain/langgraph").AnnotationRoot<{
    limit: import("@langchain/langgraph").LastValue<ltype>;
    prompt: import("@langchain/langgraph").LastValue<string>;
    id: import("@langchain/langgraph").LastValue<string>;
    airesponse: import("@langchain/langgraph").LastValue<string>;
    agent: import("@langchain/langgraph").LastValue<string>;
    conversationid: import("@langchain/langgraph").LastValue<string>;
    searchresult: import("@langchain/langgraph").LastValue<string>;
    images: import("@langchain/langgraph").LastValue<string[]>;
    files: import("@langchain/langgraph").LastValue<AIFile[]>;
    file: import("@langchain/langgraph").LastValue<Express.Multer.File | undefined>;
}>;
export { state };
