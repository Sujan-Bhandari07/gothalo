import { cloudinary } from "@gothalo/shared";
import { generatepdf } from "../utils/generatepdf.js";
import {} from "cloudinary";
import { getllm } from "./getllm.js";
import { checkagentlimit } from "../utils/limits.js";
const pdfagent = async (state) => {
    try {
        const l = await checkagentlimit(state.agent, state.id);
        if (!l.success) {
            return {
                ...state,
                limit: l
            };
        }
        const llm = getllm("pdf");
        const prompt = `
You are an expert document writer.
Return ONLY valid JSON. Do NOT return markdown. Do NOT return explanations.

Structure:
{
  "title": "string",
  "subtitle": "string",
  "sections": [
    {
      "heading": "string",
      "points": ["string", "string"]
    }
  ]
}

Generate 4-8 sections.
Each section should have 3-6 concise bullet points.

Topic:
${state.prompt}
`;
        const res = await llm.invoke(prompt);
        const data = JSON.parse(res.content);
        const pdfbuffer = await generatepdf(data);
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                resource_type: "raw",
                folder: "gothalo-ai/pdfs",
                public_id: `report-${Date.now()}`,
                format: "pdf",
            }, (error, result) => (error ? reject(error) : resolve(result)));
            stream.end(pdfbuffer); // actually sends the buffer
        });
        if (!uploadResult) {
            throw new Error("upload failed");
        }
        return {
            ...state,
            airesponse: `
      PDf generated successfully
       
      link:${uploadResult.secure_url}`,
        };
    }
    catch (error) {
        console.log(error);
    }
};
export { pdfagent };
