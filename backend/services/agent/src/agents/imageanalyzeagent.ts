import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import type { PathLike } from "fs";
import fs from "fs/promises";
import { getllm } from "./getllm.js";
import type { Statetype } from "./state.js";
import { checkagentlimit } from "../utils/limits.js";


export const imageagent=async(state:Statetype)=>{

    const l= await checkagentlimit(state.agent,state.id)
    if(!l.success){
      return{
        ...state,
        limit:l
      }
    }
try {

    const llm=getllm("image")
    const imagebuffer= await fs.readFile(state.file?.path as PathLike)
   const baseimage= imagebuffer.toString("base64")
   const messages=[
    new SystemMessage(`You are
Gothalo AI  image analyzer Agent.


Rules:
- Analyze only the uploaded image.
- Answer the user's question accurately.
-If text exists in the image,
extract it.
-If charts or tables exist,
explain them.
- If something is unclear, say so.
- Use Markdown when helpful.
- Do not hallucinate.`),
    new HumanMessage({
        content:[
            {
                type:"text",
                text:state.prompt ||"analyze the image"
            },
            {
                type:"image_url",
                "image_url":{
                    url: `data:${state.file!.mimetype};base64,${baseimage}`
                }
            }
        ]
    })
   ]
   const res=await llm.invoke(messages)
   return{
    ...state,
    airesponse:res.content
   }
    
} catch (error:any) {
    }
finally{
    await fs.unlink(state.file?.path as PathLike)
}

    return state
}