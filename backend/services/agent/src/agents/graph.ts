import { StateGraph } from "@langchain/langgraph";
import { state } from "./state.js";
import { routeragent } from "./routeragent.js";
import { chatagent } from "./chatagent.js";
import { visionagent } from "./visonagent.js";
import { pptagent } from "./pptagent.js";
import { pdfagent } from "./pdfagent.js";
import { codingagent } from "./codingagent.js";
import { searchagent } from "./searchagent.js";
import { pdfrag } from "./pdfrag.js";
import { imageagent } from "./imageanalyzeagent.js";




const workflow = new StateGraph(state)


.addNode("chat",chatagent)
.addNode("router",routeragent)
.addNode("vision",visionagent)
.addNode("ppt",pptagent)
.addNode("pdf",pdfagent)
.addNode("coding",codingagent)
.addNode("search",searchagent)
.addNode("pdfrag",pdfrag)
.addNode("image",imageagent)


.addEdge("__start__","router")
.addConditionalEdges("router",(state)=>{
    if(state.agent == "chat"){
        return "chat"
    }else  if(state.agent =="coding"){
        return "coding"
    }else if(state.agent =="search"){
        return "search"
    }else if(state.agent == "ppt"){
        return "ppt"
    }else if(state.agent == "pdf"){
        return "pdf"
    }else if(state.agent =="vision"){
        return "vision"
    }
    else if(state.agent =="image"){
        return "image"
    }

    else if(state.agent =="pdfrag"){
        return "pdfrag"
    }
    else return "chat"
},{
    chat:"chat",
    search:"search",
    ppt:"ppt",
    pdf:"pdf",
    pdfrag:"pdfrag",
    image:"image",
    vision:"vision",
    coding:"coding"
})
.addEdge("search","__end__")
.addEdge("chat","__end__")
.addEdge("coding","__end__")
.addEdge("ppt","__end__")
.addEdge("pdf","__end__")
.addEdge("vision","__end__")
.addEdge("pdfrag","__end__")
.addEdge("image","__end__")


const graph = workflow.compile()
export{graph}