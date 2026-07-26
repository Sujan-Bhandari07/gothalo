import { Annotation } from "@langchain/langgraph";


export interface AIFile {
  name: string;
  content: string;
}

export interface ltype{

  success:boolean,
  message:string
}

 
 export type Statetype = typeof state.State;

const state=Annotation.Root({
  limit:Annotation<ltype>(),
    prompt:Annotation<string>(),
    id:Annotation<string>(),
    airesponse:Annotation<string>(),
    agent:Annotation<string>(),
    conversationid:Annotation<string>(),
    searchresult:Annotation<string>(),
    images:Annotation<string[]>(),
    files:Annotation<AIFile[]>(),
    file:Annotation<Express.Multer.File | undefined>(),
})
export{state}