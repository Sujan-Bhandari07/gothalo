import { Annotation } from "@langchain/langgraph";
const state = Annotation.Root({
    limit: Annotation(),
    prompt: Annotation(),
    id: Annotation(),
    airesponse: Annotation(),
    agent: Annotation(),
    conversationid: Annotation(),
    searchresult: Annotation(),
    images: Annotation(),
    files: Annotation(),
    file: Annotation(),
});
export { state };
