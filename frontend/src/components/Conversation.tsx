


import { TiMessage } from "react-icons/ti";
import Message from "./Message";
import Down from "./Down";
const Conversation = () => {

      
  return (
<>
 <div className="border-b border-b-gray-800 flex items-center gap-7 ">
        <TiMessage color="#6E2CEF" size={20} />

        <div className="text-[13px] text-gray-700">0 messages</div>
      </div>
      <div className=" cv overflow-auto bnv h-120 flex flex-col gap-6">
        
        <Message/>
        
       
      </div>

      <Down/>
      
</>
  )
}

export default Conversation