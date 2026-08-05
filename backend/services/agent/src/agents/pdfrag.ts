import type { PathLike } from "fs"
import type { Statetype } from "./state.js"
import {PDFParse} from "pdf-parse"
import fs from "fs/promises"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorstore } from "../config/vectordb.js";
import { getllm } from "./getllm.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { checkagentlimit } from "../utils/limits.js";

const pdfrag=async(state:Statetype)=>{
    let pdf:PDFParse|undefined;

    const l= await checkagentlimit(state.agent,state.id)
    if(!l.success){
      return{
        ...state,
        limit:l
      }
    }
try {
    const buffer=await fs.readFile(state.file?.path as PathLike)
     pdf=new PDFParse({
        data:buffer
    })
    const result=await pdf.getText()
    const text=  result.text

const splitter=new RecursiveCharacterTextSplitter({
    chunkSize:1000,
    chunkOverlap:300
})

const docs= (await splitter.createDocuments([text])).filter(e=>e.pageContent.trim().length>80)
const collectionname=`pdf-${Date.now()}`
const store=await vectorstore(docs,collectionname)


const relevant=await store.similaritySearch(state.prompt,5)
const context=relevant.map((d:any)=>{
    return d.pageContent
}).join("\n\n")

const llm=getllm("pdfrag")
const messages=[
    new SystemMessage(`You are Gothalo AI PDF Assistant.

Rules:
- Answer ONLY from the uploaded PDF.
- Never make up information.

-Use Markdown formatting.`),
new HumanMessage(
    `Context:${context}
    Question:${state.prompt}
    `
)
]
const res=await llm.invoke(messages)
return{
    ...state,
    airesponse:res.content
}

    
} catch (error:any) {
    return {
    ...state,
    airesponse: "Something went wrong while processing the PDF.",
  };
}finally{
      await pdf?.destroy();
    await fs.unlink(state.file?.path as PathLike)
}

}

export{pdfrag}



// import type { PathLike } from "fs";
// import type { Statetype } from "./state.js";
// import { PDFParse } from "pdf-parse";
// import fs from "fs/promises";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { vectorstore } from "../config/vectordb.js";
// import { getllm } from "./getllm.js";
// import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// const pdfrag = async (state: Statetype) => {
//   let pdf: PDFParse | undefined;

//   try {
//     const buffer = await fs.readFile(state.file?.path as PathLike);
//     pdf = new PDFParse({ data: buffer });
//     const result = await pdf.getText();
//     const text = result.text;

//     const splitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 1000,
//       chunkOverlap: 300,
//     });

//     const docs = await splitter.createDocuments([text]);
//     const collectionname = `pdf-${Date.now()}`;
//     const store = await vectorstore(docs, collectionname);

//     const relevant = await store.similaritySearch(state.prompt, 5);
//     const context = relevant.map((d: any) => d.pageContent).join("\n\n");

//     const llm = getllm("pdfrag");
//     const messages = [
//       new SystemMessage(`You are Gothalo AI PDF Assistant.

// Rules:
// - Answer ONLY from the uploaded PDF.
// - Never make up information.
// - If the answer is not present in the PDF, reply:
// "I couldn't find this information in the uploaded PDF."
// -Use Markdown formatting.`),
//       new HumanMessage(`Context:${context}
//     Question:${state.prompt}
//     `),
//     ];

//     const res = await llm.invoke(messages);
//     //     return {
//       ...state,
//       airesponse: res.content,
//     };
//   } catch (error: any) {
//     //     return {
//       ...state,
//       airesponse: "Something went wrong while processing the PDF.",
//     };
//   } finally {
//     await pdf?.destroy();
//     if (state.file?.path) {
//       await fs.unlink(state.file.path).catch(() => {});
//     }
//   }
// };

// export { pdfrag };