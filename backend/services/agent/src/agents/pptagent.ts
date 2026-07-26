import { cloudinary } from "@gothalo/shared";
import { generateppt } from "../utils/generateppt.js";
import { type UploadApiResponse } from "cloudinary";
import { getllm } from "./getllm.js";
import type { Statetype } from "./state.js";
import { checkagentlimit } from "../utils/limits.js";

const pptagent = async (state: Statetype) => {
  try {
    const l= await checkagentlimit(state.agent,state.id)
    if(!l.success){
      return{
        ...state,
        limit:l
      }
    }
    const llm = getllm("ppt");
    const prompt = `You are a professional presentation designer.
Return ONLY valid JSON.
Format:
{
"title":"",
"subtitle": "",
"slides":[
{
"title":"",
"points":[
"",
"",
"",
"" 
]
}
]
}
Rules:
-Generate exactly 6 content slides.
-Each slide should have 4-6 concise bullet points.
-No markdown.
- No explanation.
-No code block.
- Return ONLY JSON.
Topic:
${state.prompt}` ;

const res=await llm.invoke(prompt)
console.log(JSON.parse(res.content as string))

const buffer = await generateppt(JSON.parse(res.content as string))


 const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "gothalo-ai/ppts",
          public_id: `report-${Date.now()}`,
          format: "pptx",
        },
        (error, result) => (error ? reject(error) : resolve(result!))
      );

      stream.end(buffer); // actually sends the buffer
    });
if(!uploadResult){
    throw new Error("upload failed")
}
console.log("cloudinary",uploadResult.secure_url)

return{
  ...state,
  airesponse:`
  PPT generated successfully.

  link:${uploadResult.secure_url}`
}

  } catch (error: any) {
    console.log(error);
    return {
      state,
    };
  }
};
export { pptagent };
